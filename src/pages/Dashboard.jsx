import React from 'react'
import { Card } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tab";
import  {IssueIntake}  from '../components/issueIntake';
import { WorkflowOverview } from '../components/workflowoverview';

import { 
  ArrowRight, 
  FileText, 
  MessageSquare, 
  GitBranch, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Circle,
  Users,
  Bot,
  Zap
} from "lucide-react";
export default function Dashboard() {
  return (
    <div className='p-6 max-w-7xl mx-auto space-y-6'>
        {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">SMC Workflow Dashboard</h1>
        <p className="text-muted-foreground">Linear • Slack • GitHub Workflow Dashboard</p>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Slack Threads</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Circle className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Linear Issues</p>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Open PRs</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Bot Actions Today</p>
              <p className="text-2xl font-semibold">42</p>
            </div>
          </div>
        </Card>
      </div>

     <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="intake">Intake</TabsTrigger>
          <TabsTrigger value="triage">Triage</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="escalation">Escalation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <WorkflowOverview />
        </TabsContent>
         <TabsContent value="intake" className="mt-6">
          <IssueIntake />
        </TabsContent>

        {/*

        <TabsContent value="triage" className="mt-6">
          <TriageSection />
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <PlanningSection />
        </TabsContent>

        <TabsContent value="implementation" className="mt-6">
          <ImplementationSection />
        </TabsContent>

        <TabsContent value="escalation" className="mt-6">
          <EscalationFlow />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
