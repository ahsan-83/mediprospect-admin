import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface AwardItem {
  id: number;
  name: string;
  year: string;
  institution: string;
  reason: string;
}

export default function Awards() {
  const [awards, setAwards] = useState<AwardItem[]>([
    {
      id: 1,
      name: "Excellence in Cardiology",
      year: "2020",
      institution: "National Medical Association",
      reason: "Outstanding contribution to cardiovascular research",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AwardItem | null>(null);
  const [formData, setFormData] = useState({ name: "", year: "", institution: "", reason: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setAwards(awards.map(award => award.id === editingItem.id ? { ...award, ...formData } : award));
      toast.success("Award updated successfully!");
    } else {
      setAwards([...awards, { id: Date.now(), ...formData }]);
      toast.success("Award added successfully!");
    }
    setIsDialogOpen(false);
    setFormData({ name: "", year: "", institution: "", reason: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: AwardItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, year: item.year, institution: item.institution, reason: item.reason });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAwards(awards.filter(award => award.id !== id));
    toast.success("Award deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Awards</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ name: "", year: "", institution: "", reason: "" }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Award</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Award Name</Label>
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
                  placeholder="e.g., 2020"
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
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? "Update" : "Add"} Award
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {awards.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm font-medium text-secondary">{item.institution}</p>
                <p className="text-sm text-muted-foreground">{item.year}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.reason}</p>
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
