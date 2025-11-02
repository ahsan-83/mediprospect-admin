import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Edit, Save, Plus, X } from "lucide-react";

interface TimeSlot {
  day: string;
  time: string;
}

export default function Contact() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "+1 (555) 123-4567",
    email: "dr.sarah@hospital.com",
    mainOfficeAddress: "123 Health Street, Medical District, City, State 12345",
    schedule: [
      { day: "Monday - Friday", time: "9:00 AM - 5:00 PM" },
      { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    ],
    mapUrl: "https://maps.google.com/?q=Main+Office",
    facebookUrl: "https://facebook.com/drsarah",
    twitterUrl: "https://twitter.com/drsarah",
    linkedInUrl: "https://linkedin.com/in/drsarah",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Contact information updated successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: "", time: "" }],
    });
  };

  const removeSchedule = (index: number) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index),
    });
  };

  const updateSchedule = (index: number, field: "day" | "time", value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index][field] = value;
    setFormData({ ...formData, schedule: newSchedule });
  };

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contact Information</CardTitle>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainOfficeAddress">Main Office Address</Label>
              <Textarea
                id="mainOfficeAddress"
                name="mainOfficeAddress"
                value={formData.mainOfficeAddress}
                onChange={handleChange}
                disabled={!isEditing}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Office Hours</Label>
                {isEditing && (
                  <Button type="button" size="sm" variant="outline" onClick={addSchedule}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Schedule
                  </Button>
                )}
              </div>
              {formData.schedule.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={slot.day}
                    onChange={(e) => updateSchedule(index, "day", e.target.value)}
                    placeholder="Day(s)"
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  <Input
                    value={slot.time}
                    onChange={(e) => updateSchedule(index, "time", e.target.value)}
                    placeholder="Time"
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  {isEditing && formData.schedule.length > 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={() => removeSchedule(index)}
                    >
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
                name="mapUrl"
                type="url"
                value={formData.mapUrl}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-4">
              <Label>Social Media Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl" className="text-sm text-muted-foreground">
                    Facebook
                  </Label>
                  <Input
                    id="facebookUrl"
                    name="facebookUrl"
                    type="url"
                    value={formData.facebookUrl}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl" className="text-sm text-muted-foreground">
                    Twitter
                  </Label>
                  <Input
                    id="twitterUrl"
                    name="twitterUrl"
                    type="url"
                    value={formData.twitterUrl}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedInUrl" className="text-sm text-muted-foreground">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedInUrl"
                    name="linkedInUrl"
                    type="url"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Submit
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
