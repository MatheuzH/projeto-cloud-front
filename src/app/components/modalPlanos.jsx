// ModalPlanos.js
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const ModalPlanos = ({ isOpen, onRequestClose, planos, user, fetchUserData }) => {
  const [novoPlanoId, setNovoPlanoId] = useState("");

  const handleChangePlano = (event) => {
    setNovoPlanoId(event.target.value);
  };

  const handleSubmitTrocarPlano = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (token && user && user.id && novoPlanoId) {
        await axios.post(
          `http://localhost:8080/usuario/${user.id}/TrocarAssinatura/${user.assinatura[0].id}/${novoPlanoId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await fetchUserData(); // Atualiza os dados do usuário após a troca de plano
        onRequestClose(); // Fecha o modal após a troca de plano

        alert("Plano de assinatura alterado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao trocar plano de assinatura:", error);
      alert("Erro ao trocar plano de assinatura.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modalOverlay"
      contentLabel="Lista de Planos"
    >
      <h2>Escolha um Plano de Assinatura</h2>
      <form onSubmit={handleSubmitTrocarPlano}>
        <div className="formControl">
          <label htmlFor="planos">Planos Disponíveis:</label>
          <select id="planos" value={novoPlanoId} onChange={handleChangePlano}>
            <option value="">Selecione um plano...</option>
            {planos.map((plano) => (
              <option key={plano.id} value={plano.id}>
                {plano.nome} - R$ {plano.preco.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button">
          Trocar Plano
        </button>
        <button className="button" onClick={onRequestClose}>
          Fechar
        </button>
      </form>
    </Modal>
  );
};

export default ModalPlanos;
