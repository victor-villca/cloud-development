import { useState } from "react";
import { registerUser } from "../controllers/authController";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "artista" | "regular">("regular");
  const [image, setimage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      await registerUser(email, password, name, role, image);
    }
    navigate("/");
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "admin" | "artista" | "regular")
          }
        >
          <option value="artista">Artista</option>
          <option value="admin">Administrador</option>
          <option value="regular">Regular</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setimage(e.target.files?.[0] || null)}
          required
        />
        <button type="submit">Crear cuenta</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;
