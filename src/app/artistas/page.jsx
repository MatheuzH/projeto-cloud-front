"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./artistas.css";
import withAuth from "../withAuth";
import Header from "../components/Header";

const Artistas = () => {
  const [bandas, setBandas] = useState([]);
  const [filteredBandas, setFilteredBandas] = useState([]); // Estado para as bandas filtradas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBandaId, setSelectedBandaId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/usuario/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
    };

    const fetchBandas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/banda", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBandas(response.data);
        setFilteredBandas(response.data); // Inicializa as bandas filtradas
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar bandas:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
    };

    fetchUserData();
    fetchBandas();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const openModal = (bandaId) => {
    setSelectedBandaId(bandaId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMusicaAdded = (novaMusica) => {
    setBandas((prevBandas) =>
      prevBandas.map((banda) =>
        banda.id === selectedBandaId
          ? { ...banda, musicas: [...banda.musicas, novaMusica] }
          : banda
      )
    );
    setFilteredBandas((prevBandas) =>
      prevBandas.map((banda) =>
        banda.id === selectedBandaId
          ? { ...banda, musicas: [...banda.musicas, novaMusica] }
          : banda
      )
    );
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredBandas(bandas); // Mostra todas as bandas se o campo de pesquisa estiver vazio
    } else {
      const filtered = bandas.filter((banda) =>
        banda.nome.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBandas(filtered);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="mainContainer">
      <Header user={user} onLogout={handleLogout} />
      <div className="contentContainer">
        <h1 className="title">Artistas</h1>
        <input
          type="text"
          placeholder="Pesquisar bandas"
          value={searchTerm}
          onChange={handleSearchChange}
          className="searchInput"
        />
        <div className="cardContainer">
          {filteredBandas.map((banda) => (
            <div key={banda.id} className="card">
              <img src={banda.imagem} alt={banda.nome} className="cardImage" />
              <div className="cardContent">
                <h2 className="cardTitle">{banda.nome}</h2>
                <p className="cardDescription">{banda.descricao}</p>
                <a href={`/musicas/${banda.id}`} className="button">
                  Ver músicas
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Artistas);
