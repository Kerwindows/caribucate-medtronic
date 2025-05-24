import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const VERIFY_TOKEN_URL = `${API_URL}/verify_token`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

export interface AuthResponse {
  api_token: string;
}

export interface UserResponse {
  status: string;
  user: UserModel;
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

export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserResponse>(VERIFY_TOKEN_URL, { api_token: token });
}

