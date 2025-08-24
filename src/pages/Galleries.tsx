import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Image, Download, Eye, Lock, Unlock, Calendar } from "lucide-react";

export default function Galleries() {
  const { galleries, clients, addGallery } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGallery, setNewGallery] = useState({
    clientId: "",
    title: "",
    description: "",
    coverImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400&h=300&fit=crop",
    images: [],
    isPublic: false,
    password: "",
    downloadEnabled: true
  });

  const filteredGalleries = galleries.filter(gallery => {
    const client = clients.find(c => c.id === gallery.clientId);
    return gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddGallery = () => {
    addGallery(newGallery);
    setNewGallery({
      clientId: "",
      title: "",
      description: "",
      coverImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400&h=300&fit=crop",
      images: [],
      isPublic: false,
      password: "",
      downloadEnabled: true
    });
    setIsDialogOpen(false);
  };

  const totalImages = galleries.reduce((sum, gallery) => sum + gallery.images.length, 0);
  const totalDownloads = galleries.reduce((sum, gallery) => 
    sum + gallery.images.reduce((imgSum, img) => imgSum + img.downloadCount, 0), 0
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galleries</h1>
          <p className="text-muted-foreground">Manage client photo galleries</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Gallery
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Gallery</DialogTitle>
              <DialogDescription>
                Create a new photo gallery for a client
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Select value={newGallery.clientId} onValueChange={(value) => setNewGallery({ ...newGallery, clientId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Gallery Title</Label>
                <Input
                  id="title"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  placeholder="Gallery title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                  placeholder="Gallery description"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isPublic">Public Gallery</Label>
                <Switch
                  id="isPublic"
                  checked={newGallery.isPublic}
                  onCheckedChange={(checked) => setNewGallery({ ...newGallery, isPublic: checked })}
                />
              </div>
              
              {!newGallery.isPublic && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newGallery.password}
                    onChange={(e) => setNewGallery({ ...newGallery, password: e.target.value })}
                    placeholder="Gallery password"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Label htmlFor="downloadEnabled">Allow Downloads</Label>
                <Switch
                  id="downloadEnabled"
                  checked={newGallery.downloadEnabled}
                  onCheckedChange={(checked) => setNewGallery({ ...newGallery, downloadEnabled: checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGallery}>Create Gallery</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Galleries</CardTitle>
            <Image className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleries.length}</div>
            <p className="text-xs text-muted-foreground">
              {galleries.filter(g => g.isPublic).length} public
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <Image className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImages}</div>
            <p className="text-xs text-muted-foreground">
              Across all galleries
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads}</div>
            <p className="text-xs text-muted-foreground">
              Image downloads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Galleries Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search galleries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="photo-grid">
            {filteredGalleries.map((gallery) => {
              const client = clients.find(c => c.id === gallery.clientId);
              
              return (
                <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url(${gallery.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2">
                      {gallery.isPublic ? (
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          <Unlock className="h-3 w-3 mr-1" />
                          Public
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          <Lock className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{gallery.title}</h3>
                      <p className="text-sm opacity-90">{client?.name}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    {gallery.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {gallery.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Image className="h-3 w-3" />
                          {gallery.images.length} photos
                        </div>
                        {gallery.downloadEnabled && (
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Downloads enabled
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(gallery.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredGalleries.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No galleries found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}