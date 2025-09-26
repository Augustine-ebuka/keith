import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/inpute";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { MessageSquare, Bot, ArrowRight, FileText, Send } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import React, {useState} from "react";

export function IssueIntake() {
  const [isSubmittingFeature, setIsSubmittingFeature] = useState(false);
  const [isSubmittingBug, setIsSubmittingBug] = useState(false);

  const featureForm = useForm({
    defaultValues: {
      title: "",
      priority: "",
      description: "",
      businessImpact: "",
    },
    mode: "onChange",
  });

  // Register the priority field for validation
  featureForm.register("priority", { required: "Priority is required" });

  const bugForm = useForm({
    defaultValues: {
      title: "",
      severity: "",
      steps: "",
      environment: "",
    },
    mode: "onChange",
  });

  // Register the severity field for validation
  bugForm.register("severity", { required: "Severity is required" });

  const onSubmitFeatureRequest = async (data) => {
    setIsSubmittingFeature(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Feature Request Submitted:", data);
    
    toast.success("Feature request submitted successfully!", {
      description: "Your request has been posted to #feature-requests and a Linear issue has been created.",
      duration: 5000,
    });
    
    featureForm.reset();
    setIsSubmittingFeature(false);
  };

  const onSubmitBugReport = async (data) => {
    setIsSubmittingBug(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Bug Report Submitted:", data);
    
    toast.success("Bug report submitted successfully!", {
      description: "Your report has been posted to #bug-reports and a Linear issue has been created.",
      duration: 5000,
    });
    
    bugForm.reset();
    setIsSubmittingBug(false);
  };

  const mockSlackMessages = [
    {
      id: 1,
      type: "feature",
      user: "Sarah Chen",
      time: "2 minutes ago",
      title: "Mobile app dark mode support",
      description: "Users are requesting dark mode for the mobile app to reduce eye strain during night usage.",
      thread: "12 replies",
      status: "new"
    },
    {
      id: 2,
      type: "bug",
      user: "Mike Rodriguez",
      time: "15 minutes ago", 
      title: "Payment processing timeout",
      description: "Users experiencing timeouts during payment processing for orders over $500.",
      thread: "8 replies",
      status: "triaged"
    },
    {
      id: 3,
      type: "feature",
      user: "Emily Watson",
      time: "1 hour ago",
      title: "Export data to CSV functionality",
      description: "Need ability to export user data and reports to CSV format for analysis.",
      thread: "5 replies", 
      status: "in-progress"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Request Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Feature Request Form</h2>
          </div>
          <form onSubmit={featureForm.handleSubmit(onSubmitFeatureRequest)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Feature Title *</label>
              <Input 
                placeholder="Brief description of the feature"
                {...featureForm.register("title", { 
                  required: "Feature title is required",
                  minLength: { value: 5, message: "Title must be at least 5 characters" }
                })}
                className={featureForm.formState.errors.title ? "border-red-500" : ""}
              />
              {featureForm.formState.errors.title && (
                <p className="text-sm text-red-500 mt-1">{featureForm.formState.errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority *</label>
              <Select onValueChange={(value) => featureForm.setValue("priority", value, { shouldValidate: true })}>
                <SelectTrigger className={featureForm.formState.errors.priority ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              {featureForm.formState.errors.priority && (
                <p className="text-sm text-red-500 mt-1">Priority is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <Textarea 
                placeholder="Detailed description of the feature request..."
                rows={3}
                {...featureForm.register("description", { 
                  required: "Description is required",
                  minLength: { value: 20, message: "Description must be at least 20 characters" }
                })}
                className={featureForm.formState.errors.description ? "border-red-500" : ""}
              />
              {featureForm.formState.errors.description && (
                <p className="text-sm text-red-500 mt-1">{featureForm.formState.errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Impact *</label>
              <Textarea 
                placeholder="How will this feature impact the business?"
                rows={2}
                {...featureForm.register("businessImpact", { 
                  required: "Business impact is required",
                  minLength: { value: 10, message: "Business impact must be at least 10 characters" }
                })}
                className={featureForm.formState.errors.businessImpact ? "border-red-500" : ""}
              />
              {featureForm.formState.errors.businessImpact && (
                <p className="text-sm text-red-500 mt-1">{featureForm.formState.errors.businessImpact.message}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmittingFeature}
            >
              {isSubmittingFeature ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Bug Report Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">Bug Report Form</h2>
          </div>
          <form onSubmit={bugForm.handleSubmit(onSubmitBugReport)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bug Title *</label>
              <Input 
                placeholder="Brief description of the bug"
                {...bugForm.register("title", { 
                  required: "Bug title is required",
                  minLength: { value: 5, message: "Title must be at least 5 characters" }
                })}
                className={bugForm.formState.errors.title ? "border-red-500" : ""}
              />
              {bugForm.formState.errors.title && (
                <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Severity *</label>
              <Select onValueChange={(value) => bugForm.setValue("severity", value, { shouldValidate: true })}>
                <SelectTrigger className={bugForm.formState.errors.severity ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              {bugForm.formState.errors.severity && (
                <p className="text-sm text-red-500 mt-1">Severity is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Steps to Reproduce *</label>
              <Textarea 
                placeholder="1. Go to...\n2. Click on...\n3. Expected vs actual behavior"
                rows={3}
                {...bugForm.register("steps", { 
                  required: "Steps to reproduce are required",
                  minLength: { value: 20, message: "Steps must be at least 20 characters" }
                })}
                className={bugForm.formState.errors.steps ? "border-red-500" : ""}
              />
              {bugForm.formState.errors.steps && (
                <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.steps.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Environment *</label>
              <Input 
                placeholder="Browser, OS, app version, etc."
                {...bugForm.register("environment", { 
                  required: "Environment information is required",
                  minLength: { value: 5, message: "Environment must be at least 5 characters" }
                })}
                className={bugForm.formState.errors.environment ? "border-red-500" : ""}
              />
              {bugForm.formState.errors.environment && (
                <p className="text-sm text-red-500 mt-1">{bugForm.formState.errors.environment.message}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              variant="destructive"
              disabled={isSubmittingBug}
            >
              {isSubmittingBug ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Report Bug
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>

      {/* Slack Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Request Channel */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">#feature-requests</h2>
            <Badge variant="secondary">24 active threads</Badge>
          </div>
          <div className="space-y-3">
            {mockSlackMessages.filter(msg => msg.type === 'feature').map((message) => (
              <div key={message.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <h4 className="font-medium">{message.title}</h4>
                <p className="text-sm text-muted-foreground">{message.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600">{message.thread}</span>
                  <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                    {message.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bug Report Channel */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">#bug-reports</h2>
            <Badge variant="secondary">12 active threads</Badge>
          </div>
          <div className="space-y-3">
            {mockSlackMessages.filter(msg => msg.type === 'bug').map((message) => (
              <div key={message.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <h4 className="font-medium">{message.title}</h4>
                <p className="text-sm text-muted-foreground">{message.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-600">{message.thread}</span>
                  <Badge variant={message.status === 'new' ? 'destructive' : 'secondary'}>
                    {message.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bot Integration */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-semibold">Slack Bot Integration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">1. Form Submission</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Webhook receives form data</p>
              <p>• Bot posts to appropriate Slack channel</p>
              <p>• Creates thread for discussion</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">2. Linear Issue Creation</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Draft issue created in "Intake" team</p>
              <p>• Links back to Slack thread</p>
              <p>• Includes all form data</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">3. Thread Updates</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Status changes posted to thread</p>
              <p>• Team assignments notified</p>
              <p>• Progress tracking visible</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Example Bot Messages:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-500" />
              <span className="font-medium">SMC Bot</span>
              <span className="text-muted-foreground">just now</span>
            </div>
            <p>📝 New feature request submitted by Sarah Chen</p>
            <p>🎯 <strong>Linear Issue:</strong> LIN-456 created in Intake team</p>
            <p>💬 Use this thread for discussion and updates</p>
          </div>
        </div>
      </Card>
    </div>
  );
}