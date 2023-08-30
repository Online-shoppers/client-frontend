export interface Order {
  id: string;
  created: number;
  updated: number;
  status: string;
  country: string;
  city: string;
  zipCode: string;
  address: string;
  phone: string;
  buyerId: string;
}
