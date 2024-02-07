import prisma from '@/utils/prisma';
import Expenses from './Expenses';

export default async function page() {
  const categories = await prisma.category.findMany({
    select: { id: true, title: true },
  });

  const topExpenses = await prisma.expense.findMany({
    take: 3,
    include: { category: { select: { title: true } } },
    orderBy: { price: 'desc' },
  });
  const todayExpenses = await prisma.expense.findMany({
    take: 3,
    include: { category: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Expenses
      categories={categories}
      topExpenses={topExpenses}
      todayExpenses={todayExpenses}
    />
  );
}
