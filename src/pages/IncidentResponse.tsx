import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertTriangle, Clock, CheckCircle, Activity } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/components/ui/sonner";

const mockIncidents = [
  {
    id: "INC001",
    title: "Unauthorized Access Attempt",
    description: "Multiple failed login attempts detected from suspicious IP",
    severity: "high" as const,
    status: "open" as const,
    reporter: "Security System",
    assignee: "Security Team",
    createdAt: "2024-01-15 09:30",
    updatedAt: "2024-01-15 14:20"
  },
  {
    id: "INC002",
    title: "Email System Outage",
    description: "Complete email service unavailability affecting all users",
    severity: "critical" as const,
    status: "in-progress" as const,
    reporter: "IT Operations",
    assignee: "Infrastructure Team",
    createdAt: "2024-01-14 08:15",
    updatedAt: "2024-01-15 10:45"
  },
  {
    id: "INC003",
    title: "Data Backup Failure",
    description: "Scheduled backup process failed for customer database",
    severity: "medium" as const,
    status: "resolved" as const,
    reporter: "Backup System",
    assignee: "Database Admin",
    createdAt: "2024-01-13 02:00",
    updatedAt: "2024-01-13 08:30"
  }
];

export default function IncidentResponse() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "",
    assignee: ""
  });
  const navigate = useNavigate();

  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(i => i.status === "open").length;
  const criticalIncidents = incidents.filter(i => i.severity === "critical").length;
  const avgResponseTime = "2.5h";

  const handleLogIncident = async () => {
    if (!newIncident.title || !newIncident.description || !newIncident.severity || !newIncident.assignee) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    toast.success("Logging incident...");
    
    // Simulate API call
    setTimeout(() => {
      const incident = {
        id: `INC${String(incidents.length + 1).padStart(3, '0')}`,
        title: newIncident.title,
        description: newIncident.description,
        severity: newIncident.severity as "critical" | "high" | "medium" | "low",
        status: "open" as const,
        reporter: "User",
        assignee: newIncident.assignee,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      };
      
      setIncidents([incident, ...incidents]);
      setNewIncident({ title: "", description: "", severity: "", assignee: "" });
      setIsCreateDialogOpen(false);
      setIsLoading(false);
      toast.success("Incident logged successfully!");
    }, 1000);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Incident Response</h1>
          <p className="text-muted-foreground">Track and manage security incidents and responses</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-glow">
              <Plus className="mr-2 h-4 w-4" />
              Log Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] glass-effect">
            <DialogHeader>
              <DialogTitle>Log New Incident</DialogTitle>
              <DialogDescription>
                Report a new security incident for investigation and response.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Incident Title</Label>
                <Input 
                  id="title" 
                  placeholder="Brief description of the incident" 
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed description of the incident" 
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={newIncident.severity} onValueChange={(value) => setNewIncident({...newIncident, severity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select value={newIncident.assignee} onValueChange={(value) => setNewIncident({...newIncident, assignee: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Security Team">Security Team</SelectItem>
                      <SelectItem value="Infrastructure Team">Infrastructure Team</SelectItem>
                      <SelectItem value="Compliance Team">Compliance Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogIncident} disabled={isLoading} className="button-glow">
                {isLoading ? "Logging..." : "Log Incident"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Incidents"
          value={totalIncidents}
          description="All time incidents"
          icon={AlertTriangle}
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Open Incidents"
          value={openIncidents}
          description="Currently active"
          icon={Activity}
          variant="warning"
          className="hover:-rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Critical Incidents"
          value={criticalIncidents}
          description="Highest priority"
          icon={AlertTriangle}
          variant="destructive"
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Avg Response Time"
          value={avgResponseTime}
          description="Time to first response"
          icon={Clock}
          variant="success"
          className="hover:-rotate-1 transition-transform duration-300"
        />
      </div>

      {/* Incidents Table */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>
            Latest security incidents and their current status
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-accent/10 transition-colors duration-200">
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{incident.title}</div>
                      <div className="text-sm text-muted-foreground">{incident.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={incident.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={incident.status} />
                  </TableCell>
                  <TableCell>{incident.assignee}</TableCell>
                  <TableCell>{incident.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}