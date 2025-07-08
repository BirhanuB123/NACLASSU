import React from 'react';
import { Button } from "@/components/ui/button";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (error: Error) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError }) => {
  const handleClick = () => {
    // Create a PayPal checkout URL with donation amount
    const paypalDonateUrl = `https://www.paypal.com/donate?business=donations@orthodoxsundayschool.org&amount=${amount}&currency_code=USD&no_recurring=0`;
    
    // Open PayPal in new window
    const paypalWindow = window.open(paypalDonateUrl, '_blank');
    
    // Set up a listener to detect when the user returns from PayPal
    window.addEventListener('focus', function onFocus() {
      // When user comes back to our page, prompt them to confirm their payment
      const confirmed = window.confirm('Did you complete your PayPal payment?');
      if (confirmed) {
        // If user confirms, call success handler with simulated PayPal transaction
        onSuccess({
          id: `PAYPAL-${Math.random().toString(36).substring(2, 11)}`,
          status: 'COMPLETED',
          payer: { email_address: 'donor@example.com' },
          method: 'paypal'
        });
      }
      
      // Remove listener after handling
      window.removeEventListener('focus', onFocus);
    }, { once: true });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="bg-[#0070ba] hover:bg-[#003087] px-8 py-2 text-lg w-full flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-5 w-5">
        <path fill="currentColor" d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-5.2 4.1-8.7 9.1-8.7h4.7c19.3 0 39.7-9.2 39.7-32.5 0-1.5 0-2.8-.2-4.2 0-.1 0-.3-.1-.4.1-.2.1-.4.1-.5zm32.7 20.7c0 16 7.2 28.4 23.5 28.4 10.7 0 18.5-5.7 22.2-13.5L206 220c.5-1.5 2-2.5 3.5-2.5h12c2.5 0 4.7 2.5 3.5 5.5l-13.2 54.7c-.7 2.7-2.8 5.5-5.5 5.5h-17.5c-2.5 0-5-2.3-4.7-5l7.2-30.2c-4.2 8.5-14.7 17-31.5 17-16.2 0-35.5-8.5-35.5-37 0-26 18-35.5 36-35.5 14.7 0 21.7 7.2 23 12.7.3 1.5.5 2.8.5 4.3zm150.9 1.7c0 16 7.2 28.4 23.5 28.4 10.7 0 18.5-5.7 22.2-13.5L356.8 220c.5-1.5 2-2.5 3.5-2.5H372c2.5 0 4.7 2.5 3.5 5.5l-13.5 54.7c-.7 2.7-3 5.5-5.5 5.5h-17.5c-2.5 0-5-2.3-4.7-5l7.5-30.5c-4.5 8.8-14.9 17.2-31.7 17.2-16.2 0-35.5-8.5-35.5-37 0-25.7 18-35.2 36-35.2 14.7 0 21.7 7.2 23 12.7.3 1.8.5 3 .5 4.6zm127.7 27.9c0 16.7-5.7 34-35.5 34l.3-.3c-10.5 0-18.5-1.7-21.2-4.7-.2.3-.5.5-.7.5l-19.5.2c-2.2 0-4.7-2.5-3.7-5l14.5-61.5c1-3 2.2-4 5.5-4h17c1.8 0 3.2 1 3 3l-1.2 8.5c4.5-7.7 13.2-13.5 26.7-13.5 10.5 0 21.7 5.5 21.7 22l.3 20.8zm-36.9-13.5c0-9-4.5-11.5-11.2-11.5-11.5 0-17 12.5-17 25.2 0 8.5 3.7 13.7 12.2 13.7 8.7 0 16-10.5 16-27.5v.1z"/>
      </svg>
      Pay with PayPal
    </Button>
  );
};

export default PayPalButton;