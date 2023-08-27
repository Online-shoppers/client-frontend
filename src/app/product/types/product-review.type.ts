export interface ProductReview {
  id: string;
  created: number;
  updated: number;
  summary: string;
  text: string;
  rating: number;
  userId: string;
  edited: boolean;
  archived: boolean;
}
