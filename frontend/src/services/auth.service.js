import { api } from "./api";

export const authService = {
  async login(email, password) {
    return api.post("/auth/login", { email, password });
  },

  async register(fullName, email, password, role = "farmer") {
    const parts = fullName.trim().split(" ");
    const firstName = parts[0] || fullName;
    const lastName = parts.slice(1).join(" ") || "";

    return api.post("/auth/register", {
      email,
      password,
      firstName,
      lastName,
      role
    });
  },

  async getCurrentUser(email) {
    return api.get(`/auth/me?email=${encodeURIComponent(email || "")}`);
  }
};
