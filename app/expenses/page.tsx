import prisma from '@/prisma/prisma';
import moment from 'moment';
import Expenses from './Expenses';

export default async function page({
  searchParams: { date },
}: {
  searchParams: { date: string };
}) {
  const createdAt = moment()
    .set({
      year: Number(date?.split('-')[2]),
      month: Number(date?.split('-')[1]) - 1,
      day: Number(date?.split('-')[0]) - 1,
    })
    .toISOString();

  const topExpensesByDate = date
    ? prisma.expense.findMany({
        take: 3,
        where: { createdAt: { lte: createdAt } },
        include: { category: { select: { title: true, emoji: true } } },
        orderBy: { price: 'desc' },
      })
    : prisma.expense.findMany({
        take: 3,
        include: { category: { select: { title: true, emoji: true } } },
        orderBy: { price: 'desc' },
      });

  const [categories, topExpenses, todayExpenses] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, title: true },
    }),
    topExpensesByDate,
    prisma.expense.findMany({
      take: 3,
      include: { category: { select: { title: true, emoji: true } } },
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
