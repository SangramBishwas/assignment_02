import { TProduct } from './product.interface';
import { Product } from './product.model';

//GET Product
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

//UPDATE Product
const updateProduct = async (id: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, {new: true});
  return result;
};
//DELETE Product
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProduct,
  deleteProduct,
};
