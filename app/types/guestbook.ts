export interface GuestBook {
  id: string;
  timestamp: string;
  name: string;
  phone_number: string;
  address: string;
  needs: string;
  photo_url: string;
}

export interface FormState {
  name: string;
  phone_number: string;
  address: string;
  needs: string;
}

export interface AdminGuestBook extends GuestBook {
  status: 'PENDING' | 'APPROVED';
}
