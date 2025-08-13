import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/components/ui/sonner";

const mockRisks = [
  {
    id: "R001",
    name: "Data Breach",
    description: "Risk of unauthorized access to customer data",
    severity: "high" as const,
    probability: "medium" as const,
    impact: "high" as const,
    status: "open" as const,
    owner: "John Smith",
    lastUpdated: "2024-01-15"
  },
  {
    id: "R002", 
    name: "System Downtime",
    description: "Risk of critical system unavailability",
    severity: "medium" as const,
    probability: "low" as const,
    impact: "high" as const,
    status: "in-progress" as const,
    owner: "Sarah Johnson",
    lastUpdated: "2024-01-14"
  },
  {
    id: "R003",
    name: "Compliance Violation",
    description: "Risk of regulatory non-compliance",
    severity: "high" as const,
    probability: "medium" as const,
    impact: "medium" as const,
    status: "resolved" as const,
    owner: "Mike Davis",
    lastUpdated: "2024-01-13"
  }
];

export default function RiskManagement() {
  const [risks, setRisks] = useState(mockRisks);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newRisk, setNewRisk] = useState({
    name: "",
    description: "",
    probability: "",
    impact: "",
    owner: ""
  });
  const navigate = useNavigate();

  const totalRisks = risks.length;
  const highRisks = risks.filter(r => r.severity === "high").length;
  const openRisks = risks.filter(r => r.status === "open").length;

  const handleCreateRisk = async () => {
    if (!newRisk.name || !newRisk.description || !newRisk.probability || !newRisk.impact || !newRisk.owner) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    toast.success("Creating new risk...");
    
    // Simulate API call
    setTimeout(() => {
      const severity = newRisk.probability === "high" && newRisk.impact === "high" ? "high" : 
                     newRisk.probability === "medium" || newRisk.impact === "medium" ? "medium" : "low";
      
      const risk = {
        id: `R${String(risks.length + 1).padStart(3, '0')}`,
        name: newRisk.name,
        description: newRisk.description,
        severity: severity as "high" | "medium" | "low",
        probability: newRisk.probability as "high" | "medium" | "low",
        impact: newRisk.impact as "high" | "medium" | "low",
        status: "open" as const,
        owner: newRisk.owner,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      setRisks([...risks, risk]);
      setNewRisk({ name: "", description: "", probability: "", impact: "", owner: "" });
      setIsCreateDialogOpen(false);
      setIsLoading(false);
      toast.success("Risk created successfully!");
    }, 1000);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Risk Management</h1>
          <p className="text-muted-foreground">Identify, assess, and manage organizational risks</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="button-glow">
              <Plus className="mr-2 h-4 w-4" />
              Create Risk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] glass-effect">
            <DialogHeader>
              <DialogTitle>Create New Risk</DialogTitle>
              <DialogDescription>
                Add a new risk to your risk register for assessment and tracking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Risk Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter risk name" 
                  value={newRisk.name}
                  onChange={(e) => setNewRisk({...newRisk, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the risk" 
                  value={newRisk.description}
                  onChange={(e) => setNewRisk({...newRisk, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="probability">Probability</Label>
                  <Select value={newRisk.probability} onValueChange={(value) => setNewRisk({...newRisk, probability: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select probability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="impact">Impact</Label>
                  <Select value={newRisk.impact} onValueChange={(value) => setNewRisk({...newRisk, impact: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner">Risk Owner</Label>
                <Input 
                  id="owner" 
                  placeholder="Enter risk owner name" 
                  value={newRisk.owner}
                  onChange={(e) => setNewRisk({...newRisk, owner: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRisk} disabled={isLoading} className="button-glow">
                {isLoading ? "Creating..." : "Create Risk"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Risks"
          value={totalRisks}
          description="All registered risks"
          icon={Shield}
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="High Risk Items"
          value={highRisks}
          description="Require immediate attention"
          icon={AlertTriangle}
          variant="warning"
          className="hover:-rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Open Risks"
          value={openRisks}
          description="Awaiting action"
          icon={TrendingUp}
          variant="destructive"
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Risk Score"
          value="7.2"
          description="Overall risk rating"
          icon={Shield}
          variant="warning"
          className="hover:-rotate-1 transition-transform duration-300"
        />
      </div>

      {/* Risk Register Table */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>
            Complete list of identified risks with their current status and assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.id} className="hover:bg-accent/10 transition-colors duration-200">
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{risk.name}</div>
                      <div className="text-sm text-muted-foreground">{risk.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={risk.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={risk.status} />
                  </TableCell>
                  <TableCell>{risk.owner}</TableCell>
                  <TableCell>{risk.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}