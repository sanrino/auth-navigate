import { api } from '../core/api';
import { Product } from './interfaces/products.interface';

export const getProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};
