import { Spending } from '../interfaces/spending.interface';
import { Category } from '../interfaces/category.interface';
import * as moment from 'moment';

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


export const filterByRange = (params, spendings) => {
  const currentDate = !!params['period'] ? new Date(params['period']) : new Date();
  const startMom = moment(currentDate).startOf('month');
  const endMom = startMom.clone().add(1, 'month');
  return spendings.filter((s: Spending) => {
    return s.createdAt > startMom.toDate() && s.createdAt < endMom.toDate();
  });
};

export const sortByCategoryName = (res) => {
  res.sort((a, b) => {
    const nameB = a.categoryName.toUpperCase();
    const nameA = b.categoryName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  return res;
};

export const sortByTotal = (res) => {
  res.sort((a, b) => {
    const nameB = a.total;
    const nameA = b.total;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  return res;
};
