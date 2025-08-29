import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreditCardForm from "@/components/CreditCardForm";
import PayPalPaymentForm from "@/components/PayPalPaymentForm";
import BankTransferButton from "@/components/BankTransferButton";
import PageHeader from "@/components/PageHeader";
import { LanguageContext } from "@/context/LanguageContext";

const DonatePage = () => {
  const { t } = useContext(LanguageContext);
  const [amount, setAmount] = useState("100");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [designation, setDesignation] = useState("general");
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const getFinalAmount = () => {
    return amount === "Custom" ? customAmount : amount;
  };

  const isCustomAmountValid = () => {
    if (amount !== "Custom") return true;
    return customAmount && parseFloat(customAmount) > 0;
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
        title: t('donate_page.success.title'),
        description: t('donate_page.success.description'),
      });
    } catch (error) {
      console.error("Error processing donation:", error);
      toast({
        title: t('donate_page.success.error_title'),
        description: t('donate_page.success.error_description'),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: Error) => {
    console.error("Payment error:", error);
    toast({
      title: t('donate_page.success.payment_failed'),
      description:
        error.message ||
        t('donate_page.success.payment_error'),
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  return (
    <>
      <PageHeader title={t('donate_page.title')}>
        <p className="text-lg text-gray-100">
          {t('donate_page.subtitle')}
        </p>
        <p className="text-base text-gray-200 mt-2">
          {t('donate_page.description')}
        </p>
      </PageHeader>

      {/* Donation Amount Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
                  <h2 className="section-title">{t('donate_page.select_amount.title')}</h2>
        <div className="flex justify-center">
          <Card className="w-full max-w-4xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <Label className="text-xl font-medium text-gray-700">{t('donate_page.select_amount.subtitle')}</Label>
              </div>
                
              <RadioGroup
                value={amount}
                onValueChange={(value) => {
                  setAmount(value);
                  if (value !== "Custom") {
                    setCustomAmount("");
                  }
                }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8"
              >
                {["25", "50", "100", "250", "500", "Custom"].map((value) => (
                    <div key={value} className="flex justify-center">
                    <RadioGroupItem
                      value={value}
                      id={`amount-${value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`amount-${value}`}
                        className="w-full py-6 px-8 text-center font-semibold text-xl rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 peer-data-[state=checked]:border-orthodox-blue peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-orthodox-blue bg-white border-gray-200 hover:border-gray-300"
                    >
                      {value === "Custom" ? "Custom" : `$${value}`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
                
              {amount === "Custom" && (
                <div className="text-center mt-6">
                  <Label htmlFor="custom-amount" className="text-xl font-medium text-gray-700 block mb-4">{t('donate_page.select_amount.custom_amount')}</Label>
                  <div className="relative inline-block">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                      $
                    </span>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder={t('donate_page.select_amount.custom_placeholder')}
                      className={`pl-10 pr-6 py-4 text-xl w-64 border-2 focus:ring-orthodox-blue focus:ring-orthodox-blue rounded-lg ${
                        customAmount && parseFloat(customAmount) > 0 
                          ? 'border-green-500 focus:border-green-500' 
                          : 'border-gray-200 focus:border-orthodox-blue'
                      }`}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                  {customAmount && (
                    <div className="mt-2">
                      {parseFloat(customAmount) > 0 ? (
                        <span className="text-green-600 text-sm font-medium">{t('donate_page.select_amount.valid_amount')}{parseFloat(customAmount).toFixed(2)}</span>
                      ) : (
                        <span className="text-red-600 text-sm font-medium">{t('donate_page.select_amount.invalid_amount')}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
                

              </CardContent>
            </Card>
          </div>
            </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="md:flex gap-8">
            {/* Donation Form */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-orthodox-blue">
                    {t('donate_page.make_donation.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                              <div>
                    <Label className="text-lg mb-3 block">{t('donate_page.make_donation.frequency')}</Label>
                    <RadioGroup
                      value={frequency}
                      onValueChange={setFrequency}
                      className="flex gap-4"
                    >
                      <div className="flex-1">
                        <RadioGroupItem
                          value="one-time"
                          id="frequency-one-time"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="frequency-one-time"
                          className="w-full py-4 px-6 text-center font-semibold text-lg rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 peer-data-[state=checked]:border-orthodox-blue peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-orthodox-blue bg-white border-gray-200 hover:border-gray-300 block"
                        >
                          {t('donate_page.make_donation.one_time')}
                        </Label>
                      </div>
                      <div className="flex-1">
                        <RadioGroupItem
                          value="monthly"
                          id="frequency-monthly"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="frequency-monthly"
                          className="w-full py-4 px-6 text-center font-semibold text-lg rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 peer-data-[state=checked]:border-orthodox-blue peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-orthodox-blue bg-white border-gray-200 hover:border-gray-300 block"
                        >
                          {t('donate_page.make_donation.monthly')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

            <div>
              <Label className="text-lg mb-3 block">{t('donate_page.make_donation.designation')}</Label>
              <select
                className="w-full border-gray-300 rounded-md focus:ring-orthodox-blue focus:border-orthodox-blue p-2"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option value="general">{t('donate_page.make_donation.designation_options.general')}</option>
                <option value="curriculum">{t('donate_page.make_donation.designation_options.curriculum')}</option>
                <option value="teacher-training">{t('donate_page.make_donation.designation_options.teacher_training')}</option>
                <option value="technology">
                  {t('donate_page.make_donation.designation_options.technology')}
                </option>
                <option value="scholarship">{t('donate_page.make_donation.designation_options.scholarship')}</option>
              </select>
            </div>

            <div>
              <Label htmlFor="donation-note" className="text-lg mb-3 block">
                {t('donate_page.make_donation.note')}
              </Label>
              <textarea
                id="donation-note"
                placeholder={t('donate_page.make_donation.note_placeholder')}
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
                <TabsList className="tabs-list w-full flex p-0 bg-transparent border rounded-lg overflow-hidden">
                  <TabsTrigger 
                    value="paypal" 
                    className="tabs-trigger flex-1 py-3 px-4 text-center font-medium border-r last:border-r-0 transition-colors hover:bg-blue-100 data-[state=active]:bg-orthodox-blue data-[state=active]:text-black"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.08c3.476 0 5.93.221 7.35 1.12 1.57.943 2.454 2.53 2.595 4.821.13 2.165-.26 3.24-.887 4.082-.67.894-1.5 1.25-2.48 1.25-.3 0-.6 0-.9-.02l-.42-.03c-1.1-.08-1.5-.3-1.8-.5-.3-.2-.5-.5-.6-.9l-.1-.4c-.1-.4-.2-.8-.4-1.1-.1-.3-.3-.5-.6-.6-.3-.1-.7-.1-1.1-.1h-1.3c-.4 0-.8.1-1.1.4-.3.3-.4.7-.4 1.1v.1l.1.7c0 .1 0 .2-.1.3l-1.8 9.8z"></path>
                        <path d="M6.028 21.3c.1.2.3.3.6.3h4.2c.4 0 .7-.1.9-.4.2-.2.3-.5.3-.8l1.5-8.5c0-.1 0-.2.1-.3l.1-.2c.1-.1.2-.1.3-.1h.3c2.8 0 5.3-.5 5.3-.5.5-.1.7-.3.8-.4.1-.1.2-.3.3-.5.1-.2 0-.5-.1-.6-.1-.1-.3-.2-.5-.2h-9.2c-.4 0-.7.1-.9.4l-3.2 3.9-1.3 6.7c0 .1 0 .2.1.3z"></path>
                      </svg>
                      {t('donate_page.payment_methods.paypal')}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bank" 
                    className="tabs-trigger flex-1 py-3 px-4 text-center font-medium border-r last:border-r-0 transition-colors hover:bg-blue-100 data-[state=active]:bg-orthodox-blue data-[state=active]:text-black"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.75-2.34-1.27 0-.28.45-.4.77-.4.83.01 1.53.26 2.16.62l.34-1.6c-.89-.38-1.78-.62-2.69-.62-1.51 0-2.48.92-2.48 2.04 0 2.14 2.61 2.22 2.81 2.22 1.23 0 2.08-.39 2.34-1.16.09-.27.13-.57.13-.9h-1.7v-1.39h3.01l.01 1.02c.01 1.17-.64 2.68-2.22 3.1v1.48h4.15v-1.49c-1.63-.31-2.34-1.28-2.34-2.65z"></path>
                      </svg>
                      {t('donate_page.payment_methods.bank_transfer')}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="zelle" 
                    className="tabs-trigger flex-1 py-3 px-4 text-center font-medium border-r last:border-r-0 transition-colors hover:bg-blue-100 data-[state=active]:bg-orthodox-blue data-[state=active]:text-black"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"></path>
                      </svg>
                      {t('donate_page.payment_methods.zelle')}
                    </span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="paypal" className="space-y-4">
                  {!isCustomAmountValid() ? (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center text-yellow-800 mb-2">
                        <svg className="h-5 w-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-medium">{t('donate_page.validation.enter_custom_amount')}</h3>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        {t('donate_page.validation.enter_valid_amount')}
                      </p>
                    </div>
                  ) : (
                    <PayPalPaymentForm
                      amount={getFinalAmount()}
                      frequency={frequency}
                      designation={designation}
                      note={note}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
                </TabsContent>

                <TabsContent value="credit">
                  {!isCustomAmountValid() ? (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center text-yellow-800 mb-2">
                        <svg className="h-5 w-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-medium">{t('donate_page.validation.enter_custom_amount')}</h3>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        {t('donate_page.validation.enter_valid_amount')}
                      </p>
                    </div>
                  ) : (
                    <CreditCardForm
                      amount={getFinalAmount()}
                      frequency={frequency}
                      designation={designation}
                      note={note}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      disabled={isProcessing}
                    />
                  )}
                </TabsContent>

                <TabsContent value="bank">
                  {!isCustomAmountValid() ? (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center text-yellow-800 mb-2">
                        <svg className="h-5 w-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-medium">{t('donate_page.validation.enter_custom_amount')}</h3>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        {t('donate_page.validation.enter_valid_amount')}
                      </p>
                    </div>
                  ) : (
                    <BankTransferButton
                      amount={getFinalAmount()}
                      frequency={frequency}
                      designation={designation}
                      note={note}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  )}
                </TabsContent>

                <TabsContent value="zelle" className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 text-orthodox-blue mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                      <h3 className="text-xl font-bold text-orthodox-blue">{t('donate_page.zelle.title')}</h3>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm mb-5">
                      <p className="text-gray-700 mb-3 font-medium">{t('donate_page.zelle.subtitle')}</p>
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-100 mb-4">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-orthodox-blue mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                          <span className="font-mono text-lg font-semibold">{t('donate_page.zelle.email')}</span>
                        </div>
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText('Nassupay@gmail.com');
                            toast({
                              title: t('donate_page.zelle.email_copied'),
                              description: t('donate_page.zelle.email_copied_desc'),
                              className: "bg-green-50 border-green-200 text-green-800"
                            });
                          }}
                          className="ml-2 bg-orthodox-blue hover:bg-orthodox-blue/90 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          {t('donate_page.zelle.copy_email')}
                        </Button>
                      </div>
                      
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>{t('donate_page.zelle.important').split(':')[0]}:</strong> {t('donate_page.zelle.important').split(':')[1]}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start text-sm text-gray-600">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>{t('donate_page.zelle.confirmation')}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {t('donate_page.zelle.secure_title')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t('donate_page.zelle.secure_desc')}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
                </CardContent>
              </Card>
        </div>

        {/* Impact Card */}
            <div className="md:w-1/2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-orthodox-blue">
                    {t('donate_page.impact.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
            <div>
              <h4 className="font-bold mb-2">{t('donate_page.impact.amount_25')}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {(t('donate_page.impact.amount_25_items') as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('donate_page.impact.amount_50')}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {(t('donate_page.impact.amount_50_items') as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('donate_page.impact.amount_100')}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {(t('donate_page.impact.amount_100_items') as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('donate_page.impact.amount_250')}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {(t('donate_page.impact.amount_250_items') as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="font-medium">
                {t('donate_page.impact.tax_deductible')}
              </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DonatePage;