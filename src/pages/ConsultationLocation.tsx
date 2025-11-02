import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface TimeSlot {
  day: string;
  time: string;
}

interface LocationItem {
  id: number;
  name: string;
  address: string;
  contact: string;
  schedule: TimeSlot[];
  mapUrl: string;
}

export default function ConsultationLocation() {
  const [locations, setLocations] = useState<LocationItem[]>([
    {
      id: 1,
      name: "City Medical Center",
      address: "123 Health St, Medical District",
      contact: "+1 (555) 123-4567",
      schedule: [
        { day: "Monday", time: "9:00 AM - 5:00 PM" },
        { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
      ],
      mapUrl: "https://maps.google.com/?q=City+Medical+Center",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LocationItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    schedule: [{ day: "", time: "" }],
    mapUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      schedule: formData.schedule.filter(s => s.day.trim() && s.time.trim()),
    };

    if (editingItem) {
      setLocations(locations.map(loc => loc.id === editingItem.id ? { ...loc, ...cleanedData } : loc));
      toast.success("Location updated successfully!");
    } else {
      setLocations([...locations, { id: Date.now(), ...cleanedData }]);
      toast.success("Location added successfully!");
    }
    handleClose();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setFormData({ name: "", address: "", contact: "", schedule: [{ day: "", time: "" }], mapUrl: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: LocationItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      address: item.address,
      contact: item.contact,
      schedule: item.schedule.length > 0 ? item.schedule : [{ day: "", time: "" }],
      mapUrl: item.mapUrl,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setLocations(locations.filter(loc => loc.id !== id));
    toast.success("Location deleted successfully!");
  };

  const addSchedule = () => {
    setFormData({ ...formData, schedule: [...formData.schedule, { day: "", time: "" }] });
  };

  const removeSchedule = (index: number) => {
    setFormData({ ...formData, schedule: formData.schedule.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Consultation Locations</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ name: "", address: "", contact: "", schedule: [{ day: "", time: "" }], mapUrl: "" }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Consultation Location</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Schedule (Day & Time)</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addSchedule}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Schedule
                  </Button>
                </div>
                {formData.schedule.map((slot, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={slot.day}
                      onChange={(e) => {
                        const newSchedule = [...formData.schedule];
                        newSchedule[index].day = e.target.value;
                        setFormData({ ...formData, schedule: newSchedule });
                      }}
                      placeholder="Day (e.g., Monday)"
                      className="flex-1"
                    />
                    <Input
                      value={slot.time}
                      onChange={(e) => {
                        const newSchedule = [...formData.schedule];
                        newSchedule[index].time = e.target.value;
                        setFormData({ ...formData, schedule: newSchedule });
                      }}
                      placeholder="Time (e.g., 9:00 AM - 5:00 PM)"
                      className="flex-1"
                    />
                    {formData.schedule.length > 1 && (
                      <Button type="button" size="icon" variant="destructive" onClick={() => removeSchedule(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mapUrl">Google Map URL</Label>
                <Input
                  id="mapUrl"
                  type="url"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? "Update" : "Add"} Location
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {locations.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.address}</p>
                <p className="text-sm text-muted-foreground">Contact: {item.contact}</p>
                <div>
                  <h4 className="text-sm font-medium mb-1">Schedule:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {item.schedule.map((slot, idx) => (
                      <li key={idx}>
                        {slot.day}: {slot.time}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-block"
                >
                  View on Google Maps
                </a>
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
