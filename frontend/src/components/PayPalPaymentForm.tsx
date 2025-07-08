import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Loader2 } from 'lucide-react';

interface PayPalPaymentFormProps {
  amount: string;
  frequency: string;
  designation: string;
  note: string;
  onSuccess: (details: any) => void;
  onError: (error: Error) => void;
}

const PayPalPaymentForm: React.FC<PayPalPaymentFormProps> = ({
  amount,
  frequency,
  designation,
  note,
  onSuccess,
  onError,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: designation,
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    setIsProcessing(true);
    return actions.order
      .capture()
      .then((details: any) => {
        onSuccess(details);
      })
      .catch((err: any) => {
        onError(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const onErrorHandler = (err: any) => {
    onError(err);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-orthodox-blue" />
        <span className="ml-2">Loading PayPal Buttons...</span>
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
