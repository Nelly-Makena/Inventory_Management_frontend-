import { useState, useEffect } from "react";
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { Store, Bell } from 'lucide-react';
import api from "@/lib/axiosInstance";
import { useAuth } from "@/context/AuthContext";

interface BusinessProfile {
  name: string;
  phone_number: string;
  address: string;
}

interface NotificationPrefs {
  low_stock_alerts: boolean;
  overstock_alerts: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // business profile
  const [profile, setProfile] = useState<BusinessProfile>({
    name: "", phone_number: "", address: "",
  });
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);
  const [isSavingProfile,   setIsSavingProfile]   = useState(false);

  // notification preferences
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    low_stock_alerts: true,
    overstock_alerts: true,
  });
  const [isFetchingPrefs, setIsFetchingPrefs] = useState(true);
  const [isSavingPrefs,   setIsSavingPrefs]   = useState(false);

  useEffect(() => {
    if (isAdmin) fetchProfile();
    else setIsFetchingProfile(false);
    fetchPrefs();
  }, []);

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

  const fetchPrefs = async () => {
    try {
      const res = await api.get<NotificationPrefs>("/api/business/notification-preferences/");
      setPrefs(res.data);
    } catch {
      // keep defaults if endpoint not ready
    } finally {
      setIsFetchingPrefs(false);
    }
  };

  const handleProfileChange =
      (field: keyof BusinessProfile) =>
          (e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      await api.post("/api/business/profile/", profile);
      toast({ title: "Business profile saved!" });
    } catch (error: any) {
      const detail = error?.response?.data;
      const message = typeof detail === "object"
          ? Object.entries(detail).map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`).join(" | ")
          : (detail?.detail ?? "Please try again.");
      toast({ title: "Failed to save profile", description: message, variant: "destructive" });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSavePrefs = async () => {
    setIsSavingPrefs(true);
    try {
      await api.post("/api/business/notification-preferences/", prefs);
      toast({ title: "Notification preferences saved!" });
    } catch (error: any) {
      toast({
        title: "Failed to save preferences",
        description: error?.response?.data?.detail ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPrefs(false);
    }
  };

  return (
      <DashboardLayout title="Settings">
        <div className="space-y-6 max-w-4xl">

          {/* business info — admin only */}
          {isAdmin && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-primary" />
                    Business Information
                  </CardTitle>
                  <CardDescription>Manage your business details</CardDescription>
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
          )}

          {/* notification preferences — all users */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose which alerts you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isFetchingPrefs ? (
                  <div className="flex items-center gap-2 py-4">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading preferences…</p>
                  </div>
              ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when a product falls below its minimum stock level
                        </p>
                      </div>
                      <Switch
                          checked={prefs.low_stock_alerts}
                          onCheckedChange={(v) => setPrefs((p) => ({ ...p, low_stock_alerts: v }))}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Overstock Warnings</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when a product exceeds its maximum stock level
                        </p>
                      </div>
                      <Switch
                          checked={prefs.overstock_alerts}
                          onCheckedChange={(v) => setPrefs((p) => ({ ...p, overstock_alerts: v }))}
                      />
                    </div>
                    <Button onClick={handleSavePrefs} disabled={isSavingPrefs}>
                      {isSavingPrefs ? "Saving…" : "Save Preferences"}
                    </Button>
                  </>
              )}
            </CardContent>
          </Card>

        </div>
      </DashboardLayout>
  );
};

export default Settings;