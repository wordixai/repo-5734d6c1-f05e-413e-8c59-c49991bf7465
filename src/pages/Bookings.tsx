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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Search, Calendar as CalendarIcon, Clock, MapPin, DollarSign } from "lucide-react";
import { format } from "date-fns";

export default function Bookings() {
  const { bookings, clients, packages, addBooking } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newBooking, setNewBooking] = useState({
    clientId: "",
    type: "portrait" as "wedding" | "portrait" | "event" | "commercial",
    title: "",
    date: new Date(),
    duration: 2,
    location: "",
    status: "pending" as "pending" | "confirmed" | "completed" | "cancelled",
    packageId: "",
    price: 0,
    deposit: 0,
    notes: "",
    reminders: []
  });

  const filteredBookings = bookings.filter(booking => {
    const client = clients.find(c => c.id === booking.clientId);
    return booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddBooking = () => {
    if (selectedDate) {
      addBooking({ ...newBooking, date: selectedDate });
      setNewBooking({
        clientId: "",
        type: "portrait",
        title: "",
        date: new Date(),
        duration: 2,
        location: "",
        status: "pending",
        packageId: "",
        price: 0,
        deposit: 0,
        notes: "",
        reminders: []
      });
      setSelectedDate(undefined);
      setIsDialogOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return '💒';
      case 'portrait': return '👤';
      case 'event': return '🎉';
      case 'commercial': return '🏢';
      default: return '📷';
    }
  };

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.price, 0);
  const upcomingBookings = bookings.filter(b => new Date(b.date) > new Date()).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage your photography sessions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>
                Schedule a new photography session
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="client">Client</Label>
                  <Select value={newBooking.clientId} onValueChange={(value) => setNewBooking({ ...newBooking, clientId: value })}>
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
                  <Label htmlFor="type">Type</Label>
                  <Select value={newBooking.type} onValueChange={(value: any) => setNewBooking({ ...newBooking, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBooking.title}
                  onChange={(e) => setNewBooking({ ...newBooking, title: e.target.value })}
                  placeholder="Booking title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newBooking.duration}
                    onChange={(e) => setNewBooking({ ...newBooking, duration: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newBooking.location}
                  onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
                  placeholder="Venue or location"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="package">Package</Label>
                  <Select value={newBooking.packageId} onValueChange={(value) => setNewBooking({ ...newBooking, packageId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} - ${pkg.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newBooking.price}
                    onChange={(e) => setNewBooking({ ...newBooking, price: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deposit">Deposit</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={newBooking.deposit}
                    onChange={(e) => setNewBooking({ ...newBooking, deposit: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                  placeholder="Additional notes or requirements"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBooking}>Create Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingBookings} upcoming
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From all bookings
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per booking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Bookings List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredBookings.map((booking) => {
              const client = clients.find(c => c.id === booking.clientId);
              const pkg = packages.find(p => p.id === booking.packageId);
              
              return (
                <Card key={booking.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getTypeIcon(booking.type)}</div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client?.avatar} />
                      <AvatarFallback>{client?.name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{booking.title}</h3>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.duration}h
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {booking.location}
                        </div>
                      </div>
                      
                      {pkg && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Package: {pkg.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">${booking.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Deposit: ${booking.deposit}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bookings found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}