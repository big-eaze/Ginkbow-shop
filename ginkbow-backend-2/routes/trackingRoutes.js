import express from 'express';
import { Tracking, Order } from '../models/index.js';

const router = express.Router();

// GET /tracking/:orderId - Get tracking details for an order
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const tracking = await Tracking.findOne({
      where: { orderId },
      attributes: [
        'id',
        'orderId',
        'carrier',
        'trackingNumber',
        'status',
        'updatedAt',
        'estimatedDeliveryTimeMs', // Include the new field
      ],
      include: {
        model: Order,
        as: 'order', // Match the alias defined in the association
        attributes: ['id', 'orderTimeMs', 'totalCostCents'],
      },
    });

    if (!tracking) {
      return res.status(404).json({ message: 'Tracking details not found for this order' });
    }

    res.json(tracking);
  } catch (error) {
    console.error('Error fetching tracking details:', error);
    res.status(500).json({ message: 'Failed to fetch tracking details' });
  }
});

export default router;