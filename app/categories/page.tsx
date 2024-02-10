import { getAllExpenses } from '../expenses/action';
import Categories from './Categories';
import { getAllCategories, getAllCategoriesWithExpenses } from './action';

export default async function page() {
  const [categories, topExpenses, categorizedExpenses] = await Promise.all([
    getAllCategories(3),
    getAllExpenses({}),
    getAllCategoriesWithExpenses(5),
  ]);

  return (
    <Categories
      categories={categories}
      topExpenses={topExpenses}
      categorizedExpenses={categorizedExpenses}
    />
  );
}
