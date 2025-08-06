const trackingData = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-123456789abc",
    orderId: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    carrier: "FedEx",
    trackingNumber: "123456789",
    status: "Order Placed",
    updatedAt: new Date(),
    estimatedDeliveryTimeMs: 1723456800000 + 7 * 24 * 60 * 60 * 1000, // 7 days after orderTimeMs
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-234567890bcd",
    orderId: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
    carrier: "UPS",
    trackingNumber: "987654321",
    status: "Processing",
    updatedAt: new Date(),
    estimatedDeliveryTimeMs: 1718013600000 + 7 * 24 * 60 * 60 * 1000, // 7 days after orderTimeMs
  },
];

export default trackingData;