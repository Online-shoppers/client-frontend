export interface ProductReview {
  id: string;
  created: number;
  updated: number;
  text: string;
  rating: number;
  userId: string;
  userName: string;
  edited: boolean;
  archived: boolean;
}
