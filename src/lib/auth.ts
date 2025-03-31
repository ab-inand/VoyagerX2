export interface UserData {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: UserData;
  token?: string;
  error?: string;
} 