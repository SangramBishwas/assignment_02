import { Request, Response } from 'express';
import { orderService } from './order.service';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { product, quantity } = req.body;
    // Find  Product Data
    const productData = await orderService.creatOrdersIntoDB(product);
    if (!productData) {
      res.status(404).json({
        error: 'Product not found',
      });
      return;
    }
    // Check The Stock
    if (productData.quantity < quantity) {
      res.status(404).json({
        error: 'Insufficient Product',
        availableQuantity: productData.quantity,
      });
      return;
    }
    //Update Product Quantity and Stock
    productData.quantity -= quantity;
    if (productData.quantity === 0) {
      productData.inStock = false;
    }
    await productData.save();
    //create a order
    const result = await Order.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await Order.aggregate([
      {
        $project: {
          totalPrice: { $multiply: ['$price', '$quantity'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);
    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: totalRevenue, 
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
};
