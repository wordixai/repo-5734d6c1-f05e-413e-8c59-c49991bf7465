import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, UserPlus, DollarSign, Percent, Award, TrendingUp, Users } from "lucide-react";

export default function Referrals() {
  const { clients, referralPrograms, addClient } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: "",
    rewardType: "percentage" as "percentage" | "fixed",
    rewardValue: 10,
    isActive: true
  });

  // Calculate referral statistics
  const clientsWithReferrals = clients.filter(client => client.referrals.length > 0);
  const totalReferrals = clients.reduce((sum, client) => sum + client.referrals.length, 0);
  const referredClients = clients.filter(client => client.referredBy);
  
  // Create referral network data
  const referralNetwork = clientsWithReferrals.map(client => ({
    referrer: client,
    referrals: client.referrals.map(referralId => 
      clients.find(c => c.id === referralId)
    ).filter(Boolean),
    totalReward: client.referrals.length * 50 // Example reward calculation
  }));

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (client.referrals.length > 0 || client.referredBy)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referral Program</h1>
          <p className="text-muted-foreground">Track and manage client referrals</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Referral Program</DialogTitle>
              <DialogDescription>
                Set up a new referral reward program
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  placeholder="e.g., Friend Referral Program"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="rewardType">Reward Type</Label>
                <Select 
                  value={newProgram.rewardType} 
                  onValueChange={(value: "percentage" | "fixed") => setNewProgram({ ...newProgram, rewardType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="rewardValue">
                  Reward Value {newProgram.rewardType === 'percentage' ? '(%)' : '($)'}
                </Label>
                <Input
                  id="rewardValue"
                  type="number"
                  value={newProgram.rewardValue}
                  onChange={(e) => setNewProgram({ ...newProgram, rewardValue: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Active Program</Label>
                <Switch
                  id="isActive"
                  checked={newProgram.isActive}
                  onCheckedChange={(checked) => setNewProgram({ ...newProgram, isActive: checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Create Program</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <UserPlus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              {referredClients.length} referred clients
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsWithReferrals.length}</div>
            <p className="text-xs text-muted-foreground">
              Clients who referred others
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.length > 0 ? Math.round((referredClients.length / clients.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Referred to total clients
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${referralNetwork.reduce((sum, item) => sum + item.totalReward, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Rewards earned
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
            <CardDescription>Clients who brought the most referrals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {referralNetwork
              .sort((a, b) => b.referrals.length - a.referrals.length)
              .slice(0, 5)
              .map((item, index) => (
                <div key={item.referrer.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.referrer.avatar} />
                      <AvatarFallback>{item.referrer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.referrer.name}</p>
                      <p className="text-sm text-muted-foreground">{item.referrer.email}</p>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-semibold">{item.referrals.length} referrals</p>
                    <p className="text-sm text-muted-foreground">${item.totalReward} reward</p>
                  </div>
                </div>
              ))}
            
            {referralNetwork.length === 0 && (
              <div className="text-center py-8">
                <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No referrals yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral Programs */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Programs</CardTitle>
            <CardDescription>Active reward programs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {referralPrograms.map((program) => (
              <Card key={program.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{program.name}</h3>
                  <Badge variant={program.isActive ? 'default' : 'secondary'}>
                    {program.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {program.rewardType === 'percentage' ? (
                      <Percent className="h-3 w-3" />
                    ) : (
                      <DollarSign className="h-3 w-3" />
                    )}
                    {program.rewardValue}{program.rewardType === 'percentage' ? '% discount' : ' reward'}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">
                    {totalReferrals} total referrals through this program
                  </p>
                </div>
              </Card>
            ))}
            
            {referralPrograms.length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No referral programs created yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Referral Network */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Referral Network</CardTitle>
              <CardDescription>Complete overview of client referrals</CardDescription>
            </div>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {referralNetwork.map((item) => (
              <div key={item.referrer.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={item.referrer.avatar} />
                    <AvatarFallback>{item.referrer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.referrer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Referred {item.referrals.length} clients • Earned ${item.totalReward}
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {item.referrals.map((referral) => (
                    <div key={referral?.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={referral?.avatar} />
                        <AvatarFallback>{referral?.name?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{referral?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{referral?.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {referralNetwork.length === 0 && (
              <div className="text-center py-12">
                <UserPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No referrals yet</h3>
                <p className="text-muted-foreground">
                  When clients refer others, they'll appear here with their referral network
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}