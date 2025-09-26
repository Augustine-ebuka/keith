

import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/inpute";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, X, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import useApiStore from "../stores/apiStore";
import { Drawer } from "../components/ui/drawer"

const mockMappings = [
  {
    id: "m1",
    project: "Project Alpha",
    name: "Project Alpha",
    labels: ["Frontend", "Bug"],
    events: ["Issue Created", "Issue Closed"],
    channels: ["#general"],
  },
  {
    id: "m2",
    project: "Project Beta",
    name: "Project Beta",
    labels: ["Backend"],
    events: ["Issue Labeled"],
    channels: ["#dev-team", "#alerts"],
  },
];

export function LinearWorkFlow() {
  const [mappings, setMappings] = useState(mockMappings);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMapping, setEditMapping] = useState(null);
  const { data, loading, error, fetchData, postData, putData, deleteData } = useApiStore();

  // Fetch mappings when component mounts
  useEffect(() => {
    fetchData("/mappings/projects");
  }, []);
  
  // Update mappings when API data changes
  useEffect(() => {
    if(data) {
      setMappings(data);
    }
  }, [data]);

  // Fetch available projects when drawer opens
  useEffect(() => {
    if (drawerOpen) {
      
      fetchAvailableProjects();
    }
  }, [drawerOpen]);

  // Mock function to fetch available projects
  const fetchAvailableProjects = () => {
    // Replace this with actual API call in production
    const mockProjects = [
      { id: "p1", name: "Project Alpha" },
      { id: "p2", name: "Project Beta" },
      { id: "p3", name: "Project Gamma" }
    ];
    setAvailableProjects(mockProjects);
  };

  const handleSave = (mapping) => {
    // You might want to add API call here to save to backend
    // Example: postData("/mappings", mapping) or putData(`/mappings/${mapping.id}`, mapping)
    
    setMappings((prev) => {
      const exists = prev.find((m) => m.id === mapping.id);
      if (exists) {
        return prev.map((m) => (m.id === mapping.id ? mapping : m));
      }
      
      // For new mappings, you might want to use the ID returned from the API
      // but for now we'll just use the one from the form
      return [...prev, mapping];
    });
    
    // Close drawer after save
    setDrawerOpen(false);
    
    // Show success message
    toast.success(
      `Mapping ${mapping.id ? "updated" : "created"} successfully!`
    );
  };
  
  const handleDelete = (id) => {
    // You might want to add API call here to delete from backend
    // Example: deleteData(`/mappings/${id}`)
    
    setMappings((prev) => prev.filter((m) => m.id !== id));
    
    // Show success message
    toast.success("Mapping deleted successfully!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Linear → Slack Mappings</h1>
        <Button onClick={() => { setEditMapping(null); setDrawerOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> New Mapping
        </Button>
      </div>

      {loading && <p>Loading mappings...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && mappings.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          No mappings found. Create your first mapping by clicking the "New Mapping" button.
        </p>
      )}

      <div className="grid gap-4">
        {mappings.map((mapping) => (
          <Card key={mapping.id} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
              <h2 className="font-semibold">{mapping.name}</h2>
              <p className="textslant italic mt-2.5">{mapping.description}</p>

              </div>
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
              <Badge key={1}>{"label"}</Badge>
            </div> 
            <div className="flex gap-2 flex-wrap">
              <Badge key={1}>{"event"}</Badge>
            </div> 
            <div className="flex gap-2 flex-wrap">
              <Badge key={1}>{"channels"}</Badge>
            </div> 
          </Card>
        ))}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
        editData={editMapping}
        list={mappings} // Pass available projects for selection
      />
    </div>
  );
}