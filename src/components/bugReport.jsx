import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/inpute";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Bug, Send, CheckCircle, ExternalLink, Clock, AlertCircle, Eye, Link, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";



export function BugReport() {
  const [isSubmittingBug, setIsSubmittingBug] = useState(false);
  const [lastBugSubmissionData, setLastBugSubmissionData] = useState(null);

  const bugForm = useForm({
    defaultValues: {
      title: "",
      summary: "",
      product: "",
      stream: "",
      severity: "",
      stepsToReproduce: "",
      expectedBehavior: "",
      actualBehavior: "",
      occurrence: "",
      clientType: "",
      device: "",
      osVersion: "",
      appBuild: "",
      network: "",
      userId: "",
      userEmail: "",
      accountType: "",
      transactionType: "",
      transactionRef: "",
      amount: "",
      timestamp: "",
      blockchainNetwork: "",
      tokenAsset: "",
      txHash: "",
      walletAddress: "",
      fiatProvider: "",
      maskedCard: "",
      authCode: "",
      functionalArea: "",
      suspectedCause: "",
      workaroundAvailable: "",
      usersAffected: "",
      environment: "",
      additionalNotes: "",
      attachmentUrl: "",
    },
    mode: "onChange",
  });

  // Register required fields for validation
  bugForm.register("product", { required: "Product is required" });
  bugForm.register("stream", { required: "Stream is required" });
  bugForm.register("severity", { required: "Severity is required" });
  bugForm.register("occurrence", { required: "Occurrence is required" });
  bugForm.register("clientType", { required: "Client type is required" });
  bugForm.register("network", { required: "Network is required" });

  const productOptions = [
    { value: "smc-dao", label: "SMC DAO" },
    { value: "peniwallet", label: "PeniWallet" },
    { value: "peniremit", label: "PeniRemit" },
    { value: "other", label: "Other" }
  ];

  const streamOptions = [
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "blockchain-backend", label: "Blockchain-Backend" },
    { value: "web-mobile-backend", label: "Web-Mobile-Backend" },
    { value: "fiat-card-bills", label: "Fiat-Card-Bills" },
    { value: "auth-kyc", label: "Auth-KYC" },
    { value: "platform", label: "Platform" }
  ];

  const severityOptions = [
    { value: "critical-failure", label: "Critical Failure (system down / corruption / security)", color: "text-red-600" },
    { value: "blocking-experience", label: "Blocking Smooth Customer Experience (core flow blocked)", color: "text-orange-600" },
    { value: "causing-churn", label: "Causing Churn (major friction, likely drop-offs)", color: "text-red-500" },
    { value: "annoying-workable", label: "Annoying but Workable", color: "text-yellow-600" },
    { value: "cosmetic-minor", label: "Cosmetic / Minor", color: "text-gray-600" }
  ];

  const functionalAreaOptions = [
    "Onboarding", "KYC", "Payments", "Transfers", "Cards & Bills", 
    "Notifications", "Settings", "Analytics", "Other"
  ];

  const onSubmitBugReport = async (data) => {
    setIsSubmittingBug(true);
    
    // Generate mock system data
    const linearIssueId = `BUG-${Math.floor(Math.random() * 9000) + 1000}`;
    const slackThreadTs = `${Date.now()}.${Math.floor(Math.random() * 1000000)}`;
    const submissionTime = new Date().toISOString();
    
    const submissionData = {
      ...data,
      reporter: "keith@smc.dev",
      dateSubmitted: submissionTime,
      linearIssueId,
      slackThreadTs,
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    console.log("Bug Report Submitted:", submissionData);
    setLastBugSubmissionData(submissionData);
    
    toast.success("Bug report submitted successfully!", {
      description: `Linear issue ${linearIssueId} created and posted to #bugs`,
      duration: 6000,
    });
    
    bugForm.reset();
    setIsSubmittingBug(false);
  };

  const mockBugReports = [
    {
      id: 1,
      linearId: "BUG-2341",
      title: "Payment processing fails with card error",
      reporter: "Alice Johnson",
      severity: "Critical Failure",
      status: "in-progress",
      product: "PeniWallet",
      timeAgo: "10 minutes ago"
    },
    {
      id: 2,
      linearId: "BUG-2338",
      title: "Mobile app crashes on transaction history",
      reporter: "Bob Smith",
      severity: "Blocking Experience",
      status: "triaged",
      product: "PeniWallet",
      timeAgo: "45 minutes ago"
    },
    {
      id: 3,
      linearId: "BUG-2335",
      title: "KYC document upload timeout",
      reporter: "Carol Davis",
      severity: "Causing Churn",
      status: "new",
      product: "SMC DAO",
      timeAgo: "2 hours ago"
    },
    {
      id: 4,
      linearId: "BUG-2332",
      title: "Dashboard charts not loading on Safari",
      reporter: "David Wilson",
      severity: "Annoying but Workable",
      status: "in-progress",
      product: "PeniRemit",
      timeAgo: "4 hours ago"
    },
    {
      id: 5,
      linearId: "BUG-2329",
      title: "Transaction fees calculation incorrect",
      reporter: "Eva Brown",
      severity: "Critical Failure",
      status: "completed",
      product: "PeniWallet",
      timeAgo: "6 hours ago"
    },
    {
      id: 6,
      linearId: "BUG-2326",
      title: "Email notifications not sending",
      reporter: "Frank Miller",
      severity: "Blocking Experience",
      status: "triaged",
      product: "SMC DAO",
      timeAgo: "8 hours ago"
    },
    {
      id: 7,
      linearId: "BUG-2323",
      title: "API rate limiting too aggressive",
      reporter: "Grace Lee",
      severity: "Causing Churn",
      status: "new",
      product: "PeniRemit",
      timeAgo: "12 hours ago"
    },
    {
      id: 8,
      linearId: "BUG-2320",
      title: "Dark mode toggle not persisting",
      reporter: "Henry Taylor",
      severity: "Cosmetic / Minor",
      status: "in-progress",
      product: "PeniWallet",
      timeAgo: "1 day ago"
    },
    {
      id: 9,
      linearId: "BUG-2317",
      title: "Search functionality returns wrong results",
      reporter: "Ivy Chen",
      severity: "Annoying but Workable",
      status: "triaged",
      product: "SMC DAO",
      timeAgo: "2 days ago"
    },
    {
      id: 10,
      linearId: "BUG-2314",
      title: "Blockchain transaction stuck in pending",
      reporter: "Jack Anderson",
      severity: "Critical Failure",
      status: "completed",
      product: "PeniWallet",
      timeAgo: "3 days ago"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">In Progress</Badge>;
      case 'triaged':
        return <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">Triaged</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity) => {
    const severityConfig = severityOptions.find(s => s.label.includes(severity.replace(' / ', ' / ')));
    if (severityConfig) {
      return <span className={`text-xs ${severityConfig.color}`}>{severity}</span>;
    }
    return <span className="text-xs text-gray-600">{severity}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Bug Reports</h1>
        <p className="text-muted-foreground">
          View and submit bug reports with automatic Linear and Slack integration
        </p>
      </div>

      {/* Bug Reports Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-500" />
            <h2>Recent Bug Reports</h2>
            <Badge variant="secondary">24 active</Badge>
          </div>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" />
            View #bugs Channel
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Linear ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBugReports.map((bug) => (
                <TableRow key={bug.id}>
                  <TableCell className="font-mono text-sm">{bug.linearId}</TableCell>
                  <TableCell className="font-medium max-w-[300px] truncate">{bug.title}</TableCell>
                  <TableCell>{bug.reporter}</TableCell>
                  <TableCell>{bug.product}</TableCell>
                  <TableCell>{getSeverityBadge(bug.severity)}</TableCell>
                  <TableCell>{getStatusBadge(bug.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{bug.timeAgo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Link className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Bug Submission Success Display */}
      {lastBugSubmissionData && (
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3>Bug Report Successfully Submitted</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Linear Issue:</strong> {lastBugSubmissionData.linearIssueId}</p>
              <p><strong>Reporter:</strong> {lastBugSubmissionData.reporter}</p>
            </div>
            <div>
              <p><strong>Slack Thread:</strong> #{lastBugSubmissionData.slackThreadTs.split('.')[0]}</p>
              <p><strong>Submitted:</strong> {new Date(lastBugSubmissionData.dateSubmitted).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              View in Linear
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Bug className="h-3 w-3" />
              View #bugs Thread
            </Button>
          </div>
        </Card>
      )}

      {/* Bug Report Form */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bug className="h-5 w-5 text-red-500" />
          <h2>Submit New Bug Report</h2>
          <Badge variant="secondary">PL-160 Compliant</Badge>
        </div>
        
        <form onSubmit={bugForm.handleSubmit(onSubmitBugReport)} className="space-y-8">
          {/* Core Fields */}
          <div className="space-y-4">
            <h3 className="font-medium text-muted-foreground">Core Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title * <span className="text-xs text-muted-foreground">(≤ 80 characters)</span></label>
                <Input 
                  placeholder="Short, clear bug title"
                  {...bugForm.register("title", { 
                    required: "Bug title is required",
                    maxLength: { value: 80, message: "Title must be 80 characters or less" },
                    minLength: { value: 5, message: "Title must be at least 5 characters" }
                  })}
                  className={bugForm.formState.errors.title ? "border-red-500" : ""}
                  maxLength={80}
                />
                {bugForm.formState.errors.title && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Summary * <span className="text-xs text-muted-foreground">(≤ 280 characters)</span></label>
                <Textarea
                  placeholder="One-liner description"
                  rows={2}
                  {...bugForm.register("summary", { 
                    required: "Summary is required",
                    maxLength: { value: 280, message: "Summary must be 280 characters or less" },
                    minLength: { value: 10, message: "Summary must be at least 10 characters" }
                  })}
                  className={bugForm.formState.errors.summary ? "border-red-500" : ""}
                  maxLength={280}
                />
                {bugForm.formState.errors.summary && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.summary.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product / App *</label>
                <Select onValueChange={(value) => bugForm.setValue("product", value, { shouldValidate: true })}>
                  <SelectTrigger className={bugForm.formState.errors.product ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {bugForm.formState.errors.product && (
                  <p className="text-sm text-red-500 mt-1">Product is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stream (Team) *</label>
                <Select onValueChange={(value) => bugForm.setValue("stream", value, { shouldValidate: true })}>
                  <SelectTrigger className={bugForm.formState.errors.stream ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streamOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {bugForm.formState.errors.stream && (
                  <p className="text-sm text-red-500 mt-1">Stream is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Severity *</label>
                <Select onValueChange={(value) => bugForm.setValue("severity", value, { shouldValidate: true })}>
                  <SelectTrigger className={bugForm.formState.errors.severity ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className={option.color}>{option.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {bugForm.formState.errors.severity && (
                  <p className="text-sm text-red-500 mt-1">Severity is required</p>
                )}
              </div>
            </div>
          </div>

          {/* Bug Details */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-muted-foreground">Bug Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Steps to Reproduce *</label>
              <Textarea 
                placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
                rows={4}
                {...bugForm.register("stepsToReproduce", { 
                  required: "Steps to reproduce are required",
                  minLength: { value: 20, message: "Steps must be at least 20 characters" }
                })}
                className={bugForm.formState.errors.stepsToReproduce ? "border-red-500" : ""}
              />
              {bugForm.formState.errors.stepsToReproduce && (
                <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.stepsToReproduce.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expected Behavior *</label>
                <Textarea 
                  placeholder="What should happen"
                  rows={3}
                  {...bugForm.register("expectedBehavior", { 
                    required: "Expected behavior is required",
                    minLength: { value: 10, message: "Expected behavior must be at least 10 characters" }
                  })}
                  className={bugForm.formState.errors.expectedBehavior ? "border-red-500" : ""}
                />
                {bugForm.formState.errors.expectedBehavior && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.expectedBehavior.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Actual Behavior *</label>
                <Textarea 
                  placeholder="What actually happens"
                  rows={3}
                  {...bugForm.register("actualBehavior", { 
                    required: "Actual behavior is required",
                    minLength: { value: 10, message: "Actual behavior must be at least 10 characters" }
                  })}
                  className={bugForm.formState.errors.actualBehavior ? "border-red-500" : ""}
                />
                {bugForm.formState.errors.actualBehavior && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.actualBehavior.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Occurrence *</label>
              <Select onValueChange={(value) => bugForm.setValue("occurrence", value, { shouldValidate: true })}>
                <SelectTrigger className={bugForm.formState.errors.occurrence ? "border-red-500" : ""}>
                  <SelectValue placeholder="How often does this happen?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always</SelectItem>
                  <SelectItem value="often">Often</SelectItem>
                  <SelectItem value="sometimes">Sometimes</SelectItem>
                  <SelectItem value="once">Once</SelectItem>
                </SelectContent>
              </Select>
              {bugForm.formState.errors.occurrence && (
                <p className="text-sm text-red-500 mt-1">Occurrence is required</p>
              )}
            </div>
          </div>

          {/* Device & Platform */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-muted-foreground">Device & Platform</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client Type *</label>
                <Select onValueChange={(value) => bugForm.setValue("clientType", value, { shouldValidate: true })}>
                  <SelectTrigger className={bugForm.formState.errors.clientType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="ios">iOS</SelectItem>
                    <SelectItem value="android">Android</SelectItem>
                    <SelectItem value="backend">Backend Service</SelectItem>
                  </SelectContent>
                </Select>
                {bugForm.formState.errors.clientType && (
                  <p className="text-sm text-red-500 mt-1">Client type is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Device *</label>
                <Input 
                  placeholder="e.g., iPhone 13, Pixel 7, Desktop/Laptop"
                  {...bugForm.register("device", { 
                    required: "Device is required",
                    minLength: { value: 3, message: "Device must be at least 3 characters" }
                  })}
                  className={bugForm.formState.errors.device ? "border-red-500" : ""}
                />
                {bugForm.formState.errors.device && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.device.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">OS + Version *</label>
                <Input 
                  placeholder="e.g., iOS 17.5, Android 14, Windows 11"
                  {...bugForm.register("osVersion", { 
                    required: "OS Version is required",
                    minLength: { value: 3, message: "OS Version must be at least 3 characters" }
                  })}
                  className={bugForm.formState.errors.osVersion ? "border-red-500" : ""}
                />
                {bugForm.formState.errors.osVersion && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.osVersion.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">App/Build or Browser *</label>
                <Input 
                  placeholder="App Version + Build Number or Browser + Version"
                  {...bugForm.register("appBuild", { 
                    required: "App/Build or Browser is required",
                    minLength: { value: 3, message: "Must be at least 3 characters" }
                  })}
                  className={bugForm.formState.errors.appBuild ? "border-red-500" : ""}
                />
                {bugForm.formState.errors.appBuild && (
                  <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.appBuild.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Network *</label>
                <Select onValueChange={(value) => bugForm.setValue("network", value, { shouldValidate: true })}>
                  <SelectTrigger className={bugForm.formState.errors.network ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wifi">Wi-Fi</SelectItem>
                    <SelectItem value="cellular">Cellular</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
                {bugForm.formState.errors.network && (
                  <p className="text-sm text-red-500 mt-1">Network is required</p>
                )}
              </div>
            </div>
          </div>

          {/* Context Sections */}
          <div className="space-y-6 pt-4 border-t">
            <h3 className="font-medium text-muted-foreground">Context (at least one section required)</h3>
            
            {/* User Context */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium">A) User Context</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">User ID (internal)</label>
                  <Input 
                    placeholder="Internal user identifier"
                    {...bugForm.register("userId")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email or Phone</label>
                  <Input 
                    placeholder="user@example.com or +1234567890"
                    {...bugForm.register("userEmail")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Account Type / Tier</label>
                  <Input 
                    placeholder="e.g., Premium, Basic, Pro"
                    {...bugForm.register("accountType")}
                  />
                </div>
              </div>
            </div>

            {/* Transaction Context */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium">B) Transaction Context</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Transaction Type</label>
                  <Select onValueChange={(value) => bugForm.setValue("transactionType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiat">Fiat</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="kyc">KYC</SelectItem>
                      <SelectItem value="card-bills">Card & Bills</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reference / ID</label>
                  <Input 
                    placeholder="Transaction or session ID"
                    {...bugForm.register("transactionRef")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount & Currency</label>
                  <Input 
                    placeholder="e.g., 100 USD, 0.5 ETH"
                    {...bugForm.register("amount")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timestamp of Failure</label>
                  <Input 
                    type="datetime-local"
                    {...bugForm.register("timestamp")}
                  />
                </div>
              </div>

              {/* Blockchain specific fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-blue-50 rounded">
                <h5 className="font-medium text-sm col-span-2">If Blockchain:</h5>
                <div>
                  <label className="block text-sm font-medium mb-1">Network / Chain</label>
                  <Input 
                    placeholder="e.g., Ethereum, BSC, Polygon"
                    {...bugForm.register("blockchainNetwork")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Token / Asset</label>
                  <Input 
                    placeholder="e.g., USDT, ETH, BNB"
                    {...bugForm.register("tokenAsset")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tx Hash</label>
                  <Input 
                    placeholder="0x..."
                    {...bugForm.register("txHash")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Wallet Address (masked)</label>
                  <Input 
                    placeholder="0x1234...5678"
                    {...bugForm.register("walletAddress")}
                  />
                </div>
              </div>

              {/* Fiat specific fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-green-50 rounded">
                <h5 className="font-medium text-sm col-span-3">If Fiat / Card / Bills:</h5>
                <div>
                  <label className="block text-sm font-medium mb-1">Provider / Rail</label>
                  <Input 
                    placeholder="e.g., Paystack, Bank Transfer, Card"
                    {...bugForm.register("fiatProvider")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Masked Card/Account</label>
                  <Input 
                    placeholder="e.g., **** 1234"
                    {...bugForm.register("maskedCard")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Auth Code / PSP Ref</label>
                  <Input 
                    placeholder="Authorization code"
                    {...bugForm.register("authCode")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Routing & Categorization */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-muted-foreground">Routing & Categorization</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Functional Area / Module</label>
                <Select onValueChange={(value) => bugForm.setValue("functionalArea", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {functionalAreaOptions.map((area) => (
                      <SelectItem key={area} value={area.toLowerCase().replace(/\s+/g, '-')}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1"># Users Affected</label>
                <Select onValueChange={(value) => bugForm.setValue("usersAffected", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="few">Few (2-10)</SelectItem>
                    <SelectItem value="many">Many (10+)</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Suspected Root Cause</label>
              <Textarea 
                placeholder="Optional guess at what might be causing this issue"
                rows={2}
                {...bugForm.register("suspectedCause")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Workaround Available?</label>
              <Textarea 
                placeholder="Yes/No - brief note if yes"
                rows={2}
                {...bugForm.register("workaroundAvailable")}
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-muted-foreground">Additional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Environment</label>
                <Select onValueChange={(value) => bugForm.setValue("environment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attachment URL</label>
                <Input 
                  placeholder="Link to screenshots, logs, or recordings"
                  type="url"
                  {...bugForm.register("attachmentUrl")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <Textarea 
                placeholder="Any other context, logs, or relevant information"
                rows={3}
                {...bugForm.register("additionalNotes")}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmittingBug}
          >
            {isSubmittingBug ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Linear Issue & Slack Thread...
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Bug Report
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}