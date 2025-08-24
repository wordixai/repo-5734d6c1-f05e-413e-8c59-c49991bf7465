import { create } from 'zustand';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive';
  totalSpent: number;
  referredBy?: string;
  referrals: string[];
  bookings: Booking[];
  galleries: Gallery[];
  createdAt: Date;
}

export interface Booking {
  id: string;
  clientId: string;
  type: 'wedding' | 'portrait' | 'event' | 'commercial';
  title: string;
  date: Date;
  duration: number;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  packageId: string;
  price: number;
  deposit: number;
  notes?: string;
  reminders: Reminder[];
}

export interface Reminder {
  id: string;
  type: 'email' | 'sms';
  message: string;
  scheduledDate: Date;
  sent: boolean;
}

export interface Gallery {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  coverImage: string;
  images: GalleryImage[];
  isPublic: boolean;
  password?: string;
  downloadEnabled: boolean;
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  title?: string;
  selected: boolean;
  downloadCount: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  isActive: boolean;
}

export interface ReferralProgram {
  id: string;
  name: string;
  rewardType: 'percentage' | 'fixed';
  rewardValue: number;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  businessName: string;
  phone: string;
  website?: string;
  bio?: string;
  location: string;
}

export interface BusinessSettings {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  language: string;
  taxRate: number;
  invoicePrefix: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
}

export interface NotificationSettings {
  emailNotifications: {
    newBooking: boolean;
    bookingReminder: boolean;
    paymentReceived: boolean;
    galleryViewed: boolean;
    clientRegistered: boolean;
  };
  smsNotifications: {
    bookingReminder: boolean;
    paymentDue: boolean;
  };
  pushNotifications: {
    enabled: boolean;
    booking: boolean;
    payment: boolean;
    gallery: boolean;
  };
  reminderSettings: {
    defaultReminderTime: number; // hours before
    autoReminders: boolean;
    reminderFrequency: 'once' | 'daily' | 'weekly';
  };
}

export interface SystemSettings {
  theme: 'light' | 'dark' | 'system';
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  dataRetention: number; // months
  twoFactorAuth: boolean;
  sessionTimeout: number; // minutes
  defaultGallerySettings: {
    isPublic: boolean;
    downloadEnabled: boolean;
    passwordProtected: boolean;
  };
  watermarkSettings: {
    enabled: boolean;
    text: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity: number;
  };
}

interface AppState {
  clients: Client[];
  bookings: Booking[];
  galleries: Gallery[];
  packages: Package[];
  referralPrograms: ReferralProgram[];
  userProfile: UserProfile;
  businessSettings: BusinessSettings;
  notificationSettings: NotificationSettings;
  systemSettings: SystemSettings;
  
  // Actions
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  
  addGallery: (gallery: Omit<Gallery, 'id' | 'createdAt'>) => void;
  updateGallery: (id: string, updates: Partial<Gallery>) => void;
  deleteGallery: (id: string) => void;
  
  addPackage: (pkg: Omit<Package, 'id'>) => void;
  updatePackage: (id: string, updates: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  
  // Settings Actions
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updateBusinessSettings: (updates: Partial<BusinessSettings>) => void;
  updateNotificationSettings: (updates: Partial<NotificationSettings>) => void;
  updateSystemSettings: (updates: Partial<SystemSettings>) => void;
}

export const useStore = create<AppState>((set) => ({
  clients: [
    {
      id: '1',
      name: 'Sarah & James Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop',
      status: 'active',
      totalSpent: 2500,
      referrals: ['2'],
      bookings: [],
      galleries: [],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      status: 'active',
      totalSpent: 1800,
      referredBy: '1',
      referrals: [],
      bookings: [],
      galleries: [],
      createdAt: new Date('2024-02-10')
    },
    {
      id: '3',
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      phone: '+1 (555) 456-7890',
      status: 'active',
      totalSpent: 3200,
      referrals: [],
      bookings: [],
      galleries: [],
      createdAt: new Date('2024-01-20')
    }
  ],
  
  bookings: [
    {
      id: '1',
      clientId: '1',
      type: 'wedding',
      title: 'Sarah & James Wedding',
      date: new Date('2024-06-15'),
      duration: 8,
      location: 'Grand Oak Venue, Downtown',
      status: 'confirmed',
      packageId: '1',
      price: 2500,
      deposit: 500,
      notes: 'Outdoor ceremony, indoor reception',
      reminders: []
    },
    {
      id: '2',
      clientId: '2',
      type: 'portrait',
      title: 'Emily Portrait Session',
      date: new Date('2024-03-20'),
      duration: 2,
      location: 'Studio A',
      status: 'completed',
      packageId: '2',
      price: 450,
      deposit: 150,
      reminders: []
    }
  ],
  
  galleries: [
    {
      id: '1',
      clientId: '2',
      title: 'Emily Portrait Session',
      description: 'Professional headshots and lifestyle portraits',
      coverImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400&h=300&fit=crop',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=800&h=1200&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&h=200&fit=crop',
          title: 'Portrait 1',
          selected: true,
          downloadCount: 3
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop',
          title: 'Portrait 2',
          selected: false,
          downloadCount: 1
        }
      ],
      isPublic: false,
      password: 'emily2024',
      downloadEnabled: true,
      createdAt: new Date('2024-03-21')
    }
  ],
  
  packages: [
    {
      id: '1',
      name: 'Wedding Premium',
      description: 'Complete wedding photography package',
      price: 2500,
      duration: 8,
      features: ['8 hours coverage', '500+ edited photos', 'Online gallery', 'USB drive'],
      isActive: true
    },
    {
      id: '2',
      name: 'Portrait Session',
      description: 'Professional portrait photography',
      price: 450,
      duration: 2,
      features: ['2 hours session', '50+ edited photos', 'Online gallery', '5 prints'],
      isActive: true
    },
    {
      id: '3',
      name: 'Event Coverage',
      description: 'Corporate and private events',
      price: 800,
      duration: 4,
      features: ['4 hours coverage', '200+ edited photos', 'Online gallery'],
      isActive: true
    }
  ],
  
  referralPrograms: [
    {
      id: '1',
      name: 'Friend Referral',
      rewardType: 'percentage',
      rewardValue: 10,
      isActive: true
    }
  ],

  userProfile: {
    id: '1',
    name: 'John Doe',
    email: 'john@photography.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    businessName: 'John Doe Photography',
    phone: '+1 (555) 123-4567',
    website: 'www.johndoephotography.com',
    bio: 'Professional photographer specializing in weddings and portraits',
    location: 'Los Angeles, CA'
  },

  businessSettings: {
    businessName: 'John Doe Photography',
    address: '123 Photography St, Los Angeles, CA 90210',
    phone: '+1 (555) 123-4567',
    email: 'john@photography.com',
    website: 'www.johndoephotography.com',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    taxRate: 8.25,
    invoicePrefix: 'INV-',
    workingHours: {
      start: '09:00',
      end: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },

  notificationSettings: {
    emailNotifications: {
      newBooking: true,
      bookingReminder: true,
      paymentReceived: true,
      galleryViewed: false,
      clientRegistered: true
    },
    smsNotifications: {
      bookingReminder: true,
      paymentDue: true
    },
    pushNotifications: {
      enabled: true,
      booking: true,
      payment: true,
      gallery: false
    },
    reminderSettings: {
      defaultReminderTime: 24,
      autoReminders: true,
      reminderFrequency: 'daily'
    }
  },

  systemSettings: {
    theme: 'light',
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 12,
    twoFactorAuth: false,
    sessionTimeout: 60,
    defaultGallerySettings: {
      isPublic: false,
      downloadEnabled: true,
      passwordProtected: true
    },
    watermarkSettings: {
      enabled: false,
      text: 'John Doe Photography',
      position: 'bottom-right',
      opacity: 50
    }
  },
  
  // Actions
  addClient: (client) => set((state) => ({
    clients: [...state.clients, { ...client, id: Date.now().toString(), createdAt: new Date() }]
  })),
  
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(client => client.id === id ? { ...client, ...updates } : client)
  })),
  
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(client => client.id !== id)
  })),
  
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, { ...booking, id: Date.now().toString() }]
  })),
  
  updateBooking: (id, updates) => set((state) => ({
    bookings: state.bookings.map(booking => booking.id === id ? { ...booking, ...updates } : booking)
  })),
  
  deleteBooking: (id) => set((state) => ({
    bookings: state.bookings.filter(booking => booking.id !== id)
  })),
  
  addGallery: (gallery) => set((state) => ({
    galleries: [...state.galleries, { ...gallery, id: Date.now().toString(), createdAt: new Date() }]
  })),
  
  updateGallery: (id, updates) => set((state) => ({
    galleries: state.galleries.map(gallery => gallery.id === id ? { ...gallery, ...updates } : gallery)
  })),
  
  deleteGallery: (id) => set((state) => ({
    galleries: state.galleries.filter(gallery => gallery.id !== id)
  })),
  
  addPackage: (pkg) => set((state) => ({
    packages: [...state.packages, { ...pkg, id: Date.now().toString() }]
  })),
  
  updatePackage: (id, updates) => set((state) => ({
    packages: state.packages.map(pkg => pkg.id === id ? { ...pkg, ...updates } : pkg)
  })),
  
  deletePackage: (id) => set((state) => ({
    packages: state.packages.filter(pkg => pkg.id !== id)
  })),

  // Settings Actions
  updateUserProfile: (updates) => set((state) => ({
    userProfile: { ...state.userProfile, ...updates }
  })),

  updateBusinessSettings: (updates) => set((state) => ({
    businessSettings: { ...state.businessSettings, ...updates }
  })),

  updateNotificationSettings: (updates) => set((state) => ({
    notificationSettings: { ...state.notificationSettings, ...updates }
  })),

  updateSystemSettings: (updates) => set((state) => ({
    systemSettings: { ...state.systemSettings, ...updates }
  }))
}));