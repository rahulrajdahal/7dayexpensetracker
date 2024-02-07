import Categories from './Categories';
import { fetchAllCategories } from './action';

export default async function page() {
  const categories = await fetchAllCategories({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return <Categories categories={categories.categories} />;
}
