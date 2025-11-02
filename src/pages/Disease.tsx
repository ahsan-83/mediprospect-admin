import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Procedure {
  name: string;
  description: string;
}

interface DiseaseItem {
  id: number;
  name: string;
  description: string;
  symptoms: string[];
  procedures: Procedure[];
}

export default function Disease() {
  const [diseases, setDiseases] = useState<DiseaseItem[]>([
    {
      id: 1,
      name: "Coronary Artery Disease",
      description: "Narrowing of coronary arteries",
      symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
      procedures: [
        { name: "Angioplasty", description: "Opening blocked arteries" },
        { name: "Stent Placement", description: "Inserting stent to keep artery open" },
      ],
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DiseaseItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    symptoms: [""],
    procedures: [{ name: "", description: "" }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      symptoms: formData.symptoms.filter(s => s.trim()),
      procedures: formData.procedures.filter(p => p.name.trim() && p.description.trim()),
    };

    if (editingItem) {
      setDiseases(diseases.map(d => d.id === editingItem.id ? { ...d, ...cleanedData } : d));
      toast.success("Disease updated successfully!");
    } else {
      setDiseases([...diseases, { id: Date.now(), ...cleanedData }]);
      toast.success("Disease added successfully!");
    }
    handleClose();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setFormData({ name: "", description: "", symptoms: [""], procedures: [{ name: "", description: "" }] });
    setEditingItem(null);
  };

  const handleEdit = (item: DiseaseItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      symptoms: item.symptoms.length > 0 ? item.symptoms : [""],
      procedures: item.procedures.length > 0 ? item.procedures : [{ name: "", description: "" }],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDiseases(diseases.filter(d => d.id !== id));
    toast.success("Disease deleted successfully!");
  };

  const addSymptom = () => {
    setFormData({ ...formData, symptoms: [...formData.symptoms, ""] });
  };

  const removeSymptom = (index: number) => {
    setFormData({ ...formData, symptoms: formData.symptoms.filter((_, i) => i !== index) });
  };

  const addProcedure = () => {
    setFormData({ ...formData, procedures: [...formData.procedures, { name: "", description: "" }] });
  };

  const removeProcedure = (index: number) => {
    setFormData({ ...formData, procedures: formData.procedures.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Diseases & Treatment Procedures</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ name: "", description: "", symptoms: [""], procedures: [{ name: "", description: "" }] }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Disease
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Disease</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Disease Name</Label>
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
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Symptoms</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addSymptom}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Symptom
                  </Button>
                </div>
                {formData.symptoms.map((symptom, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={symptom}
                      onChange={(e) => {
                        const newSymptoms = [...formData.symptoms];
                        newSymptoms[index] = e.target.value;
                        setFormData({ ...formData, symptoms: newSymptoms });
                      }}
                      placeholder="Enter symptom"
                    />
                    {formData.symptoms.length > 1 && (
                      <Button type="button" size="icon" variant="destructive" onClick={() => removeSymptom(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Treatment Procedures</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addProcedure}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Procedure
                  </Button>
                </div>
                {formData.procedures.map((procedure, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Procedure {index + 1}</Label>
                      {formData.procedures.length > 1 && (
                        <Button type="button" size="sm" variant="destructive" onClick={() => removeProcedure(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={procedure.name}
                      onChange={(e) => {
                        const newProcedures = [...formData.procedures];
                        newProcedures[index].name = e.target.value;
                        setFormData({ ...formData, procedures: newProcedures });
                      }}
                      placeholder="Procedure name"
                    />
                    <Textarea
                      value={procedure.description}
                      onChange={(e) => {
                        const newProcedures = [...formData.procedures];
                        newProcedures[index].description = e.target.value;
                        setFormData({ ...formData, procedures: newProcedures });
                      }}
                      placeholder="Procedure description"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? "Update" : "Add"} Disease
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {diseases.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-3">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div>
                  <h4 className="text-sm font-medium mb-1">Symptoms:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {item.symptoms.map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Treatment Procedures:</h4>
                  <div className="space-y-2">
                    {item.procedures.map((procedure, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-medium">{procedure.name}:</span> {procedure.description}
                      </div>
                    ))}
                  </div>
                </div>
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
