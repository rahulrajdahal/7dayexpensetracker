import prisma from '@/prisma/prisma';
import moment from 'moment';
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
    : new Date(Date.now());

  const topExpensesByDate = date
    ? getAllExpenses({
        where: { createdAt: { lte: createdAt } },
        orderBy: { price: 'desc' },
      })
    : getAllExpenses({ orderBy: { price: 'desc' } });

  const [categories, topExpenses, todayExpenses] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, title: true },
    }),
    topExpensesByDate,
    getAllExpenses({
      where: { createdAt: { lte: new Date(Date.now()) } },
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
