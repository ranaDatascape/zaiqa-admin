import requests from "./httpService";

const BookingServices = {
  getAllBookingData: async () => {
    return requests.get("/booking");
  },
};

export default BookingServices;
