import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/customer/orders/returns - 반품 요청
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderItemId, reason } = body;

    if (!orderItemId || !reason) {
      return NextResponse.json(
        { error: 'Order item ID and reason are required' },
        { status: 400 }
      );
    }

    const orderItem = await prisma.orderItem.findUnique({
      where: { id: orderItemId },
      include: {
        order: true,
      },
    });

    if (!orderItem) {
      return NextResponse.json(
        { error: 'Order item not found' },
        { status: 404 }
      );
    }

    if (orderItem.order.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (orderItem.returnRequested) {
      return NextResponse.json(
        { error: 'Return already requested for this item' },
        { status: 400 }
      );
    }

    const updated = await prisma.orderItem.update({
      where: { id: orderItemId },
      data: {
        returnRequested: true,
        returnReason: reason,
        returnStatus: 'PENDING',
      },
    });

    return NextResponse.json({ orderItem: updated }, { status: 200 });
  } catch (error) {
    console.error('Return request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
