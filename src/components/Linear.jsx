import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/inpute";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, X, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

// ---------------- Mock Data ----------------
const mockProjects = [
  { id: "p1", name: "Project Alpha" },
  { id: "p2", name: "Project Beta" },
];

const mockLabels = [
  { id: "l1", name: "Frontend" },
  { id: "l2", name: "Backend" },
  { id: "l3", name: "Bug" },
];

const mockEvents = [
  { id: "e1", name: "Issue Created" },
  { id: "e2", name: "Issue Closed" },
  { id: "e3", name: "Issue Labeled" },
];

const mockSlackChannels = [
  { id: "c1", name: "#general" },
  { id: "c2", name: "#dev-team" },
  { id: "c3", name: "#alerts" },
];

const mockMappings = [
  {
    id: "m1",
    project: "Project Alpha",
    labels: ["Frontend", "Bug"],
    events: ["Issue Created", "Issue Closed"],
    channels: ["#general"],
  },
  {
    id: "m2",
    project: "Project Beta",
    labels: ["Backend"],
    events: ["Issue Labeled"],
    channels: ["#dev-team", "#alerts"],
  },
];

// ---------------- Pills Component ----------------
function PillsSelector({ options, selected, setSelected }) {
  const toggleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((o) => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Badge
          key={opt.id}
          onClick={() => toggleSelect(opt.name)}
          className={`cursor-pointer px-3 py-1 rounded-full ${
            selected.includes(opt.name) ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          {opt.name}
        </Badge>
      ))}
    </div>
  );
}

// ---------------- Drawer Component ----------------
function Drawer({ open, onClose, onSave, editData }) {
  const [project, setProject] = useState(editData?.project || "");
  const [labels, setLabels] = useState(editData?.labels || []);
  const [events, setEvents] = useState(editData?.events || []);
  const [channels, setChannels] = useState(editData?.channels || []);

  const handleSave = () => {
    onSave({
      id: editData?.id || Date.now().toString(),
      project,
      labels,
      events,
      channels,
    });
    toast.success("Mapping successful!", {
        description: "Your request has been posted to #feature-requests and a Linear issue has been created.",
        duration: 5000,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sliding Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">{editData ? "Edit Mapping" : "New Mapping"}</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Project */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Project</label>
            <Select onValueChange={(val) => setProject(val)} value={project}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Labels */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Labels</label>
            <PillsSelector options={mockLabels} selected={labels} setSelected={setLabels} />
          </div>

          {/* Events */}
          <div className="mb-4">
            <label className="text-sm font-medium block mb-2">Events</label>
            <PillsSelector options={mockEvents} selected={events} setSelected={setEvents} />
          </div>

          {/* Slack Channels */}
          <div className="mb-6">
            <label className="text-sm font-medium block mb-2">Slack Channels</label>
            <PillsSelector options={mockSlackChannels} selected={channels} setSelected={setChannels} />
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Mapping
          </Button>
        </div>
      </div>
    </>
  );
}

// ---------------- Main Component ----------------
export function LinearWorkFlow() {
  const [mappings, setMappings] = useState(mockMappings);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMapping, setEditMapping] = useState(null);

  const handleSave = (mapping) => {
    setMappings((prev) => {
      const exists = prev.find((m) => m.id === mapping.id);
      if (exists) {
        return prev.map((m) => (m.id === mapping.id ? mapping : m));
      }
      return [...prev, mapping];
    });
  };

  const handleDelete = (id) => {
    setMappings((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Linear → Slack Mappings</h1>
        <Button onClick={() => { setEditMapping(null); setDrawerOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> New Mapping
        </Button>
      </div>

      <div className="grid gap-4">
        {mappings.map((mapping) => (
          <Card key={mapping.id} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{mapping.project}</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditMapping(mapping); setDrawerOpen(true); }}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(mapping.id)}>
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {mapping.labels.map((l) => (
                <Badge key={l}>{l}</Badge>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {mapping.events.map((e) => (
                <Badge key={e} className="bg-blue-100 text-blue-800">
                  {e}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {mapping.channels.map((c) => (
                <Badge key={c} className="bg-green-100 text-green-800">
                  {c}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
        editData={editMapping}
      />
    </div>
  )}