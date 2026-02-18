import { useState, useEffect } from "react";
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Store, Bell, Shield, Palette } from 'lucide-react';
import api from "@/lib/axiosInstance";


// Field names  to match the Django serializer exactly
interface BusinessProfile {
  name: string;
  phone_number: string;
  address: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//Component

const Settings = () => {
  const { toast } = useToast();

  //Business profile state
  const [profile, setProfile] = useState<BusinessProfile>({
    name: "",
    phone_number: "",
    address: "",
  });
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  //Password state
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  //Load business profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<Partial<BusinessProfile>>("/api/business/profile/");
        setProfile((prev) => ({ ...prev, ...res.data }));
      } catch (error: any) {
        toast({
          title: "Could not load business profile",
          description: error?.response?.data?.detail ?? "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsFetchingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  //Business profile handlers
  const handleProfileChange =
      (field: keyof BusinessProfile) =>
          (e: React.ChangeEvent<HTMLInputElement>) => {
            setProfile((prev) => ({ ...prev, [field]: e.target.value }));
          };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      await api.post("/api/business/profile/", profile);
      toast({ title: "Business profile saved successfully!" });
    } catch (error: any) {
      const detail = error?.response?.data;
      const message =
          typeof detail === "object"
              ? Object.entries(detail)
                  .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
                  .join(" | ")
              : (detail?.detail ?? "Please try again.");
      toast({
        title: "Failed to save profile",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Password handlers
  const handlePasswordChange =
      (field: keyof PasswordForm) =>
          (e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }));
          };

  const handleUpdatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation must be identical.",
        variant: "destructive",
      });
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setIsSavingPassword(true);
    try {
      await api.post("/api/auth_app/change-password/", {
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
      });
      toast({ title: "Password updated successfully!" });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast({
        title: "Failed to update password",
        description: error?.response?.data?.detail ?? "Please check your current password.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  //Render
  return (
      <DashboardLayout title="Settings">
        <div className="space-y-6 max-w-4xl">

          {/* ── Business Information ── */}
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
              {isFetchingProfile ? (
                  <div className="flex items-center gap-2 py-4">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading profile…</p>
                  </div>
              ) : (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                            id="businessName"
                            value={profile.name}
                            onChange={handleProfileChange("name")}
                            placeholder="e.g. Kamau's General Store"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            id="phone_number"
                            value={profile.phone_number}
                            onChange={handleProfileChange("phone_number")}
                            placeholder="+254 712 345 678"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Input
                          id="address"
                          value={profile.address}
                          onChange={handleProfileChange("address")}
                          placeholder="123 Tom Mboya Street, Nairobi"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
                      {isSavingProfile ? "Saving…" : "Save Changes"}
                    </Button>
                  </>
              )}
            </CardContent>
          </Card>

          {/* ── Notifications ── */}
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
                <div className="space-y-0.5">
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when items fall below minimum stock
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Overstock Warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert when items exceed maximum stock levels
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Sales Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a summary of daily sales via SMS
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiry Date Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded before products expire
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* ── Security ── */}
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
                <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange("currentPassword")}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange("newPassword")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange("confirmPassword")}
                  />
                </div>
              </div>
              <Button onClick={handleUpdatePassword} disabled={isSavingPassword}>
                {isSavingPassword ? "Updating…" : "Update Password"}
              </Button>
            </CardContent>
          </Card>

          {/* ── Preferences ── */}
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