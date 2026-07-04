/**
 * Local persistence layer using Dexie (IndexedDB wrapper).
 *
 * The app ships without a live backend, so authentication and user
 * records are stored locally in the browser instead of a remote server.
 * This keeps Login / Sign Up fully functional out of the box.
 */
import Dexie from "dexie";

export const db = new Dexie("AgriGrowDB");

db.version(1).stores({
  // ++id = auto-incrementing primary key, email indexed for fast lookup
  users: "++id, email",
});

// Seeds a demo account matching the pre-filled credentials shown on the
// Login screen (farmer@agrigrow.africa / password) so a first-time visitor
// can log in immediately without registering.
export async function seedDemoUser() {
  const existing = await db.users.get({ email: "farmer@agrigrow.africa" });
  if (!existing) {
    await db.users.add({
      email: "farmer@agrigrow.africa",
      password: "password",
      firstName: "Thabo",
      lastName: "Nkosi",
      role: "farmer",
      profileImage: "https://i.pravatar.cc/80?img=11",
    });
  }
}
