import { Category, Expense } from '@prisma/client';
import { getAllExpenses } from '../expenses/action';
import Categories from './Categories';
import { getAllCategories } from './action';

export default async function page() {
  const [categories, topExpenses, categorizedExpenses] = await Promise.all([
    getAllCategories({
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    getAllExpenses({}),
    getAllCategories({
      take: 5,
      include: { expenses: { select: { price: true } } },
      orderBy: { expenses: { _count: 'desc' } },
    }),
  ]);

  return (
    <Categories
      categories={categories}
      topExpenses={topExpenses}
      categorizedExpenses={
        categorizedExpenses as (Category & {
          expenses: Pick<Expense, 'price'>[];
        })[]
      }
    />
  );
}
