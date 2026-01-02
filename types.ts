
// types.ts
// This file defines the shared interfaces used across the application to ensure type safety.

/**
 * Represents the user's gaming and personal profile.
 */
export interface UserProfile {
  fullName: string;
  ign: string;
  uid: string;
  level: string;
  device?: string;
  upiId: string;
}

/**
 * Represents a tournament event.
 */
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

/**
 * Represents a tournament that a user has participated in.
 */
export interface JoinedTournament {
  id?: string;
  name: string;
  dateTime: string;
  entryFee: number;
  joinedAt: string; // ISO Date string
}

/**
 * Global application configuration settings managed by admins.
 */
export interface AppConfig {
  adminWhatsApp: string;
  upiId: string;
  banners: string[];
}
