export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "artista" | "regular";
  image: string;
}
