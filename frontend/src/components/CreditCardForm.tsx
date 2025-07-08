import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from "@/components/ui/button";

interface CreditCardFormProps {
  amount: string;
  frequency: string;
  designation: string;
  note: string;
  onSuccess: (result: any) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  amount,
  frequency,
  designation,
  note,
  onSuccess,
  onError: onErrorHandler,
  disabled = false
}) => {
  const [processing, setProcessing] = useState(false);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: 'USD',
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    setProcessing(true);
    try {
      const details = await actions.order.capture();
      onSuccess(details);
    } catch (error) {
      onErrorHandler(error as Error);
    } finally {
      setProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    onErrorHandler(new Error('An error occurred with PayPal'));
  };

  return (
    <div className="space-y-4">
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          disabled={disabled || processing}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default CreditCardForm;