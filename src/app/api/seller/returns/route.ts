import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/seller/returns - 반품 요청 목록 조회
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const returns = await prisma.orderItem.findMany({
      where: {
        vendorId: vendor.id,
        returnRequested: true,
      },
      include: {
        order: {
          include: {
            user: true,
          },
        },
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ returns }, { status: 200 });
  } catch (error) {
    console.error('Returns fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/seller/returns/:id - 반품 처리
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { returnStatus } = body;

    if (!returnStatus || !['APPROVED', 'REJECTED', 'COMPLETED'].includes(returnStatus)) {
      return NextResponse.json(
        { error: 'Invalid return status' },
        { status: 400 }
      );
    }

    const orderItem = await prisma.orderItem.findUnique({
      where: { id: params.id },
    });

    if (!orderItem || orderItem.vendorId !== vendor.id) {
      return NextResponse.json(
        { error: 'Order item not found or unauthorized' },
        { status: 404 }
      );
    }

    const updated = await prisma.orderItem.update({
      where: { id: params.id },
      data: { returnStatus },
    });

    return NextResponse.json({ orderItem: updated }, { status: 200 });
  } catch (error) {
    console.error('Return update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
