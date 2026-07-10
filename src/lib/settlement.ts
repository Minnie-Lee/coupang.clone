import { prisma } from './prisma';

export async function calculateMonthlySettlements(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const completedOrders = await prisma.order.findMany({
    where: {
      status: 'DELIVERED',
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      items: {
        include: {
          vendor: true,
        },
      },
    },
  });

  const vendorSettlements = new Map<string, {
    vendorId: string;
    totalSales: number;
    commission: number;
    netAmount: number;
  }>();

  for (const order of completedOrders) {
    for (const item of order.items) {
      const vendorId = item.vendorId;
      const itemTotal = item.subtotal;
      const commission = Math.round(itemTotal * 0.1);
      const netAmount = itemTotal - commission;

      if (!vendorSettlements.has(vendorId)) {
        vendorSettlements.set(vendorId, {
          vendorId,
          totalSales: 0,
          commission: 0,
          netAmount: 0,
        });
      }

      const settlement = vendorSettlements.get(vendorId)!;
      settlement.totalSales += itemTotal;
      settlement.commission += commission;
      settlement.netAmount += netAmount;
    }
  }

  const period = `${year}-${String(month).padStart(2, '0')}`;

  for (const [vendorId, data] of vendorSettlements) {
    const existing = await prisma.settlement.findUnique({
      where: {
        vendorId_period: {
          vendorId,
          period,
        },
      },
    });

    if (!existing) {
      await prisma.settlement.create({
        data: {
          vendorId,
          period,
          totalSales: data.totalSales,
          commission: data.commission,
          netAmount: data.netAmount,
          status: 'PENDING',
        },
      });
    }
  }

  return vendorSettlements;
}

export async function processPendingSettlements() {
  const pendingSettlements = await prisma.settlement.findMany({
    where: { status: 'PENDING' },
  });

  for (const settlement of pendingSettlements) {
    await prisma.settlement.update({
      where: { id: settlement.id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });
  }

  return pendingSettlements.length;
}
