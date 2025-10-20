import { useState } from "react";
import { useParams } from "react-router-dom";
import { Users, Mail, Linkedin, Github, Twitter, Tag, Download, AlertCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import people from "@/data/recon_people.json";

const Reconnaissance = () => {
  const { projectId } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const getConfidenceBadge = (confidence: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline", className: string }> = {
      high: { variant: "default", className: "bg-success/20 text-success hover:bg-success/30" },
      medium: { variant: "secondary", className: "bg-warning/20 text-warning hover:bg-warning/30" },
      low: { variant: "outline", className: "text-muted-foreground" },
    };
    const config = variants[confidence] || variants.low;
    return <Badge variant={config.variant} className={config.className}>{confidence}</Badge>;
  };

  return (
    <AppLayout projectId={projectId}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reconnaissance</h1>
            <p className="text-muted-foreground mt-1">
              Discovered people and social profiles (mock data)
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Tag className="h-4 w-4 mr-2" />
              Bulk Tag
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export (Mock)
            </Button>
          </div>
        </div>

        <Alert className="border-info/50 bg-info/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Mock Data:</strong> All collectors are non-functional. Data shown is synthetic and for demonstration only.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-7">
          {/* People Table */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Discovered People ({people.length})
                </CardTitle>
                <CardDescription>Click any row to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {people.map((person) => (
                      <TableRow
                        key={person.id}
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSelectedPerson(person)}
                      >
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell className="text-muted-foreground">{person.title}</TableCell>
                        <TableCell className="mono text-sm">{person.email}</TableCell>
                        <TableCell>{person.source}</TableCell>
                        <TableCell>{getConfidenceBadge(person.confidence)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {person.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Detail Sidebar */}
          <div className="lg:col-span-2">
            {selectedPerson ? (
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>{selectedPerson.name}</CardTitle>
                  <CardDescription>{selectedPerson.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="mono text-sm">{selectedPerson.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Discovery</p>
                    <p className="text-sm">{selectedPerson.source}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(selectedPerson.discovered).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Social Profiles</p>
                    <div className="space-y-2">
                      {selectedPerson.socialProfiles.map((profile: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                          <div className="flex items-center space-x-2">
                            {profile.platform === "LinkedIn" && <Linkedin className="h-4 w-4" />}
                            {profile.platform === "GitHub" && <Github className="h-4 w-4" />}
                            {profile.platform === "Twitter" && <Twitter className="h-4 w-4" />}
                            <span>{profile.platform}</span>
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {profile.followers || profile.repos} {profile.followers ? "followers" : "repos"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPerson.leakedData.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Leaked Data (Mock)</p>
                      <div className="space-y-2">
                        {selectedPerson.leakedData.map((leak: any, i: number) => (
                          <div key={i} className="p-2 bg-critical/10 border border-critical/30 rounded">
                            <p className="text-sm font-medium text-critical">{leak.source}</p>
                            <p className="text-xs text-muted-foreground">{leak.type} • {leak.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerson.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      <Tag className="h-4 w-4 mr-2" />
                      Add Tag
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  Select a person to view details
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reconnaissance;
