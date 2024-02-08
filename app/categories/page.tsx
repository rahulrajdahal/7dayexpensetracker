import prisma from '@/prisma/prisma';
import Categories from './Categories';

export default async function page() {
  const [categories, topExpenses, categorizedExpenses] = await Promise.all([
    prisma.category.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.expense.findMany({
      take: 3,
      include: { category: { select: { title: true } } },
      orderBy: { price: 'desc' },
    }),
    prisma.category.findMany({
      take: 5,
      include: { expenses: { select: { price: true } } },

      orderBy: { expenses: { _count: 'desc' } },
    }),
  ]);

  return (
    <Categories
      categories={categories}
      topExpenses={topExpenses}
      categorizedExpenses={categorizedExpenses}
    />
  );
}
