"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./cadastro.css";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://spotify-2.azurewebsites.net/usuario`, {
        nome,
        email,
        senha,
      });
      if (response.status === 201) {
        setMensagem("Usuário cadastrado com sucesso!");
        setTimeout(() => router.push("/"), 2000); // Redireciona após 2 segundos
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setMensagem("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="cadastrar-container">
      <h1 className="cadastrar-title">Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} className="cadastrar-form">
        <div className="form-group">
          <label className="form-label">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="cadastrar-button">
          Cadastrar
        </button>
        <button className="cadastrar-button" onClick={() => router.back()}>
        Voltar
      </button>
      </form>
      {mensagem && <p className="cadastrar-message">{mensagem}</p>}
    </div>
  );
}
