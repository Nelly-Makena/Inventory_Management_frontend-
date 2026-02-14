import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from "react";
import api from "@/api/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Store, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  //  Fetch business profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("business/profile/");
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch business profile", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle save
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("business/profile/", formData);
      alert("Business profile updated successfully");
    } catch (error) {
      console.error("Error saving profile", error);
      alert("Failed to update business profile");
    } finally {
      setLoading(false);
    }
  };

  return (
      <DashboardLayout title="Settings">
        <div className="space-y-6 max-w-4xl">

          {/* Business Settings */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                Business Information
              </CardTitle>
              <CardDescription>
                Manage your business details and preferences
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                />
              </div>

              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when items fall below minimum stock
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Overstock Warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert when items exceed maximum stock levels
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Sales Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a summary of daily sales via SMS
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Expiry Date Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded before products expire
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <Button>Update Password</Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-info" />
                Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="kes">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kes">KES - Kenyan Shilling</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </DashboardLayout>
  );
};

export default Settings;
