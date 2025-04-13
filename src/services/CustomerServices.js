import requests from "./httpService";

const CustomerServices = {
  // getAllCustomers: async ({ searchText = "" }) => {
  //   return requests.get(`/all-users?searchText=${searchText}`);
  // },

  getAllCustomers: async () => {
    return requests.get(`/users/all-users`);
  },

  addAllCustomers: async (body) => {
    return requests.post("/customer/add/all", body);
  },
  // user create
  createCustomer: async (body) => {
    return requests.post(`/customer/create`, body);
  },

  filterCustomer: async (email) => {
    return requests.post(`/customer/filter/${email}`);
  },

  getCustomerById: async (id) => {
    return requests.get(`/customer/${id}`);
  },

  updateCustomer: async (id, body) => {
    return requests.put(`/customer/${id}`, body);
  },

  deleteCustomer: async (id) => {
    return requests.delete(`/users/delete/${id}`);
  },
};

export default CustomerServices;
