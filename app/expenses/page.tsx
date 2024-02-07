import prisma from '@/prisma/prisma';
import Expenses from './Expenses';

export default async function page() {
  const [categories, topExpenses, todayExpenses] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, title: true },
    }),
    prisma.expense.findMany({
      take: 3,
      include: { category: { select: { title: true } } },
      orderBy: { price: 'desc' },
    }),
    prisma.expense.findMany({
      take: 3,

      include: { category: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const categorizedExpenses = await prisma.category.findMany({
    take: 5,
    where: { expenses: { every: { price: { lte: topExpenses[0]?.price } } } },
    include: { expenses: { select: { price: true } } },
    orderBy: { expenses: { _count: 'desc' } },
  });

  return (
    <Expenses
      categories={categories}
      topExpenses={topExpenses}
      todayExpenses={todayExpenses}
      categorizedExpenses={categorizedExpenses}
    />
  );
}
