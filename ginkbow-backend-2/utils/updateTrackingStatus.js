import Tracking from '../models/Tracking.js';

const updateTrackingStatus = async () => {
  try {
    const now = Date.now();

    // Fetch all tracking records
    const trackingRecords = await Tracking.findAll();

    for (const tracking of trackingRecords) {
      if (tracking.status === 'Delivered') {
        // Skip already delivered orders
        continue;
      }

      const timeRemaining = tracking.estimatedDeliveryTimeMs - now;

      if (timeRemaining <= 0) {
        // If the estimated delivery time has passed, mark as Delivered
        tracking.status = 'Delivered';
        tracking.updatedAt = new Date();
        await tracking.save();
        console.log(`Updated tracking ID ${tracking.id} to status: Delivered`);
        continue;
      }

      // Calculate the total time for each status
      const totalTime = tracking.estimatedDeliveryTimeMs - tracking.updatedAt.getTime();
      const interval = totalTime / 4; // Split evenly into 4 intervals

      let newStatus = tracking.status;

      if (tracking.status === 'Order Placed' && now >= tracking.updatedAt.getTime() + interval) {
        newStatus = 'Processing';
      }
      if (tracking.status === 'Processing' && now >= tracking.updatedAt.getTime() + 2 * interval) {
        newStatus = 'Shipped';
      }
      if (tracking.status === 'Shipped' && now >= tracking.updatedAt.getTime() + 3 * interval) {
        newStatus = 'Out for Delivery';
      }

      // Update the status if it has changed
      if (newStatus !== tracking.status) {
        tracking.status = newStatus;
        tracking.updatedAt = new Date(); // Update the timestamp
        await tracking.save();
        console.log(`Updated tracking ID ${tracking.id} to status: ${newStatus}`);
      }
    }
  } catch (error) {
    console.error('Error updating tracking statuses:', error);
  }
};

export default updateTrackingStatus;