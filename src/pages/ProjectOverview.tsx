import { useParams } from "react-router-dom";
import { Users, Server, AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import projects from "@/data/projects.json";
import activity from "@/data/activity.json";

const ProjectOverview = () => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <AppLayout><div>Project not found</div></AppLayout>;
  }

  const projectActivity = activity.slice(0, 10);

  return (
    <AppLayout projectId={projectId}>
      <div className="space-y-6">
        {/* Project Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <Badge variant={project.status === "active" ? "default" : "secondary"}>
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2 mono">{project.target}</p>
          </div>
        </div>

        {/* Mock Disclaimer */}
        <Alert className="border-warning/50 bg-warning/10">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> This is a mock dataset. No live scanning or data collection occurs in this demo.
            All data shown is synthetic and for demonstration purposes only.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People Discovered</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.stats.people}</div>
              <p className="text-xs text-muted-foreground">
                From various sources
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assets Found</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.stats.assets}</div>
              <p className="text-xs text-muted-foreground">
                Subdomains, IPs, services
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Findings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.stats.findings}</div>
              <p className="text-xs text-muted-foreground">
                Total vulnerabilities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-critical" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-critical">{project.stats.critical}</div>
              <p className="text-xs text-muted-foreground">
                High priority items
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* Project Info */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{new Date(project.created).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Activity</p>
                    <p className="font-medium">{new Date(project.lastActivity).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NDA Status</p>
                    <p className="font-medium">{project.ndaFlag ? "Active" : "Not Required"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                    <p className="font-medium">{project.team.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Scope</p>
                  <div className="space-y-1">
                    {project.scope.map((scope, i) => (
                      <div key={i} className="mono text-sm bg-muted px-3 py-2 rounded">
                        {scope}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Team</p>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((member, i) => (
                      <Badge key={i} variant="secondary">{member}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectActivity.map((item) => (
                    <div key={item.id} className="flex space-x-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-primary" />
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

export default ProjectOverview;
