import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Check, CreditCard, Shield, Lock, ArrowLeft, Calendar, Wallet, Landmark, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentProps {
  onNavigate: (page: string) => void;
  plan?: {
    name: string;
    price: string;
    period: string;
    features: string[];
  };
}

export function Payment({ onNavigate, plan }: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card");
  
  // Form State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // Default to Pro plan if none provided
  const selectedPlan = plan || {
    name: "Pro Plan",
    price: "$29",
    period: "/mo",
    features: ["Unlimited Content Generation", "Advanced Analytics", "Priority Support", "All Platforms"]
  };

  const maskedCardNumber = cardNumber.trim() || "0000 0000 0000 0000";
  const displayCardName = cardName.trim() || "CARDHOLDER NAME";
  const isCardMethod = paymentMethod === "card";

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    value = value.substring(0, 5);
    setExpiry(value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    setCvc(value);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm"
            >
              <Check className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
            <p className="text-gray-500 mb-8 text-lg">
              You are now subscribed to the <span className="font-semibold text-gray-900">{selectedPlan.name}</span>.<br/>
              A receipt has been sent to your email.
            </p>
            <Button 
              className="w-full bg-gray-900 text-white hover:bg-gray-800 h-14 rounded-xl text-lg font-medium transition-all hover:scale-[1.02]"
              onClick={() => onNavigate('dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('settings')}
          className="mb-8 hover:bg-gray-100 -ml-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Col: Plan Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 p-8 sm:p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden lg:sticky lg:top-8"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <Badge className="bg-blue-500/20 text-blue-200 border border-blue-400/30 hover:bg-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Limited Offer
              </Badge>
              <p className="text-xs text-gray-300">Cancel anytime</p>
            </div>
            <div className="mb-8">
              <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-2">Selected Plan</h3>
              <div className="flex items-baseline gap-1">
                <h1 className="text-4xl sm:text-5xl font-bold">{selectedPlan.name}</h1>
              </div>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold text-blue-400">{selectedPlan.price}</span>
                <span className="text-gray-400 font-medium text-lg">{selectedPlan.period}</span>
              </div>
            </div>

            <div className="space-y-5 mb-10">
              {selectedPlan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 flex-shrink-0 border border-blue-500/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-gray-200 text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between mb-3 text-gray-300">
                <span>Subtotal</span>
                <span className="font-semibold text-white">{selectedPlan.price}</span>
              </div>
              <div className="flex items-center justify-between mb-6 text-gray-300">
                <span>Tax (0%)</span>
                <span className="font-semibold text-white">$0.00</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-bold pt-6 border-t border-gray-800">
                <span>Total due today</span>
                <span>{selectedPlan.price}</span>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="rounded-xl border border-gray-700 px-3 py-2">SSL Encrypted Checkout</div>
              <div className="rounded-xl border border-gray-700 px-3 py-2">Instant Plan Activation</div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Payment Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                 <Lock className="w-5 h-5" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            </div>
            <p className="text-gray-500 ml-1">Complete your purchase to activate your plan securely.</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-3 mb-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-2 pb-2">Choose payment method</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`h-11 rounded-xl border text-sm font-medium transition ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`h-11 rounded-xl border text-sm font-medium transition ${
                  paymentMethod === "paypal"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  PayPal
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`h-11 rounded-xl border text-sm font-medium transition ${
                  paymentMethod === "bank"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  Bank
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <AnimatePresence mode="wait">
              {isCardMethod ? (
                <motion.div
                  key="card-form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-800 text-white p-5 shadow-xl">
                    <p className="text-xs uppercase tracking-widest text-blue-200 mb-6">Virtual Card Preview</p>
                    <p className="font-mono tracking-[0.25em] text-base sm:text-lg">{maskedCardNumber}</p>
                    <div className="flex justify-between items-end mt-8">
                      <div>
                        <p className="text-[10px] text-blue-200 uppercase">Card Holder</p>
                        <p className="text-sm font-semibold">{displayCardName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-200 uppercase">Expires</p>
                        <p className="text-sm font-semibold">{expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium mb-1.5 block">Cardholder Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      required={isCardMethod}
                    />
                  </div>

                  <div>
                    <Label htmlFor="card" className="text-gray-700 font-medium mb-1.5 block">Card Number</Label>
                    <div className="relative group">
                      <Input
                        id="card"
                        placeholder="0000 0000 0000 0000"
                        className="h-12 pl-11 bg-gray-50 border-gray-200 focus:bg-white transition-all font-mono"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        required={isCardMethod}
                      />
                      <CreditCard className="absolute left-3.5 top-[14px] text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="expiry" className="text-gray-700 font-medium mb-1.5 block">Expiry Date</Label>
                      <div className="relative group">
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="h-12 pl-11 bg-gray-50 border-gray-200 focus:bg-white transition-all font-mono"
                          value={expiry}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          required={isCardMethod}
                        />
                        <Calendar className="absolute left-3.5 top-[14px] text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-gray-700 font-medium mb-1.5 block">CVC</Label>
                      <div className="relative group">
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="h-12 pr-11 bg-gray-50 border-gray-200 focus:bg-white transition-all font-mono"
                          value={cvc}
                          onChange={handleCvcChange}
                          maxLength={4}
                          required={isCardMethod}
                          type="password"
                        />
                        <Shield className="absolute right-3.5 top-[14px] text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="alternative-method"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {paymentMethod === "paypal" ? "Continue with PayPal" : "Continue with Bank Transfer"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {paymentMethod === "paypal"
                      ? "You will be redirected to PayPal to securely complete your payment."
                      : "We will generate secure transfer instructions after you continue."}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Secure checkout with end-to-end encryption</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                `Pay ${selectedPlan.price} now`
              )}
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-500 mt-2">
              <div className="rounded-lg border border-gray-200 py-2 px-3 text-center">256-bit encryption</div>
              <div className="rounded-lg border border-gray-200 py-2 px-3 text-center">No hidden charges</div>
              <div className="rounded-lg border border-gray-200 py-2 px-3 text-center">Instant access</div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
