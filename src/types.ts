export type MenuCategory = 
  | 'All'
  | 'Starters & Snacks'
  | 'Kebabs'
  | 'Mains'
  | 'Pizza & Pasta'
  | 'Drinks'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  category: Exclude<MenuCategory, 'All'>;
  description: string;
  price?: number;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  diet: 'veg' | 'non-veg';
  imageUrl?: string;
  tags?: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  theme: 'ambience' | 'food' | 'drinks' | 'service';
  text: string;
  dishMentioned?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'Rooftop Terrace' | 'Sunset Deck' | 'Indoor AC Lounge';
  occasion?: string;
  specialRequest?: string;
}
