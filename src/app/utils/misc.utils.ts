import { Spending } from '../interfaces/spending.interface';
import { Category } from '../interfaces/category.interface';

export const mapCategory = (spendings: Spending[], categories: Category[]): Spending[] => {
  return spendings.map((s: Spending) => {
    return {
      ...s,
      category: !!categories ? categories.find((c: Category) => c.id === s.categoryId) : null,
    };
  });
};

export const sortByDateDesc = (spendings: Spending[]) => spendings.sort((a, b) => {
  const date1 = a.createdAt;
  const date2 = b.createdAt;
  if (date1 > date2) {
    return -1;
  }
  if (date1 < date2) {
    return 1;
  }
  return 0;
});
