export class Category{
    id!: number;
    name?:string;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}


