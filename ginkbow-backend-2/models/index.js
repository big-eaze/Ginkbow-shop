import Order from './Order.js';
import Tracking from './Tracking.js';
import OrderProduct from './OrderProduct.js';
import Product from './Product.js';
import Cart from './Cart.js';

// Define associations
Order.hasOne(Tracking, { foreignKey: 'orderId', as: 'tracking' });
Tracking.belongsTo(Order, { foreignKey: 'orderId', as: 'order' }); // Use 'order' as the alias

Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'products' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); // Associate Cart with Product

export { Cart, Product, Order, OrderProduct, Tracking };