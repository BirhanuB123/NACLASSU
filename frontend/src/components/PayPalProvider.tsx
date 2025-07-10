import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PayPalProviderProps {
  children: React.ReactNode;
}

const PayPalProvider: React.FC<PayPalProviderProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="text-lg font-medium">Loading Payment Options</p>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <h3 className="text-lg font-medium text-red-800">Configuration Error</h3>
        </div>
        <p className="text-red-700 mb-3">PayPal Client ID is missing. Please check your .env file.</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider 
      options={{
        clientId: clientId,
        components: 'buttons',
        currency: 'USD',
        intent: 'capture',
        enableFunding: 'paypal,card',
        disableFunding: 'credit',
        dataSdkIntegrationSource: 'integrationbuilder_sc',
        debug: import.meta.env.DEV,
      }}
      deferLoading={false}
    >
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
