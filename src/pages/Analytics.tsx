import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";

const riskTrends = [
  { month: "Jan", high: 12, medium: 25, low: 8 },
  { month: "Feb", high: 15, medium: 22, low: 12 },
  { month: "Mar", high: 18, medium: 28, low: 15 },
  { month: "Apr", high: 14, medium: 30, low: 18 },
  { month: "May", high: 16, medium: 26, low: 20 },
  { month: "Jun", high: 11, medium: 24, low: 22 }
];

const complianceMetrics = [
  { framework: "SOC 2", current: 85, target: 90, trend: "up" },
  { framework: "ISO 27001", current: 92, target: 95, trend: "up" },
  { framework: "GDPR", current: 78, target: 85, trend: "down" },
  { framework: "HIPAA", current: 88, target: 90, trend: "up" }
];

const incidentMetrics = {
  total: 156,
  resolved: 134,
  avgResolutionTime: "4.2h",
  criticalIncidents: 8,
  monthlyTrend: "down"
};

export default function Analytics() {
  const riskReduction = "15%";
  const complianceImprovement = "8%";
  const responseTimeImprovement = "23%";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground">Data-driven insights into your GRC performance</p>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Risk Reduction"
          value={riskReduction}
          description="Last 6 months"
          icon={TrendingDown}
          variant="success"
        />
        <MetricCard
          title="Compliance Improvement"
          value={complianceImprovement}
          description="Quarter over quarter"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Response Time"
          value={responseTimeImprovement}
          description="Faster incident response"
          icon={BarChart3}
          variant="success"
        />
        <MetricCard
          title="Active Frameworks"
          value="4"
          description="Compliance frameworks"
          icon={PieChart}
        />
      </div>

      {/* Risk Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
            <CardDescription>
              Risk levels over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskTrends.map((month) => (
                <div key={month.month} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{month.month}</div>
                  <div className="flex-1 flex space-x-2">
                    <div className="flex-1 bg-destructive/20 rounded-full h-2 relative">
                      <div 
                        className="bg-destructive rounded-full h-2" 
                        style={{ width: `${(month.high / 30) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-warning/20 rounded-full h-2 relative">
                      <div 
                        className="bg-warning rounded-full h-2" 
                        style={{ width: `${(month.medium / 40) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-success/20 rounded-full h-2 relative">
                      <div 
                        className="bg-success rounded-full h-2" 
                        style={{ width: `${(month.low / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {month.high + month.medium + month.low}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full" />
                <span>High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span>Low Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incident Response Metrics</CardTitle>
            <CardDescription>
              Performance metrics for incident handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{incidentMetrics.total}</div>
                <div className="text-sm text-muted-foreground">Total Incidents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{incidentMetrics.resolved}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Resolution Rate</span>
                <span>{Math.round((incidentMetrics.resolved / incidentMetrics.total) * 100)}%</span>
              </div>
              <Progress value={(incidentMetrics.resolved / incidentMetrics.total) * 100} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">{incidentMetrics.avgResolutionTime}</div>
                <div className="text-sm text-muted-foreground">Avg Resolution Time</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-destructive">{incidentMetrics.criticalIncidents}</div>
                <div className="text-sm text-muted-foreground">Critical Incidents</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Framework Progress</CardTitle>
          <CardDescription>
            Current compliance status across all frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complianceMetrics.map((metric) => (
              <div key={metric.framework} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{metric.framework}</span>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.current}% / {metric.target}%
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={metric.current} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {metric.current}%</span>
                    <span>Target: {metric.target}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}