
export interface UserProfile {
  fullName: string;
  ign: string;
  uid: string;
  level: string;
  device?: string;
  upiId: string;
}

export interface Tournament {
  id: string;
  name: string;
  matchType: 'Solo' | 'Duo' | 'Squad';
  entryFee: number;
  dateTime: string;
  prizePool: string;
  status: 'Open' | 'Full' | 'Completed';
  image: string;
  description: string;
  rules: string[];
  totalSlots: number;
  joinedSlots: number;
  minSlots?: number;
}

export interface JoinedTournament {
  id: string;
  name: string;
  dateTime: string;
  entryFee: number;
  joinedAt: string;
}

export interface AppConfig {
  banners: string[];
  rules: string[];
  upiId: string;
  adminWhatsApp: string;
}
