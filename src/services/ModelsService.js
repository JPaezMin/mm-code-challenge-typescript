import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async fetchModels() {
    return apiClient.get("/models");
  },
  async fetchModel(id) {
    return apiClient.get("/models/" + id);
  },
  async updateModel(model) {
    return apiClient.put(`/models/${model.id}`, model);
  },
};
