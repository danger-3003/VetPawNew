import { USER_API } from "../api/urls";
import api from "../api/instance";

export const handleGetUserBookings = async () => {
  const response = await api.get(USER_API?.MY_BOOKINGS);
  return response;
}