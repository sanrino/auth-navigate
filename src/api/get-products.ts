import { api } from '../core/api';
import { Product } from './interfaces/products.interface';

export const getProducts = async () => {
  const { data } = await api.get<Product[]>('/products');
  return data;
};
