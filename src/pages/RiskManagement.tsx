import { useState } from "react";
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

  const totalRisks = risks.length;
  const highRisks = risks.filter(r => r.severity === "high").length;
  const openRisks = risks.filter(r => r.status === "open").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Management</h1>
          <p className="text-muted-foreground">Identify, assess, and manage organizational risks</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Risk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Risk</DialogTitle>
              <DialogDescription>
                Add a new risk to your risk register for assessment and tracking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Risk Name</Label>
                <Input id="name" placeholder="Enter risk name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the risk" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="probability">Probability</Label>
                  <Select>
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
                  <Select>
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
                <Input id="owner" placeholder="Enter risk owner name" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create Risk
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Risks"
          value={totalRisks}
          description="All registered risks"
          icon={Shield}
        />
        <MetricCard
          title="High Risk Items"
          value={highRisks}
          description="Require immediate attention"
          icon={AlertTriangle}
          variant="warning"
        />
        <MetricCard
          title="Open Risks"
          value={openRisks}
          description="Awaiting action"
          icon={TrendingUp}
          variant="destructive"
        />
        <MetricCard
          title="Risk Score"
          value="7.2"
          description="Overall risk rating"
          icon={Shield}
          variant="warning"
        />
      </div>

      {/* Risk Register Table */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>
            Complete list of identified risks with their current status and assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                <TableRow key={risk.id}>
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