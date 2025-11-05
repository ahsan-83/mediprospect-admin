import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockImages = [
  { id: 1, title: "Sample Image 1", url: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=400", size: "2.4 MB" },
  { id: 2, title: "Sample Image 2", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400", size: "1.8 MB" },
  { id: 3, title: "Sample Image 3", url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400", size: "3.1 MB" },
  { id: 4, title: "Sample Image 4", url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400", size: "2.7 MB" },
];

export default function Images() {
  const [images, setImages] = useState(mockImages);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  const handleFileSelect = () => {
    // Mock upload functionality
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image title",
        variant: "destructive",
      });
      return;
    }

    const newImage = {
      id: images.length + 1,
      title: title,
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
      size: "2.5 MB"
    };

    setImages([newImage, ...images]);
    setTitle("");
    setOpen(false);

    toast({
      title: "Success",
      description: "Image uploaded successfully (mockup)",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Images</h1>
          <p className="text-muted-foreground">Manage your image gallery</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Add a new image to your gallery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Image Title</Label>
                <Input
                  id="title"
                  placeholder="Enter image title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Select Image</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to select an image (mockup)
                  </p>
                </div>
              </div>
              <Button onClick={handleFileSelect} className="w-full">
                Upload Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{image.title}</h3>
              <p className="text-sm text-muted-foreground">{image.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No images yet</h3>
          <p className="text-muted-foreground">Upload your first image to get started</p>
        </div>
      )}
    </div>
  );
}
