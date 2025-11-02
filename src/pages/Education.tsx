import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export default function Education() {
  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: 1,
      degree: "MD in Cardiology",
      institution: "Harvard Medical School",
      year: "2005",
      description: "Specialized in cardiovascular medicine with honors",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [formData, setFormData] = useState({ degree: "", institution: "", year: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setEducation(education.map(edu => edu.id === editingItem.id ? { ...edu, ...formData } : edu));
      toast.success("Education updated successfully!");
    } else {
      setEducation([...education, { id: Date.now(), ...formData }]);
      toast.success("Education added successfully!");
    }
    setIsDialogOpen(false);
    setFormData({ degree: "", institution: "", year: "", description: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: EducationItem) => {
    setEditingItem(item);
    setFormData({ degree: item.degree, institution: item.institution, year: item.year, description: item.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
    toast.success("Education deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ degree: "", institution: "", year: "", description: "" }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Education</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree Name</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2005"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? "Update" : "Add"} Education
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {education.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">{item.degree}</CardTitle>
                <p className="text-sm font-medium text-secondary">{item.institution}</p>
                <p className="text-sm text-muted-foreground">{item.year}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
