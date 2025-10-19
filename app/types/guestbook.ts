// Tipe data yang mewakili satu entri pesan di database (Google Sheet)
export interface GuestBook {
  id: string;
  timestamp: string;
  name: string;
  phone_number: string;
  address: string;
  needs: string;
  // likes: number; // (Jika Anda menambahkannya)
}

// Tipe data untuk state dari formulir pengiriman
export interface FormState {
  name: string;
  phone_number: string;
  address: string;
  needs: string;
}

// Tipe data untuk pesan yang diambil oleh admin (termasuk status)
export interface AdminGuestBook extends GuestBook {
  status: 'PENDING' | 'APPROVED';
}
