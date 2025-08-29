import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api`;
const path = "/foodtruck"; // Match your router path (adjust if different)

export const foodTruckReservationService = {
  // Create a new food truck reservation
  async createReservation(data) {
    try {
      const response = await axios.post(`${baseUrl}${path}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating food truck reservation:", error);
      throw error;
    }
  },
};
