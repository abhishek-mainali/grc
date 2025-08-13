import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertTriangle, CheckSquare, Search, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";

const recentActivities = [
  {
    id: 1,
    type: "Risk",
    description: "New high-risk vulnerability identified in web application",
    timestamp: "2 hours ago",
    severity: "high" as const
  },
  {
    id: 2,
    type: "Compliance",
    description: "SOC 2 control review completed successfully",
    timestamp: "4 hours ago",
    severity: "low" as const
  },
  {
    id: 3,
    type: "Incident",
    description: "Security incident INC002 has been resolved",
    timestamp: "6 hours ago",
    severity: "medium" as const
  },
  {
    id: 4,
    type: "Vulnerability",
    description: "Weekly vulnerability scan completed for database servers",
    timestamp: "1 day ago",
    severity: "low" as const
  }
];

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your governance, risk, and compliance status</p>
        </div>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          View All Activities
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Risks"
          value="47"
          description="12 high priority"
          icon={Shield}
          variant="warning"
        />
        <MetricCard
          title="Compliance Score"
          value="87%"
          description="+5% from last month"
          icon={CheckSquare}
          variant="success"
        />
        <MetricCard
          title="Open Incidents"
          value="3"
          description="1 critical, 2 medium"
          icon={AlertTriangle}
          variant="destructive"
        />
        <MetricCard
          title="Vulnerabilities"
          value="28"
          description="8 require attention"
          icon={Search}
          variant="warning"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Risk Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Risk Summary
            </CardTitle>
            <CardDescription>Current risk landscape overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Critical Risks</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">5</span>
                <TrendingDown className="h-4 w-4 text-success" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High Risks</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">12</span>
                <TrendingUp className="h-4 w-4 text-destructive" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium Risks</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">18</span>
                <TrendingDown className="h-4 w-4 text-success" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Risks</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">12</span>
                <TrendingUp className="h-4 w-4 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Compliance Status
            </CardTitle>
            <CardDescription>Framework compliance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">SOC 2 Type II</span>
              <span className="text-sm font-medium text-success">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">ISO 27001</span>
              <span className="text-sm font-medium text-success">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">GDPR</span>
              <span className="text-sm font-medium text-warning">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">HIPAA</span>
              <span className="text-sm font-medium text-success">88%</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <StatusBadge status={activity.severity} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Upcoming Tasks */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used actions and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="outline" className="justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Create New Risk
            </Button>
            <Button variant="outline" className="justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Log Incident
            </Button>
            <Button variant="outline" className="justify-start">
              <Search className="mr-2 h-4 w-4" />
              Run Vulnerability Scan
            </Button>
            <Button variant="outline" className="justify-start">
              <CheckSquare className="mr-2 h-4 w-4" />
              Generate Compliance Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Important deadlines and scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">SOC 2 Audit Preparation</p>
                  <p className="text-xs text-muted-foreground">Due in 15 days</p>
                </div>
                <StatusBadge status="medium" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Quarterly Risk Assessment</p>
                  <p className="text-xs text-muted-foreground">Due in 8 days</p>
                </div>
                <StatusBadge status="high" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Security Training Update</p>
                  <p className="text-xs text-muted-foreground">Due in 22 days</p>
                </div>
                <StatusBadge status="low" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
