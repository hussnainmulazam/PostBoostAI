import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { 
  User, Bell, Shield, Github, Twitter, 
  Linkedin, Chrome, Save, Upload, Trash2, Check, Zap, CreditCard
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SettingsProps {
  onNavigate: (page: string, params?: any) => void;
}

// Mock Google component for icon
function Google({ className }: { className?: string }) {
  return <Chrome className={className} />;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Profile Form State
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and productivity expert",
    company: "Tech Innovations Inc.",
    role: "Product Manager"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1500);
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl mb-1 text-gray-900 font-semibold">Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border border-gray-200 p-1 rounded-xl mb-8 bg-gray-50 flex-wrap h-auto">
          <TabsTrigger 
            value="profile" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="plans" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Plans & Billing
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
          >
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00F5FF] to-[#3B82F6] flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-gray-900">Profile Photo</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-[#00F5FF] to-[#3B82F6] text-white hover:opacity-90">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-gray-200" />

            {/* Profile Info */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium mb-2 block">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-[#00F5FF] focus:ring-[#00F5FF]/20"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium mb-2 block">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-[#00F5FF] focus:ring-[#00F5FF]/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-[#00F5FF] focus:ring-[#00F5FF]/20"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-700 font-medium mb-2 block">Bio</Label>
                <textarea
                  id="bio"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF]/20 transition-colors resize-none text-gray-900 placeholder:text-gray-400"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-gray-700 font-medium mb-2 block">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-[#00F5FF] focus:ring-[#00F5FF]/20"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-gray-700 font-medium mb-2 block">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-[#00F5FF] focus:ring-[#00F5FF]/20"
                />
              </div>
            </div>

            <Separator className="my-8 bg-gray-200" />

            <div className="flex items-center justify-between mt-8">
              {lastSaved && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center text-green-600 text-sm font-medium"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Changes saved successfully
                </motion.div>
              )}
              <div className="flex gap-3 ml-auto">
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-[#00F5FF] to-[#3B82F6] text-white hover:opacity-90 min-w-[140px]"
                >
                  {isSaving ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
             <div className="grid md:grid-cols-3 gap-6">
               {/* Free Plan */}
               <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                 <div className="mb-4">
                   <h3 className="text-lg font-bold text-gray-900">Free</h3>
                   <div className="text-3xl font-bold text-gray-900 mt-2">$0<span className="text-sm font-normal text-gray-500">/mo</span></div>
                   <p className="text-sm text-gray-500 mt-2">Perfect for getting started</p>
                 </div>
                 <div className="space-y-3 flex-1 mb-8">
                   {["5 AI Generations/day", "Basic Analytics", "1 User", "Standard Support"].map((feat, i) => (
                     <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                       <Check className="w-4 h-4 text-green-500" />
                       {feat}
                     </div>
                   ))}
                 </div>
                 <Button variant="outline" className="w-full" disabled>Current Plan</Button>
               </div>

               {/* Pro Plan */}
               <div className="rounded-2xl border-2 border-blue-500 bg-white p-6 shadow-md flex flex-col relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                 <div className="mb-4">
                   <h3 className="text-lg font-bold text-gray-900">Pro</h3>
                   <div className="text-3xl font-bold text-gray-900 mt-2">$29<span className="text-sm font-normal text-gray-500">/mo</span></div>
                   <p className="text-sm text-gray-500 mt-2">For growing creators</p>
                 </div>
                 <div className="space-y-3 flex-1 mb-8">
                   {["Unlimited Generations", "Advanced Analytics", "5 Users", "Priority Support", "All Platforms"].map((feat, i) => (
                     <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                       <Check className="w-4 h-4 text-blue-500" />
                       {feat}
                     </div>
                   ))}
                 </div>
                 <Button 
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                   onClick={() => onNavigate('payment', { 
                     plan: { 
                       name: "Pro Plan", price: "$29", period: "/mo", 
                       features: ["Unlimited Generations", "Advanced Analytics", "5 Users", "Priority Support"]
                     } 
                   })}
                 >
                   Upgrade to Pro
                 </Button>
               </div>

               {/* Enterprise Plan */}
               <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                 <div className="mb-4">
                   <h3 className="text-lg font-bold text-gray-900">Enterprise</h3>
                   <div className="text-3xl font-bold text-gray-900 mt-2">$99<span className="text-sm font-normal text-gray-500">/mo</span></div>
                   <p className="text-sm text-gray-500 mt-2">For large teams & agencies</p>
                 </div>
                 <div className="space-y-3 flex-1 mb-8">
                   {["Everything in Pro", "Custom AI Models", "Unlimited Users", "24/7 Dedicated Support", "API Access"].map((feat, i) => (
                     <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                       <Check className="w-4 h-4 text-green-500" />
                       {feat}
                     </div>
                   ))}
                 </div>
                 <Button 
                   className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                   onClick={() => onNavigate('payment', { 
                     plan: { 
                       name: "Enterprise Plan", price: "$99", period: "/mo", 
                       features: ["Everything in Pro", "Custom AI Models", "Unlimited Users", "API Access"]
                     } 
                   })}
                 >
                   Contact Sales
                 </Button>
               </div>
             </div>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Notifications</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900">Weekly Report</Label>
                    <p className="text-sm text-gray-500">Receive a summary of your weekly activity</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#00F5FF]" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900">Product Updates</Label>
                    <p className="text-sm text-gray-500">Stay informed about new features</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#00F5FF]" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900">Security Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about suspicious activity</p>
                  </div>
                  <Switch defaultChecked disabled className="data-[state=checked]:bg-[#00F5FF]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Push Notifications</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900">Task Reminders</Label>
                    <p className="text-sm text-gray-500">Notifications for due tasks</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#00F5FF]" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900">New Comments</Label>
                    <p className="text-sm text-gray-500">When someone comments on your post</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#00F5FF]" />
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8"
          >
             <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
              <div className="grid gap-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current-pass">Current Password</Label>
                  <Input type="password" id="current-pass" className="border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass">New Password</Label>
                  <Input type="password" id="new-pass" className="border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pass">Confirm Password</Label>
                  <Input type="password" id="confirm-pass" className="border-gray-200" />
                </div>
                <Button className="bg-gray-900 text-white hover:bg-gray-800 w-fit mt-2">
                  Update Password
                </Button>
              </div>
             </div>
             
             <Separator />

             <div>
               <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
               <div className="rounded-xl border border-red-100 bg-red-50 p-4 flex items-center justify-between">
                 <div>
                   <h4 className="font-medium text-red-900">Delete Account</h4>
                   <p className="text-sm text-red-700 mt-1">Permanently delete your account and all data</p>
                 </div>
                 <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                   Delete Account
                 </Button>
               </div>
             </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
