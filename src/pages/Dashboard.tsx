import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, Image, DollarSign, ArrowUpRight, Camera, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { clients, bookings, galleries } = useStore();

  const upcomingBookings = bookings
    .filter(booking => new Date(booking.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const recentGalleries = galleries
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.price, 0);
  const activeClients = clients.filter(client => client.status === 'active').length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome back, John!</h1>
          <p className="text-lg opacity-90 mb-6">
            You have {upcomingBookings.length} upcoming shoots this week
          </p>
          <Button variant="secondary" size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
            <Camera className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingBookings.length} upcoming
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Galleries</CardTitle>
            <Image className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleries.length}</div>
            <p className="text-xs text-muted-foreground">
              3 delivered this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Bookings */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your next photo sessions</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/bookings">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBookings.map((booking) => {
              const client = clients.find(c => c.id === booking.clientId);
              return (
                <div key={booking.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={client?.avatar} />
                    <AvatarFallback>{client?.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{booking.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(booking.date).toLocaleDateString()}
                      <Clock className="h-3 w-3 ml-2" />
                      {booking.duration}h
                    </div>
                  </div>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </div>
              );
            })}
            {upcomingBookings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No upcoming bookings
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Galleries */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Galleries</CardTitle>
                <CardDescription>Latest client galleries</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/galleries">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGalleries.map((gallery) => {
              const client = clients.find(c => c.id === gallery.clientId);
              return (
                <div key={gallery.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div 
                    className="h-12 w-12 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${gallery.coverImage})` }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{gallery.title}</p>
                    <p className="text-sm text-muted-foreground">{client?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{gallery.images.length} photos</p>
                    <p className="text-xs text-muted-foreground">
                      {gallery.downloadEnabled ? 'Downloadable' : 'View only'}
                    </p>
                  </div>
                </div>
              );
            })}
            {recentGalleries.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No galleries created yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}