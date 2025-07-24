import requests from "./httpService";

const OfferZoneServices = {
  getAllOffers: async () => {
    return requests.get("/offer-zone");
  },

  getOfferById: async (id) => {
    return requests.get(`/offer-zone/${id}`);
  },

  addOffer: async (body) => {
    return requests.post("/offer-zone/add", body);
  },

  updateOffer: async (id, body) => {
    return requests.put(`/offer-zone/${id}`, body);
  },

  updateOfferStatus: async (id, body) => {
    return requests.put(`/offer-zone/status/${id}`, body);
  },

  deleteOffer: async (id) => {
    return requests.delete(`/offer-zone/${id}`);
  },

  deleteManyOffers: async (body) => {
    return requests.patch("/offer-zone/delete/many", body);
  },
};

export default OfferZoneServices; 