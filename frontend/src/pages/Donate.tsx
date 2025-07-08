import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditCardForm from "@/components/CreditCardForm";
import PayPalPaymentForm from "@/components/PayPalPaymentForm";
import BankTransferButton from "@/components/BankTransferButton";
import "./Donate.css";

const DonatePage = () => {
  const [amount, setAmount] = useState("100");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [designation, setDesignation] = useState("general");
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const getFinalAmount = () => {
    return amount === "custom" ? customAmount : amount;
  };

  const handlePaymentSuccess = async (result: any) => {
    const donationAmount = getFinalAmount();
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(donationAmount),
          payment_method: paymentMethod,
          status: "completed",
          transaction_id: result.id,
          frequency,
          designation,
          note,
          recurring: frequency !== "one-time",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to record donation');
      }

      toast({
        title: "Thank you for your donation!",
        description: `Your ${frequency} donation of $${donationAmount} will support Orthodox Sunday School education.`,
      });
    } catch (error) {
      console.error("Error processing donation:", error);
      toast({
        title: "Error processing donation",
        description: "Your payment was processed but we couldn't record it. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: Error) => {
    console.error("Payment error:", error);
    toast({
      title: "Payment failed",
      description:
        error.message ||
        "An error occurred during payment processing. Please try again.",
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  return (
    <div className="donate-container">
      {/* Hero Section */}
      <section className="donate-hero">
        <h1>Donate to Orthodox Union Sunday School</h1>
        <p>Support Orthodox education for the next generation.</p>
        <p>
          Your generous donation helps us continue providing quality Orthodox
          education resources and training to Sunday Schools across North
          America.
        </p>
      </section>

      {/* Main Content */}
      <div className="md:flex gap-8">
        {/* Donation Form */}
        <div className="donate-card md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-6 text-orthodox-blue">
            Make a Donation
          </h2>
          <div className="space-y-6">
            <div>
              <Label className="text-lg mb-3 block">
                Select Donation Amount
              </Label>
              <RadioGroup
                value={amount}
                onValueChange={setAmount}
                className="donation-amounts"
              >
                {["25", "50", "100", "250", "500", "custom"].map((value) => (
                  <div key={value}>
                    <RadioGroupItem
                      value={value}
                      id={`amount-${value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`amount-${value}`}
                      className="amount-button"
                      data-state={amount === value ? "checked" : "unchecked"}
                    >
                      {value === "custom" ? "Custom" : `$${value}`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {amount === "custom" && (
                <div className="mt-3">
                  <Label htmlFor="custom-amount">Enter Amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter custom amount"
                      className="pl-8"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-lg mb-3 block">Frequency</Label>
              <RadioGroup
                value={frequency}
                onValueChange={setFrequency}
                className="donation-amounts"
              >
                <div>
                  <RadioGroupItem
                    value="one-time"
                    id="frequency-one-time"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="frequency-one-time"
                    className="amount-button"
                    data-state={frequency === "one-time" ? "checked" : "unchecked"}
                  >
                    One Time
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="monthly"
                    id="frequency-monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="frequency-monthly"
                    className="amount-button"
                    data-state={frequency === "monthly" ? "checked" : "unchecked"}
                  >
                    Monthly
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-lg mb-3 block">Donation Designation</Label>
              <select
                className="w-full border-gray-300 rounded-md focus:ring-orthodox-blue focus:border-orthodox-blue p-2"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="general">General Fund (Greatest Need)</option>
                <option value="curriculum">Curriculum Development</option>
                <option value="teacher-training">Teacher Training Programs</option>
                <option value="technology">
                  Digital Resources & Technology
                </option>
                <option value="scholarship">Youth Scholarships</option>
              </select>
            </div>

            <div>
              <Label htmlFor="donation-note" className="text-lg mb-3 block">
                Note (Optional)
              </Label>
              <textarea
                id="donation-note"
                placeholder="Add a personal note with your donation"
                className="w-full border-gray-300 rounded-md focus:ring-orthodox-blue focus:border-orthodox-blue p-2 h-24"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>

            <div className="donate-tabs">
              <Tabs
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-6"
              >
                <TabsList className="tabs-list">
                  <TabsTrigger value="paypal" className="tabs-trigger">
                    PayPal
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="tabs-trigger">
                    Bank Transfer
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="paypal" className="space-y-4">
                  <PayPalPaymentForm
                    amount={getFinalAmount()}
                    frequency={frequency}
                    designation={designation}
                    note={note}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </TabsContent>

                <TabsContent value="credit">
                  <CreditCardForm
                    amount={getFinalAmount()}
                    frequency={frequency}
                    designation={designation}
                    note={note}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    disabled={isProcessing}
                  />
                </TabsContent>

                <TabsContent value="bank">
                  <BankTransferButton
                    amount={getFinalAmount()}
                    frequency={frequency}
                    designation={designation}
                    note={note}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Impact Card */}
        <div className="impact-card md:w-1/2">
          <h3 className="text-2xl font-bold mb-4 text-orthodox-blue">
            Your Impact
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-2">$25 provides:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Training materials for one Sunday School teacher</li>
                <li>Educational resources for 5 students</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">$50 provides:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>A complete curriculum kit for one classroom</li>
                <li>Scholarships for two teachers to attend workshops</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">$100 provides:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Digital resources for an entire parish</li>
                <li>Materials for regional teacher training events</li>
                <li>Scholarships for youth camp participants</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">$250+ provides:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Complete Sunday School program support for a small parish</li>
                <li>Development of new curriculum materials</li>
                <li>Technology upgrades for digital resource delivery</li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="font-medium">
                NASSU is a 501(c)(3) non-profit organization. Your donation is
                tax-deductible to the extent allowed by law.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;