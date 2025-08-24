import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Palette, 
  Camera, 
  Save, 
  Upload,
  Globe,
  Clock,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Image,
  Download,
  Lock,
  Backup
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const { 
    userProfile, 
    businessSettings, 
    notificationSettings, 
    systemSettings,
    updateUserProfile,
    updateBusinessSettings,
    updateNotificationSettings,
    updateSystemSettings
  } = useStore();

  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSaveBusiness = () => {
    toast({
      title: "Business Settings Updated",
      description: "Your business settings have been successfully updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Updated",
      description: "Your system settings have been updated.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="text-lg">{userProfile.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => updateUserProfile({ name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => updateUserProfile({ email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userProfile.phone}
                    onChange={(e) => updateUserProfile({ phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={userProfile.location}
                    onChange={(e) => updateUserProfile({ location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={userProfile.website || ""}
                    onChange={(e) => updateUserProfile({ website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={userProfile.businessName}
                    onChange={(e) => updateUserProfile({ businessName: e.target.value })}
                    placeholder="Your business name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={userProfile.bio || ""}
                  onChange={(e) => updateUserProfile({ bio: e.target.value })}
                  placeholder="Tell us about yourself and your photography style"
                  rows={4}
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>Configure your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessSettings.businessName}
                    onChange={(e) => updateBusinessSettings({ businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) => updateBusinessSettings({ email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input
                    id="businessPhone"
                    value={businessSettings.phone}
                    onChange={(e) => updateBusinessSettings({ phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={businessSettings.website}
                    onChange={(e) => updateBusinessSettings({ website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={businessSettings.address}
                    onChange={(e) => updateBusinessSettings({ address: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Configure location and format preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={businessSettings.currency} onValueChange={(value) => updateBusinessSettings({ currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={businessSettings.timezone} onValueChange={(value) => updateBusinessSettings({ timezone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                      <SelectItem value="Europe/Paris">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={businessSettings.dateFormat} onValueChange={(value) => updateBusinessSettings({ dateFormat: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={businessSettings.language} onValueChange={(value) => updateBusinessSettings({ language: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={businessSettings.taxRate}
                    onChange={(e) => updateBusinessSettings({ taxRate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Working Hours
              </CardTitle>
              <CardDescription>Set your availability for bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={businessSettings.workingHours.start}
                    onChange={(e) => updateBusinessSettings({ 
                      workingHours: { ...businessSettings.workingHours, start: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={businessSettings.workingHours.end}
                    onChange={(e) => updateBusinessSettings({ 
                      workingHours: { ...businessSettings.workingHours, end: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Working Days</Label>
                <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Switch
                        id={day}
                        checked={businessSettings.workingHours.days.includes(day)}
                        onCheckedChange={(checked) => {
                          const days = checked 
                            ? [...businessSettings.workingHours.days, day]
                            : businessSettings.workingHours.days.filter(d => d !== day);
                          updateBusinessSettings({ 
                            workingHours: { ...businessSettings.workingHours, days }
                          });
                        }}
                      />
                      <Label htmlFor={day} className="text-sm">{day.slice(0, 3)}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSaveBusiness} className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Business Settings
          </Button>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Configure which email notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'newBooking' && 'When a new booking is created'}
                        {key === 'bookingReminder' && 'Reminders for upcoming bookings'}
                        {key === 'paymentReceived' && 'When payments are received'}
                        {key === 'galleryViewed' && 'When clients view their galleries'}
                        {key === 'clientRegistered' && 'When new clients register'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSettings({
                        emailNotifications: { ...notificationSettings.emailNotifications, [key]: checked }
                      })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  SMS Notifications
                </CardTitle>
                <CardDescription>Configure SMS notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings.smsNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'bookingReminder' && 'SMS reminders for upcoming bookings'}
                        {key === 'paymentDue' && 'SMS notifications for payment dues'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => updateNotificationSettings({
                        smsNotifications: { ...notificationSettings.smsNotifications, [key]: checked }
                      })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Reminder Settings
              </CardTitle>
              <CardDescription>Configure automated reminder settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Default Reminder Time (hours before)</Label>
                  <Input
                    id="reminderTime"
                    type="number"
                    value={notificationSettings.reminderSettings.defaultReminderTime}
                    onChange={(e) => updateNotificationSettings({
                      reminderSettings: { 
                        ...notificationSettings.reminderSettings, 
                        defaultReminderTime: parseInt(e.target.value) || 24 
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderFrequency">Reminder Frequency</Label>
                  <Select 
                    value={notificationSettings.reminderSettings.reminderFrequency} 
                    onValueChange={(value: 'once' | 'daily' | 'weekly') => updateNotificationSettings({
                      reminderSettings: { 
                        ...notificationSettings.reminderSettings, 
                        reminderFrequency: value 
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send reminders based on settings
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.reminderSettings.autoReminders}
                  onCheckedChange={(checked) => updateNotificationSettings({
                    reminderSettings: { 
                      ...notificationSettings.reminderSettings, 
                      autoReminders: checked 
                    }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSaveNotifications} className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Notification Settings
          </Button>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={systemSettings.theme} 
                    onValueChange={(value: 'light' | 'dark' | 'system') => updateSystemSettings({ theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>Security and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.twoFactorAuth}
                    onCheckedChange={(checked) => updateSystemSettings({ twoFactorAuth: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => updateSystemSettings({ sessionTimeout: parseInt(e.target.value) || 60 })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Backup className="h-5 w-5" />
                Backup & Data
              </CardTitle>
              <CardDescription>Manage your data backup and retention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup your data
                  </p>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => updateSystemSettings({ autoBackup: checked })}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select 
                    value={systemSettings.backupFrequency} 
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') => updateSystemSettings({ backupFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (months)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={systemSettings.dataRetention}
                    onChange={(e) => updateSystemSettings({ dataRetention: parseInt(e.target.value) || 12 })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Default Gallery Settings
              </CardTitle>
              <CardDescription>Default settings for new galleries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public by Default</Label>
                  <p className="text-sm text-muted-foreground">
                    New galleries will be public
                  </p>
                </div>
                <Switch
                  checked={systemSettings.defaultGallerySettings.isPublic}
                  onCheckedChange={(checked) => updateSystemSettings({
                    defaultGallerySettings: { 
                      ...systemSettings.defaultGallerySettings, 
                      isPublic: checked 
                    }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Download Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow downloads by default
                  </p>
                </div>
                <Switch
                  checked={systemSettings.defaultGallerySettings.downloadEnabled}
                  onCheckedChange={(checked) => updateSystemSettings({
                    defaultGallerySettings: { 
                      ...systemSettings.defaultGallerySettings, 
                      downloadEnabled: checked 
                    }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Password Protected</Label>
                  <p className="text-sm text-muted-foreground">
                    Require password by default
                  </p>
                </div>
                <Switch
                  checked={systemSettings.defaultGallerySettings.passwordProtected}
                  onCheckedChange={(checked) => updateSystemSettings({
                    defaultGallerySettings: { 
                      ...systemSettings.defaultGallerySettings, 
                      passwordProtected: checked 
                    }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Watermark Settings
              </CardTitle>
              <CardDescription>Configure watermark for gallery images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Watermark</Label>
                  <p className="text-sm text-muted-foreground">
                    Add watermark to gallery images
                  </p>
                </div>
                <Switch
                  checked={systemSettings.watermarkSettings.enabled}
                  onCheckedChange={(checked) => updateSystemSettings({
                    watermarkSettings: { 
                      ...systemSettings.watermarkSettings, 
                      enabled: checked 
                    }
                  })}
                />
              </div>
              
              {systemSettings.watermarkSettings.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="watermarkText">Watermark Text</Label>
                    <Input
                      id="watermarkText"
                      value={systemSettings.watermarkSettings.text}
                      onChange={(e) => updateSystemSettings({
                        watermarkSettings: { 
                          ...systemSettings.watermarkSettings, 
                          text: e.target.value 
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="watermarkPosition">Position</Label>
                    <Select 
                      value={systemSettings.watermarkSettings.position} 
                      onValueChange={(value: any) => updateSystemSettings({
                        watermarkSettings: { 
                          ...systemSettings.watermarkSettings, 
                          position: value 
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="watermarkOpacity">Opacity: {systemSettings.watermarkSettings.opacity}%</Label>
                    <Slider
                      value={[systemSettings.watermarkSettings.opacity]}
                      onValueChange={([value]) => updateSystemSettings({
                        watermarkSettings: { 
                          ...systemSettings.watermarkSettings, 
                          opacity: value 
                        }
                      })}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Button onClick={handleSaveSystem} className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save System Settings
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}