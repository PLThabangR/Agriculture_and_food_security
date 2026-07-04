import { api } from "./api";

export const marketService = {
  async getMarketTrends() {
    return api.get("/market/trends");
  }
};
