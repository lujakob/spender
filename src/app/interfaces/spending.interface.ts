import { Category } from './category.interface';

export interface Spending {
  id: number;
  amount: number;
  categoryId: number;
  category?: Category;
  createdAt: Date;
}
