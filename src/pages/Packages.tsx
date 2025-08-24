import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Package, DollarSign, Clock, Check, Edit, Trash2 } from "lucide-react";

export default function Packages() {
  const { packages, addPackage, updatePackage, deletePackage } = useStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 2,
    features: [""],
    isActive: true
  });

  const handleAddPackage = () => {
    const features = newPackage.features.filter(f => f.trim() !== "");
    addPackage({ ...newPackage, features });
    setNewPackage({
      name: "",
      description: "",
      price: 0,
      duration: 2,
      features: [""],
      isActive: true
    });
    setIsDialogOpen(false);
  };

  const addFeature = () => {
    setNewPackage({
      ...newPackage,
      features: [...newPackage.features, ""]
    });
  };

  const updateFeature = (index: number, value: string) => {
    const features = [...newPackage.features];
    features[index] = value;
    setNewPackage({ ...newPackage, features });
  };

  const removeFeature = (index: number) => {
    const features = newPackage.features.filter((_, i) => i !== index);
    setNewPackage({ ...newPackage, features });
  };

  const activePackages = packages.filter(pkg => pkg.isActive).length;
  const averagePrice = packages.length > 0 ? 
    packages.reduce((sum, pkg) => sum + pkg.price, 0) / packages.length : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">Manage your photography packages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Package</DialogTitle>
              <DialogDescription>
                Create a new photography package
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Package Name</Label>
                <Input
                  id="name"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  placeholder="e.g., Wedding Premium"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                  placeholder="Package description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newPackage.duration}
                    onChange={(e) => setNewPackage({ ...newPackage, duration: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {newPackage.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Feature description"
                      />
                      {newPackage.features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Active Package</Label>
                <Switch
                  id="isActive"
                  checked={newPackage.isActive}
                  onCheckedChange={(checked) => setNewPackage({ ...newPackage, isActive: checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPackage}>Create Package</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packages.length}</div>
            <p className="text-xs text-muted-foreground">
              {activePackages} active
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(averagePrice)}</div>
            <p className="text-xs text-muted-foreground">
              Across all packages
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Wedding Premium</div>
            <p className="text-xs text-muted-foreground">
              Based on bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Packages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
            pkg.isActive ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-transparent' : 'opacity-60'
          }`}>
            {!pkg.isActive && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">Inactive</Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
              </div>
              
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-3xl font-bold text-primary">${pkg.price}</span>
                <span className="text-muted-foreground">/ session</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {pkg.duration} hours coverage
              </div>
              
              <div className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => updatePackage(pkg.id, { isActive: !pkg.isActive })}
                >
                  {pkg.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deletePackage(pkg.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {packages.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No packages created yet</h3>
            <p className="text-muted-foreground">Create your first photography package to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}