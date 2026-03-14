export interface User {
  id: number;            // telegram_id
  username: string;
  phone: string;
  email: string | null;
  address: string | null;
  registered_at: string; // ISO timestamp
}

