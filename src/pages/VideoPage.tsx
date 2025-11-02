import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  url: string;
}

export default function VideoPage() {
  const [videos, setVideos] = useState<VideoItem[]>([
    { id: 1, title: "Introduction to Cardiovascular Health", url: "https://youtube.com/watch?v=example" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null);
  const [formData, setFormData] = useState({ title: "", url: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setVideos(videos.map(video => video.id === editingItem.id ? { ...video, ...formData } : video));
      toast.success("Video updated successfully!");
    } else {
      setVideos([...videos, { id: Date.now(), ...formData }]);
      toast.success("Video added successfully!");
    }
    setIsDialogOpen(false);
    setFormData({ title: "", url: "" });
    setEditingItem(null);
  };

  const handleEdit = (item: VideoItem) => {
    setEditingItem(item);
    setFormData({ title: item.title, url: item.url });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setVideos(videos.filter(video => video.id !== id));
    toast.success("Video deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Videos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({ title: "", url: "" }); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Video</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Video URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? "Update" : "Add"} Video
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {videos.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {item.url}
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
