import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckSquare, FileCheck, AlertCircle, Clock } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/components/ui/sonner";

const complianceFrameworks = [
  {
    name: "SOC 2 Type II",
    progress: 85,
    totalControls: 64,
    compliantControls: 54,
    status: "in-progress" as const,
    nextAudit: "2024-03-15"
  },
  {
    name: "ISO 27001",
    progress: 92,
    totalControls: 114,
    compliantControls: 105,
    status: "in-progress" as const,
    nextAudit: "2024-04-20"
  },
  {
    name: "GDPR",
    progress: 78,
    totalControls: 32,
    compliantControls: 25,
    status: "in-progress" as const,
    nextAudit: "2024-02-28"
  }
];

const recentControls = [
  {
    id: "C001",
    name: "Access Control Policy",
    framework: "SOC 2",
    status: "closed" as const,
    lastReview: "2024-01-10",
    nextReview: "2024-04-10",
    owner: "IT Security Team"
  },
  {
    id: "C002",
    name: "Data Encryption Standards",
    framework: "ISO 27001",
    status: "open" as const,
    lastReview: "2024-01-05",
    nextReview: "2024-02-05",
    owner: "Data Protection Officer"
  },
  {
    id: "C003",
    name: "Incident Response Plan",
    framework: "SOC 2",
    status: "in-progress" as const,
    lastReview: "2024-01-12",
    nextReview: "2024-03-12",
    owner: "Security Operations"
  }
];

export default function ComplianceTracking() {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  const totalControls = complianceFrameworks.reduce((sum, framework) => sum + framework.totalControls, 0);
  const compliantControls = complianceFrameworks.reduce((sum, framework) => sum + framework.compliantControls, 0);
  const overallCompliance = Math.round((compliantControls / totalControls) * 100);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    toast.success("Generating compliance report...");
    
    setTimeout(() => {
      setIsGeneratingReport(false);
      toast.success("Compliance report generated successfully!");
    }, 2000);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Compliance Tracking</h1>
          <p className="text-muted-foreground">Monitor compliance status across all frameworks</p>
        </div>
        <Button className="button-glow" onClick={handleGenerateReport} disabled={isGeneratingReport}>
          <FileCheck className="mr-2 h-4 w-4" />
          {isGeneratingReport ? "Generating..." : "Generate Report"}
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Overall Compliance"
          value={`${overallCompliance}%`}
          description="Across all frameworks"
          icon={CheckSquare}
          variant="success"
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Active Frameworks"
          value={complianceFrameworks.length}
          description="Currently monitored"
          icon={FileCheck}
          className="hover:-rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Total Controls"
          value={totalControls}
          description="Compliance requirements"
          icon={CheckSquare}
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Pending Reviews"
          value="8"
          description="Due this month"
          icon={Clock}
          variant="warning"
          className="hover:-rotate-1 transition-transform duration-300"
        />
      </div>

      {/* Compliance Frameworks */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {complianceFrameworks.map((framework) => (
          <Card key={framework.name} className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {framework.name}
                <StatusBadge status={framework.status} />
              </CardTitle>
              <CardDescription>
                Next audit: {framework.nextAudit}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 shimmer">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Compliance Progress</span>
                  <span className="pulse-glow">{framework.progress}%</span>
                </div>
                <Progress value={framework.progress} className="h-2 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Compliant</div>
                  <div className="font-semibold text-success pulse-glow">{framework.compliantControls}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Controls</div>
                  <div className="font-semibold">{framework.totalControls}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Control Reviews */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Control Reviews</CardTitle>
          <CardDescription>
            Latest updates on compliance controls and their status
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Next Review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentControls.map((control) => (
                <TableRow key={control.id} className="hover:bg-accent/10 transition-colors duration-200">
                  <TableCell className="font-medium">{control.id}</TableCell>
                  <TableCell>{control.name}</TableCell>
                  <TableCell>{control.framework}</TableCell>
                  <TableCell>
                    <StatusBadge status={control.status} />
                  </TableCell>
                  <TableCell>{control.owner}</TableCell>
                  <TableCell>{control.nextReview}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}