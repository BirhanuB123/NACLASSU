import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { AlertCircle } from 'lucide-react';

interface PayPalPaymentFormProps {
  amount: string;
  frequency: string;
  designation: string;
  note: string;
  onSuccess: (details: any) => void;
  onError: (error: Error) => void;
}

const PayPalPaymentForm: React.FC<PayPalPaymentFormProps> = (props) => {
  const {
    amount,
    frequency,
    designation,
    note,
    onSuccess,
    onError,
  } = props;

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = (_data: any, actions: any) => {
    console.log('Creating PayPal order with amount:', amount);
    try {
      const description = note 
        ? `Donation: ${designation} (Note: ${note})`
        : `Donation: ${designation}`;
        
      return actions.order.create({
        purchase_units: [
          {
            description,
            amount: {
              value: amount,
              currency_code: 'USD',
              breakdown: {
                item_total: {
                  value: amount,
                  currency_code: 'USD'
                }
              }
            },
            items: [
              {
                name: `Donation (${frequency})`,
                description: designation,
                quantity: '1',
                unit_amount: {
                  value: amount,
                  currency_code: 'USD'
                },
                category: 'DONATION'
              }
            ]
          },
        ],
        application_context: {
          brand_name: 'NASSU',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          shipping_preference: 'NO_SHIPPING'
        }
      });
    } catch (err) {
      console.error('Error creating PayPal order:', err);
      throw err;
    }
  };

  const onApprove = async (_data: any, actions: any) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const details = await actions.order.capture();
      console.log('Payment successful:', details);
      onSuccess(details);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      console.error('Payment error:', errorMessage, err);
      setError(errorMessage);
      onError(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsProcessing(false);
    }
  };

  const onErrorHandler = (err: any) => {
    console.error('PayPal Button Error:', err);
    const errorMessage = err?.message || 'An error occurred with PayPal';
    setError(errorMessage);
    onError(new Error(errorMessage));
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <div className="flex items-center text-red-800 mb-2">
          <AlertCircle className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Payment Error</h3>
        </div>
        <p className="text-red-700 text-sm">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isProcessing && (
        <div className="text-center mb-4">Processing payment...</div>
      )}
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onErrorHandler}
        onCancel={() => {
          console.log('PayPal payment cancelled');
        }}
      />
    </div>
  );
};

export default PayPalPaymentForm;
