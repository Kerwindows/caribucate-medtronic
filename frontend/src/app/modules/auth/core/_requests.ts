import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const VERIFY_TOKEN_URL = `${API_URL}/verify_token`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/send_reset_email.php`;
export const RESET_PASSWORD_URL = `${API_URL}/reset_password.php`;
export const USERS_URL = `${API_URL}/users.php`;

export function getUsers() {
  return axios.get<{
    status: string;
    data: {
      users: UserModel[];
      positions: Array<{id: number, name: string}>;
      departments: Array<{id: number, name: string}>;
      schools: Array<{id: number, name: string}>;
      houses: string[];
    }
  }>(USERS_URL);
}

export interface AuthResponse {
  api_token: string;
}

export interface UserResponse {
  status: string;
  user: UserModel;
}

// Password reset types
interface PasswordResetResponse {
  status: 'success' | 'error';
  message: string;
}

export function login(email: string, password: string) {
  return axios.post<AuthResponse>(LOGIN_URL, { email, password });
}

export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post<{ status: string; message: string }>(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// export function requestPassword(email: string) {
//   return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
//     email,
//   });
// }

export function getUserByToken(token: string) {
  return axios.post<UserResponse>(VERIFY_TOKEN_URL, { api_token: token });
}


// Updated password reset functions
export async function requestPasswordReset(email: string): Promise<PasswordResetResponse> {
  try {
    const response = await axios.post<PasswordResetResponse>(
      REQUEST_PASSWORD_URL, 
      { email }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Failed to send reset email'
      };
    }
    return {
      status: 'error',
      message: 'An unexpected error occurred'
    };
  }
}

export async function resetPassword(token: string, password: string): Promise<PasswordResetResponse> {
  try {
    const response = await axios.post<PasswordResetResponse>(
      RESET_PASSWORD_URL, 
      { token, password }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Failed to reset password'
      };
    }
    return {
      status: 'error',
      message: 'An unexpected error occurred'
    };
  }
}