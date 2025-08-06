import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tracking = sequelize.define('Tracking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Orders', // Ensure this matches your Order table name
      key: 'id',
    },
  },
  carrier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'Order Placed',
      'Processing',
      'Shipped',
      'Out for Delivery',
      'Delivered'
    ),
    allowNull: false,
    defaultValue: 'Order Placed',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estimatedDeliveryTimeMs: {
    type: DataTypes.BIGINT, // Use BIGINT to store large timestamp values
    allowNull: false,
  },
});

export default Tracking;