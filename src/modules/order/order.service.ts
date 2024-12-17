import { Product } from '../product/product.model';

const creatOrdersIntoDB = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

export const orderService = {
creatOrdersIntoDB
}
