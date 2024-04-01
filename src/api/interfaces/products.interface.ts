export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

enum Category {
  MenClothing = "men's clothing",
  Jewelery = 'jewelery',
  Electronics = 'electronics',
  WomenClothing = "women's clothing",
}
