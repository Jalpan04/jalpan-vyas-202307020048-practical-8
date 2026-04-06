// POST /api/payment/checkout
const processPayment = async (req, res) => {
  const { amount, currency = 'INR', paymentMethod, cardNumber } = req.body;

  if (!amount || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: 'Amount and paymentMethod are required fields',
    });
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be a positive number',
    });
  }

  // Simulate API processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate 20% failure rate to test error handling
  const shouldFail = Math.random() < 0.2;

  if (shouldFail) {
    return res.status(402).json({
      success: false,
      message: 'Payment declined by bank',
      error: {
        code: 'PAYMENT_DECLINED',
        reason: 'Insufficient funds or card limit exceeded',
      },
    });
  }

  const transactionId =
    'TXN' + Date.now() + Math.floor(Math.random() * 10000);

  res.status(200).json({
    success: true,
    message: 'Payment processed successfully',
    data: {
      transactionId,
      amount: Number(amount),
      currency,
      paymentMethod,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
    },
  });
};

// POST /api/payment/refund
const processRefund = async (req, res) => {
  const { transactionId, reason } = req.body;

  if (!transactionId) {
    return res.status(400).json({
      success: false,
      message: 'transactionId is required to process a refund',
    });
  }

  const refundId = 'REF' + Date.now();

  res.status(200).json({
    success: true,
    message: 'Refund initiated successfully',
    data: {
      refundId,
      transactionId,
      reason: reason || 'Customer requested refund',
      status: 'REFUND_INITIATED',
      estimatedCompletionDays: 5,
      timestamp: new Date().toISOString(),
    },
  });
};

// GET /api/payment/status/:transactionId
const getPaymentStatus = async (req, res) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    return res.status(400).json({
      success: false,
      message: 'Transaction ID is required',
    });
  }

  res.status(200).json({
    success: true,
    data: {
      transactionId,
      status: 'SUCCESS',
      amount: 999,
      currency: 'INR',
      updatedAt: new Date().toISOString(),
    },
  });
};

module.exports = { processPayment, processRefund, getPaymentStatus };
