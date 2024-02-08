import prisma from '@/prisma/prisma';
import Categories from './Categories';
import { fetchAllCategories } from './action';

export default async function page() {
  const categories = await fetchAllCategories({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const topExpenses = await prisma.expense.findMany({
    take: 3,
    include: { category: { select: { title: true } } },
    orderBy: { price: 'desc' },
  });
  const categorizedExpenses = await prisma.category.findMany({
    take: 5,
    include: { expenses: { select: { price: true } } },

    orderBy: { expenses: { _count: 'desc' } },
  });

  return (
    <Categories
      categories={categories.categories}
      topExpenses={topExpenses}
      categorizedExpenses={categorizedExpenses}
    />
  );
}
