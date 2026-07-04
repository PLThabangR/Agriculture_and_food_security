import { api } from "./api";

export const scannerService = {
  async getScanHistory() {
    return api.get("/scanner/history");
  },

  async scanCrop(file, cropName = "Maize") {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("cropName", cropName);
    return api.post("/scanner/scan", formData);
  }
};
