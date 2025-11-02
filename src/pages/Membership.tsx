import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface MembershipItem {
  id: number;
  name: string;
  year: string;
  institution: string;
  description: string;
}

export default function Membership() {
  const [memberships, setMemberships] = useState<MembershipItem[]>([
    {
      id: 1,
      name: "American College of Cardiology",
      year: "2010 - Present",
      institution: "ACC",
      description: "Active member participating in annual conferences",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MembershipItem | null>(null);
  const [formData, setFormData] = useState({ name: "", year: "", institution: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setMemberships(memberships.map(mem => mem.id === editingItem.id ? { ...mem, ...formData } : mem));
      toast.success("Membership updated successfully!");
    } else {
      setMemberships([...memberships, { id: Date.now(), ...formData }]);
      toast.success("Membership added successfully!");
    }
    setIsDialogOpen(false);
    setFormData({ name: "", year: "", institution: "", description: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: MembershipItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, year: item.year, institution: item.institution, description: item.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMemberships(memberships.filter(mem => mem.id !== id));
    toast.success("Membership deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Memberships</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ name: "", year: "", institution: "", description: "" }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Membership
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Membership</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Membership Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2010 - Present"
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
                {editingItem ? "Update" : "Add"} Membership
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {memberships.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
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
