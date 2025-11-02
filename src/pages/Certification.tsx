import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface CertificationItem {
  id: number;
  name: string;
  provider: string;
  year: string;
}

export default function Certification() {
  const [certifications, setCertifications] = useState<CertificationItem[]>([
    { id: 1, name: "Board Certified Cardiologist", provider: "American Board of Internal Medicine", year: "2010" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CertificationItem | null>(null);
  const [formData, setFormData] = useState({ name: "", provider: "", year: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setCertifications(certifications.map(cert => cert.id === editingItem.id ? { ...cert, ...formData } : cert));
      toast.success("Certification updated successfully!");
    } else {
      setCertifications([...certifications, { id: Date.now(), ...formData }]);
      toast.success("Certification added successfully!");
    }
    setIsDialogOpen(false);
    setFormData({ name: "", provider: "", year: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: CertificationItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, provider: item.provider, year: item.year });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
    toast.success("Certification deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Certifications</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ name: "", provider: "", year: "" }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Certification</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Certificate Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2010"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? "Update" : "Add"} Certification
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {certifications.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm font-medium text-secondary">{item.provider}</p>
                <p className="text-sm text-muted-foreground">{item.year}</p>
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
