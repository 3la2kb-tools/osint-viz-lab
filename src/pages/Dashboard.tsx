import { Link } from "react-router-dom";
import { Plus, Users, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import projects from "@/data/projects.json";
import activity from "@/data/activity.json";

const Dashboard = () => {
  const activeProjects = projects.filter(p => p.status === "active");
  const totalStats = projects.reduce(
    (acc, p) => ({
      people: acc.people + p.stats.people,
      assets: acc.assets + p.stats.assets,
      findings: acc.findings + p.stats.findings,
      critical: acc.critical + p.stats.critical,
    }),
    { people: 0, assets: 0, findings: 0, critical: 0 }
  );

  // Chart data: Project Status Distribution
  const statusData = [
    { name: "Active", value: projects.filter(p => p.status === "active").length, color: "hsl(var(--success))" },
    { name: "Completed", value: projects.filter(p => p.status === "completed").length, color: "hsl(var(--muted-foreground))" },
  ];

  // Chart data: Findings by Severity
  const severityData = [
    { 
      severity: "Critical", 
      count: projects.reduce((sum, p) => sum + p.stats.critical, 0),
      fill: "hsl(var(--critical))"
    },
    { 
      severity: "High", 
      count: Math.floor(totalStats.findings * 0.25),
      fill: "hsl(var(--high))"
    },
    { 
      severity: "Medium", 
      count: Math.floor(totalStats.findings * 0.35),
      fill: "hsl(var(--medium))"
    },
    { 
      severity: "Low", 
      count: totalStats.findings - projects.reduce((sum, p) => sum + p.stats.critical, 0) - Math.floor(totalStats.findings * 0.25) - Math.floor(totalStats.findings * 0.35),
      fill: "hsl(var(--low))"
    },
  ];

  // Chart data: Activity Timeline (mock weekly data)
  const timelineData = [
    { week: "Week 1", findings: 45, assets: 28 },
    { week: "Week 2", findings: 68, assets: 42 },
    { week: "Week 3", findings: 89, assets: 56 },
    { week: "Week 4", findings: 134, assets: 87 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your red team operations and findings
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total People</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.people}</div>
              <p className="text-xs text-muted-foreground">
                Across {activeProjects.length} active projects
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.assets}</div>
              <p className="text-xs text-muted-foreground">
                Discovered and tracked
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Findings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.findings}</div>
              <p className="text-xs text-muted-foreground">
                Vulnerabilities identified
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-critical" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-critical">{totalStats.critical}</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Project Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Status</CardTitle>
              <CardDescription>Distribution of active and completed projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  active: { label: "Active", color: "hsl(var(--success))" },
                  completed: { label: "Completed", color: "hsl(var(--muted-foreground))" },
                }}
                className="h-[200px]"
              >
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Findings by Severity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Findings by Severity</CardTitle>
              <CardDescription>Breakdown of all vulnerability findings</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: { label: "Findings", color: "hsl(var(--primary))" },
                }}
                className="h-[200px]"
              >
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="severity" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Activity Timeline Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
              <CardDescription>Cumulative findings and assets discovered</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  findings: { label: "Findings", color: "hsl(var(--primary))" },
                  assets: { label: "Assets", color: "hsl(var(--success))" },
                }}
                className="h-[200px]"
              >
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="findings" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="assets" 
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success) / 0.2)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* Projects */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Projects</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}`}>
                  <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription className="mono text-sm">
                            {project.target}
                          </CardDescription>
                        </div>
                        <Badge variant={project.status === "active" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex space-x-6">
                          <div>
                            <span className="text-muted-foreground">People:</span>{" "}
                            <span className="font-medium">{project.stats.people}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Assets:</span>{" "}
                            <span className="font-medium">{project.stats.assets}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Findings:</span>{" "}
                            <span className="font-medium">{project.stats.findings}</span>
                          </div>
                          {project.stats.critical > 0 && (
                            <div>
                              <span className="text-critical font-medium">
                                {project.stats.critical} Critical
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-muted-foreground">
                          {project.team.length} members
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {activity.slice(0, 8).map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{item.user}</span>{" "}
                          <span className="text-muted-foreground">{item.description}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
