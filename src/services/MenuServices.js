import requests from "./httpService";

const MenuServices = {
  getAllMenus: async () => {
    return requests.get("/menus/");
  },

  getMenuById: async (id) => {
    return requests.get(`/menus/${id}`);
  },

  addMenu: async (body) => {
    return requests.post("/menus/add", body);
  },

  updateMenu: async (id, body) => {
    return requests.put(`/menus/${id}`, body);
  },

  updateMenuStatus: async (id, body) => {
    return requests.put(`/menus/status/${id}`, body);
  },

  deleteMenu: async (id) => {
    return requests.delete(`/menus/${id}`);
  },

  deleteManyMenus: async (body) => {
    return requests.patch("/menus/delete/many", body);
  },

  getProductByMenu: async (menuId) => {
    return requests.get(`/menus/products/${menuId}`);
  },
};

export default MenuServices; 