import { Hostel, University, User, Review } from '../types';

export const universities: University[] = [
  {
    id: '1',
    name: 'Makerere University',
    location: 'Kampala',
    imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Kyambogo University',
    location: 'Kampala',
    imageUrl: 'https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Mbarara University',
    location: 'Mbarara',
    imageUrl: 'https://images.pexels.com/photos/2305098/pexels-photo-2305098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Gulu University',
    location: 'Gulu',
    imageUrl: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Busitema University',
    location: 'Tororo',
    imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const hostels: Hostel[] = [
  {
    id: '1',
    name: 'Olympia Hostel',
    description: 'Modern accommodation with excellent facilities for students. Located just 5 minutes from campus.',
    ownerId: 'owner1',
    location: {
      address: '23 University Road, Kampala',
      distance: 0.5,
      coordinates: {
        lat: 0.3476,
        lng: 32.5825
      }
    },
    university: 'Makerere University',
    rating: 4.5,
    reviewCount: 120,
    amenities: ['WiFi', 'Security', 'Study Room', 'Laundry', 'Power Backup'],
    rooms: [
      {
        id: 'room1',
        type: 'Single',
        price: 450000, // UGX
        available: true,
        capacity: 1,
        amenities: ['Bed', 'Desk', 'Wardrobe', 'Private Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        id: 'room2',
        type: 'Double',
        price: 350000, // UGX
        available: true,
        capacity: 2,
        amenities: ['Beds', 'Desks', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/1879061/pexels-photo-1879061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      }
    ],
    imageUrls: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '2',
    name: 'Livingstone Hostel',
    description: 'Affordable and comfortable accommodation for students with all essential amenities.',
    ownerId: 'owner2',
    location: {
      address: '15 Kyambogo Road, Kampala',
      distance: 0.8,
      coordinates: {
        lat: 0.3484,
        lng: 32.6282
      }
    },
    university: 'Kyambogo University',
    rating: 4.2,
    reviewCount: 85,
    amenities: ['WiFi', 'Security', 'Cafeteria', 'Laundry'],
    rooms: [
      {
        id: 'room3',
        type: 'Single',
        price: 400000, // UGX
        available: true,
        capacity: 1,
        amenities: ['Bed', 'Desk', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        id: 'room4',
        type: 'Triple',
        price: 300000, // UGX
        available: false,
        capacity: 3,
        amenities: ['Beds', 'Desks', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      }
    ],
    imageUrls: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '3',
    name: 'Sunset Residences',
    description: 'Premium hostel with modern facilities and a great view of the city.',
    ownerId: 'owner1',
    location: {
      address: '55 Mbarara Hill, Mbarara',
      distance: 1.2,
      coordinates: {
        lat: -0.6166,
        lng: 30.6536
      }
    },
    university: 'Mbarara University',
    rating: 4.8,
    reviewCount: 64,
    amenities: ['WiFi', 'Security', 'Gym', 'Swimming Pool', 'Study Room', 'Laundry', 'Power Backup'],
    rooms: [
      {
        id: 'room5',
        type: 'Single Deluxe',
        price: 550000, // UGX
        available: true,
        capacity: 1,
        amenities: ['Bed', 'Desk', 'Wardrobe', 'Private Bathroom', 'AC', 'TV'],
        imageUrls: ['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        id: 'room6',
        type: 'Double',
        price: 450000, // UGX
        available: true,
        capacity: 2,
        amenities: ['Beds', 'Desks', 'Wardrobe', 'Shared Bathroom', 'AC'],
        imageUrls: ['https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      }
    ],
    imageUrls: [
      'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2294125/pexels-photo-2294125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '4',
    name: 'Northern Star Hostel',
    description: 'Comfortable and safe accommodation for Gulu University students.',
    ownerId: 'owner3',
    location: {
      address: '12 Gulu Avenue, Gulu',
      distance: 0.7,
      coordinates: {
        lat: 2.7746,
        lng: 32.2990
      }
    },
    university: 'Gulu University',
    rating: 4.1,
    reviewCount: 45,
    amenities: ['WiFi', 'Security', 'Cafeteria', 'Power Backup'],
    rooms: [
      {
        id: 'room7',
        type: 'Single',
        price: 380000, // UGX
        available: true,
        capacity: 1,
        amenities: ['Bed', 'Desk', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        id: 'room8',
        type: 'Double',
        price: 320000, // UGX
        available: true,
        capacity: 2,
        amenities: ['Beds', 'Desks', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      }
    ],
    imageUrls: [
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '5',
    name: 'Eastern Comfort',
    description: 'Peaceful and well-maintained hostel for Busitema University students.',
    ownerId: 'owner4',
    location: {
      address: '32 Tororo Road, Tororo',
      distance: 1.5,
      coordinates: {
        lat: 0.6933,
        lng: 34.1755
      }
    },
    university: 'Busitema University',
    rating: 4.3,
    reviewCount: 38,
    amenities: ['WiFi', 'Security', 'Study Room', 'Laundry', 'Garden'],
    rooms: [
      {
        id: 'room9',
        type: 'Single',
        price: 400000, // UGX
        available: true,
        capacity: 1,
        amenities: ['Bed', 'Desk', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      },
      {
        id: 'room10',
        type: 'Double',
        price: 350000, // UGX
        available: true,
        capacity: 2,
        amenities: ['Beds', 'Desks', 'Wardrobe', 'Shared Bathroom'],
        imageUrls: ['https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
      }
    ],
    imageUrls: [
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    hostelId: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing hostel with great facilities. The location is perfect for students.',
    date: '2023-12-15'
  },
  {
    id: 'r2',
    hostelId: '1',
    userId: 'user2',
    userName: 'Sarah Johnson',
    rating: 4,
    comment: 'Good facilities and friendly staff. Could improve on the internet speed.',
    date: '2023-11-20'
  },
  {
    id: 'r3',
    hostelId: '2',
    userId: 'user3',
    userName: 'Michael Brown',
    rating: 4,
    comment: 'Affordable and clean. Great value for money.',
    date: '2023-10-05'
  },
  {
    id: 'r4',
    hostelId: '3',
    userId: 'user4',
    userName: 'Emily Wilson',
    rating: 5,
    comment: 'Premium accommodation with excellent facilities. Worth every shilling!',
    date: '2023-12-30'
  }
];

export const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'student',
  university: 'Makerere University',
  phone: '256-78-123-4567',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};