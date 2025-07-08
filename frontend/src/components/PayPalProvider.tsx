import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, type ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { Loader2, AlertCircle } from 'lucide-react';

console.log('PayPalProvider: Initializing...');
console.log('VITE_PAYPAL_CLIENT_ID:', import.meta.env.VITE_PAYPAL_CLIENT_ID ? 'Found' : 'Missing');

interface PayPalProviderProps {
  children: React.ReactNode;
}

const PayPalProvider: React.FC<PayPalProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialOptions: ReactPayPalScriptOptions = {
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
    currency: 'USD',
  };

  useEffect(() => {
    const initPayPal = async () => {
      try {
        if (!import.meta.env.VITE_PAYPAL_CLIENT_ID) {
          throw new Error('PayPal Client ID not found in environment');
        }
        console.log('PayPalProvider: Client ID check passed');
      } catch (err) {
        console.error('PayPalProvider: Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize PayPal');
      } finally {
        console.log('PayPalProvider: Initialization complete');
        setIsLoading(false);
      }
    };

    initPayPal();
  }, []);

  if (isLoading) {
    console.log('PayPalProvider: Rendering loading state');
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-orthodox-blue" />
        <span className="ml-2">Loading PayPal...</span>
      </div>
    );
  }

  if (error) {
    console.error('PayPalProvider: Rendering error state:', error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md m-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-red-800 font-medium">Payment Error</h3>
        </div>
        <p className="mt-2 text-red-700">{error}</p>
      </div>
    );
  }

  console.log('PayPalProvider: Rendering PayPalScriptProvider');
  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="paypal-container">
        {children}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
