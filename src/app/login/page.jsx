// src/app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://spotify-2.azurewebsites.net/usuario/login", 
        { email, senha },
      {
          headers: {
          "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
      );
      localStorage.setItem("token", response.data.token); // Armazena o token no localStorage
      router.push("/artistas"); // Redireciona para /artistas após o login
    } catch (error) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
          className="form-input"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
