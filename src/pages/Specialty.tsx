import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface SpecialtyItem {
  id: number;
  name: string;
  description: string;
}

export default function Specialty() {
  const [specialties, setSpecialties] = useState<SpecialtyItem[]>([
    { id: 1, name: "Cardiology", description: "Diagnosis and treatment of heart conditions" },
    { id: 2, name: "Interventional Cardiology", description: "Minimally invasive cardiac procedures" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SpecialtyItem | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setSpecialties(specialties.map(s => s.id === editingItem.id ? { ...s, ...formData } : s));
      toast.success("Specialty updated successfully!");
    } else {
      setSpecialties([...specialties, { id: Date.now(), ...formData }]);
      toast.success("Specialty added successfully!");
    }
    setIsDialogOpen(false);
    setFormData({ name: "", description: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: SpecialtyItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSpecialties(specialties.filter(s => s.id !== id));
    toast.success("Specialty deleted successfully!");
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Specialties</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Specialty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Specialty</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Specialty Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                {editingItem ? "Update" : "Add"} Specialty
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {specialties.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
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
