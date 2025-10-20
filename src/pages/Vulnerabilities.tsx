import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertTriangle, Download, Upload, Filter } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import findings from "@/data/vuln_findings.json";

const Vulnerabilities = () => {
  const { projectId } = useParams();
  const [view, setView] = useState<"table" | "kanban">("table");

  const getSeverityBadge = (severity: string) => {
    const config: Record<string, string> = {
      critical: "bg-critical text-white",
      high: "bg-high text-white",
      medium: "bg-medium text-white",
      low: "bg-low text-white",
    };
    return <Badge className={config[severity]}>{severity.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline" }> = {
      "to-triage": { variant: "secondary" },
      "confirmed": { variant: "outline" },
      "exploitable": { variant: "default" },
      "remediated": { variant: "outline" },
    };
    return <Badge variant={variants[status]?.variant || "secondary"}>{status}</Badge>;
  };

  const groupedFindings = {
    "to-triage": findings.filter(f => f.status === "to-triage"),
    "confirmed": findings.filter(f => f.status === "confirmed"),
    "exploitable": findings.filter(f => f.status === "exploitable"),
    "remediated": findings.filter(f => f.status === "remediated"),
  };

  return (
    <AppLayout projectId={projectId}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vulnerability Assessment</h1>
            <p className="text-muted-foreground mt-1">
              Findings and vulnerability triage (mock data)
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Scan (Mock)
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-critical">
                {findings.filter(f => f.severity === "critical").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">High</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-high">
                {findings.filter(f => f.severity === "high").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Medium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medium">
                {findings.filter(f => f.severity === "medium").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Low</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-low">
                {findings.filter(f => f.severity === "low").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="table" onValueChange={(v) => setView(v as any)}>
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="kanban">Triage Board</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  All Findings ({findings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Severity</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>CVE</TableHead>
                      <TableHead>CVSS</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {findings.map((finding) => (
                      <TableRow key={finding.id} className="cursor-pointer hover:bg-accent">
                        <TableCell>{getSeverityBadge(finding.severity)}</TableCell>
                        <TableCell className="font-medium">{finding.title}</TableCell>
                        <TableCell className="mono text-sm">{finding.asset}</TableCell>
                        <TableCell className="mono text-sm">{finding.cve || "-"}</TableCell>
                        <TableCell>{finding.cvss}</TableCell>
                        <TableCell>{getStatusBadge(finding.status)}</TableCell>
                        <TableCell>
                          {finding.assignedTo ? (
                            <Badge variant="secondary">{finding.assignedTo}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Unassigned</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kanban" className="mt-6">
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(groupedFindings).map(([status, items]) => (
                <Card key={status}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium capitalize flex items-center justify-between">
                      <span>{status.replace("-", " ")}</span>
                      <Badge variant="secondary">{items.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((finding) => (
                        <Card key={finding.id} className="cursor-move hover:shadow-lg transition-shadow">
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-start justify-between">
                              {getSeverityBadge(finding.severity)}
                              <span className="text-xs text-muted-foreground">{finding.cvss}</span>
                            </div>
                            <p className="text-sm font-medium line-clamp-2">{finding.title}</p>
                            <p className="mono text-xs text-muted-foreground">{finding.asset}</p>
                            {finding.assignedTo && (
                              <Badge variant="outline" className="text-xs">{finding.assignedTo}</Badge>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Vulnerabilities;
