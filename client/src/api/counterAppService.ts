import axios, { AxiosResponse } from "axios";
import { Counter } from "../models/Counter";

export const getCounters = (): Promise<AxiosResponse<{ counters: Counter[] }>> => {
  return axios.get(
    'http://localhost:4000/api/counters',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export const loginUser = (
  username: string,
  password: string,
): Promise<AxiosResponse<{ username: string }>> => {
  return axios.post(
    'http://localhost:4000/api/users/login',
    {
      username,
      password
    },
  )
}

export const increaseCounter = (
  username: string,
): Promise<AxiosResponse<{ counters: Counter[] }>> => {
  return axios.post(
    'http://localhost:4000/api/counters/increase',
    {
      username
    }
  )
}

export const logoutUser = (username: string, password: string): Promise<AxiosResponse<void>> => {
  return axios.post(
    'http://localhost:4000/api/users/logout',
    {
      username,
      password
    }
  )
}