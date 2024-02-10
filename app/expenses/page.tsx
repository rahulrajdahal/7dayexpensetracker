import { Category, Expense } from '@prisma/client';
import moment from 'moment';
import { getAllCategories } from '../categories/action';
import Expenses from './Expenses';
import { getAllExpenses } from './action';

export default async function page({
  searchParams: { date },
}: {
  searchParams: { date: string };
}) {
  const createdAt = date
    ? moment()
        .set({
          year: Number(date?.split('-')[2]),
          month: Number(date?.split('-')[1]) - 1,
          day: Number(date?.split('-')[0]) - 1,
        })
        .toISOString()
    : moment().format();

  const topExpensesByDate = date
    ? getAllExpenses({ where: { createdAt: { lte: createdAt } } })
    : getAllExpenses({});

  const [categories, topExpenses, todayExpenses] = await Promise.all([
    getAllCategories({
      select: { id: true, title: true },
    }),

    topExpensesByDate,
    getAllExpenses({
      where: { createdAt: { lte: moment().format() } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const categorizedExpenses = await getAllCategories({
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
      categorizedExpenses={
        categorizedExpenses as (Category & {
          expenses: Pick<Expense, 'price'>[];
        })[]
      }
    />
  );
}
