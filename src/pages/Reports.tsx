import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, BarChart3 } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { toast } from "@/components/ui/sonner";

const reportTemplates = [
  {
    id: "RPT001",
    name: "Risk Assessment Summary",
    description: "Comprehensive overview of all identified risks and their current status",
    category: "Risk Management",
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
    size: "2.4 MB"
  },
  {
    id: "RPT002",
    name: "Compliance Status Report",
    description: "Detailed compliance status across all frameworks and controls",
    category: "Compliance",
    frequency: "Quarterly",
    lastGenerated: "2024-01-10",
    size: "1.8 MB"
  },
  {
    id: "RPT003",
    name: "Incident Response Summary",
    description: "Analysis of security incidents and response effectiveness",
    category: "Incident Response",
    frequency: "Monthly",
    lastGenerated: "2024-01-12",
    size: "1.2 MB"
  },
  {
    id: "RPT004",
    name: "Vulnerability Assessment",
    description: "Complete vulnerability scan results and remediation status",
    category: "Vulnerability Management",
    frequency: "Weekly",
    lastGenerated: "2024-01-14",
    size: "3.1 MB"
  }
];

const recentReports = [
  {
    id: "GEN001",
    name: "Q4 2023 Risk Assessment",
    type: "Risk Management",
    generatedBy: "Sarah Johnson",
    generatedAt: "2024-01-15 09:30",
    status: "completed",
    downloadUrl: "#"
  },
  {
    id: "GEN002",
    name: "SOC 2 Compliance Report",
    type: "Compliance",
    generatedBy: "Mike Davis",
    generatedAt: "2024-01-14 14:20",
    status: "completed",
    downloadUrl: "#"
  },
  {
    id: "GEN003",
    name: "Monthly Incident Summary",
    type: "Incident Response",
    generatedBy: "Security Team",
    generatedAt: "2024-01-13 16:45",
    status: "completed",
    downloadUrl: "#"
  }
];

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  const totalReports = reportTemplates.length;
  const monthlyReports = reportTemplates.filter(r => r.frequency === "Monthly").length;
  const recentCount = recentReports.length;

  const handleGenerateReport = async (templateName: string) => {
    setIsGenerating(true);
    toast.success(`Generating ${templateName}...`);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${templateName} generated successfully!`);
    }, 2000);
  };

  const handleDownloadReport = async (reportId: string, reportName: string) => {
    setDownloadingId(reportId);
    toast.success(`Downloading ${reportName}...`);
    
    setTimeout(() => {
      setDownloadingId(null);
      toast.success(`${reportName} downloaded successfully!`);
    }, 1500);
  };

  const handleGenerateCustomReport = () => {
    toast.success("Opening custom report builder...");
    // This would typically open a modal or navigate to a report builder
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Reports</h1>
          <p className="text-muted-foreground">Generate and manage GRC reports and documentation</p>
        </div>
        <Button className="button-glow" onClick={handleGenerateCustomReport}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Custom Report
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Report Templates"
          value={totalReports}
          description="Available templates"
          icon={FileText}
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Monthly Reports"
          value={monthlyReports}
          description="Automated monthly"
          icon={Calendar}
          className="hover:-rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Recent Reports"
          value={recentCount}
          description="Generated this week"
          icon={BarChart3}
          className="hover:rotate-1 transition-transform duration-300"
        />
        <MetricCard
          title="Total Downloads"
          value="156"
          description="This month"
          icon={Download}
          variant="success"
          className="hover:-rotate-1 transition-transform duration-300"
        />
      </div>

      {/* Report Templates */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>
            Pre-configured report templates for different GRC areas
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg space-y-3 hover-scale interactive-card">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="button-glow"
                    onClick={() => handleGenerateReport(template.name)}
                    disabled={isGenerating}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline" className="pulse-glow">{template.category}</Badge>
                  <span className="text-muted-foreground">{template.frequency}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last generated: {template.lastGenerated} • Size: {template.size}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Recently generated reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent className="shimmer">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated By</TableHead>
                <TableHead>Generated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-accent/10 transition-colors duration-200">
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="pulse-glow">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell>{report.generatedAt}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="button-glow"
                      onClick={() => handleDownloadReport(report.id, report.name)}
                      disabled={downloadingId === report.id}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {downloadingId === report.id ? "Downloading..." : "Download"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}