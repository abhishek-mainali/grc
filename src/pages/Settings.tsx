import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Users, Bell, Shield, Database } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { toast } from "@/components/ui/sonner";

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    orgName: "Acme Corporation",
    timezone: "utc",
    language: "en",
    twoFactor: true,
    sessionTimeout: "30",
    ipRestrictions: false
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    toast.success("Saving settings...");
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1500);
  };

  const handleExportConfig = () => {
    toast.success("Exporting configuration...");
    setTimeout(() => {
      toast.success("Configuration exported successfully!");
    }, 1000);
  };

  const handleImportConfig = () => {
    toast.success("Opening import dialog...");
  };

  const handleResetDefaults = () => {
    toast.success("Resetting to defaults...");
    setTimeout(() => {
      setSettings({
        orgName: "Acme Corporation",
        timezone: "utc",
        language: "en",
        twoFactor: true,
        sessionTimeout: "30",
        ipRestrictions: false
      });
      toast.success("Settings reset to defaults!");
    }, 1000);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground">Configure your GRC platform preferences and settings</p>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Users"
          value="24"
          description="Currently logged in"
          icon={Users}
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Notifications"
          value="12"
          description="Pending alerts"
          icon={Bell}
          variant="warning"
          className="hover:-rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Security Status"
          value="Good"
          description="All systems secure"
          icon={Shield}
          variant="success"
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Database Size"
          value="2.4 GB"
          description="Total data stored"
          icon={Database}
          className="hover:-rotate-1 transition-transform duration-300"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic configuration options for the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 shimmer">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input 
                id="org-name" 
                value={settings.orgName}
                onChange={(e) => setSettings({...settings, orgName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="gmt">GMT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security and access control options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 shimmer">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all user accounts
                </p>
              </div>
              <Switch 
                checked={settings.twoFactor} 
                onCheckedChange={(checked) => setSettings({...settings, twoFactor: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground">
                  Auto-logout after inactivity
                </p>
              </div>
              <Select value={settings.sessionTimeout} onValueChange={(value) => setSettings({...settings, sessionTimeout: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IP Restrictions</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict access by IP address
                </p>
              </div>
              <Switch 
                checked={settings.ipRestrictions} 
                onCheckedChange={(checked) => setSettings({...settings, ipRestrictions: checked})}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Email Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="risk-alerts">High Risk Alerts</Label>
                  <Switch id="risk-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="incident-alerts">Incident Notifications</Label>
                  <Switch id="incident-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compliance-reminders">Compliance Reminders</Label>
                  <Switch id="compliance-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="report-ready">Report Generation</Label>
                  <Switch id="report-ready" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">System Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="scan-complete">Scan Completion</Label>
                  <Switch id="scan-complete" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <Switch id="system-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">Maintenance Notices</Label>
                  <Switch id="maintenance" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="backup-status">Backup Status</Label>
                  <Switch id="backup-status" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Perform system-wide actions and maintenance
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <div className="flex space-x-4">
            <Button className="button-glow" onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
            <Button variant="outline" className="hover-glow" onClick={handleExportConfig}>
              Export Configuration
            </Button>
            <Button variant="outline" className="hover-glow" onClick={handleImportConfig}>
              Import Configuration
            </Button>
            <Button variant="destructive" className="hover-glow" onClick={handleResetDefaults}>
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}