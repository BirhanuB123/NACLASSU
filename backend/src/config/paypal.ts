import paypal from '@paypal/checkout-server-sdk';

// Configure PayPal SDK environment
const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_SECRET || '';
  const environment = process.env.NODE_ENV === 'production' 
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
  
  return new paypal.core.PayPalHttpClient(environment);
};

export const paypalClient = configureEnvironment();

// Helper function to create an order
export async function createOrder(amount: number, currency: string = 'USD') {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toFixed(2),
        },
      },
    ],
  });

  try {
    const response = await paypalClient.execute(request);
    return response.result;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
}

// Helper function to capture payment
export async function capturePayment(orderId: string) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  
  // For capture, we typically don't need to send a request body
  // The order ID in the URL is sufficient for capturing an approved order
  
  try {
    const response = await paypalClient.execute(request);
    return response.result;
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    throw error;
  }
}
