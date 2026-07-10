import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/statistics - 통계 조회
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId || userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const [
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      totalRevenue,
      activeVendors,
      pendingVendors,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
      prisma.vendor.count({ where: { status: 'APPROVED' } }),
      prisma.vendor.count({ where: { status: 'PENDING' } }),
    ]);

    const statistics = {
      users: {
        total: totalUsers,
      },
      vendors: {
        total: totalVendors,
        active: activeVendors,
        pending: pendingVendors,
      },
      products: {
        total: totalProducts,
      },
      orders: {
        total: totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
      },
    };

    return NextResponse.json({ statistics }, { status: 200 });
  } catch (error) {
    console.error('Statistics fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
