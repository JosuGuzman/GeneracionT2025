import { useState, useEffect } from "react";

export default function App() {
  const [people, setPeople] = useState([]); // lista de personajes
  const [selectedUrl, setSelectedUrl] = useState(""); // url del personaje elegido
  const [character, setCharacter] = useState(null); // detalle del personaje

  const [apodo, setApodo] = useState("");
  const [favorito, setFavorito] = useState(false);
  const [ficha, setFicha] = useState(null); // resumen final

  useEffect(() => {
    fetch("https://swapi.dev/api/people/?page=1")
      .then((res) => res.json())
      .then((data) => setPeople(data.results))
      .catch((err) => console.error("Error cargando personajes:", err));
  }, []);

  useEffect(() => {
    if (!selectedUrl) return;
    fetch(selectedUrl)
      .then((res) => res.json())
      .then((data) => setCharacter(data))
      .catch((err) => console.error("Error cargando personaje:", err));
  }, [selectedUrl]);

  const handleGuardar = () => {
    if (apodo.trim().length < 2) {
      alert("El apodo debe tener al menos 2 caracteres.");
      return;
    }
    if (!character) return;
    setFicha({
      name: character.name,
      height: character.height,
      birth_year: character.birth_year,
      apodo,
      favorito,
    });

    localStorage.setItem(
      "fichaGalactica",
      JSON.stringify({
        name: character.name,
        height: character.height,
        birth_year: character.birth_year,
        apodo,
        favorito,
      })
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem("fichaGalactica");
    if (saved) setFicha(JSON.parse(saved));
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">📜 Ficha Galáctica</h1>

      <label className="block mb-2">
        Selecciona un personaje:
        <select
          className="block w-full border p-2 mt-1"
          onChange={(e) => setSelectedUrl(e.target.value)}
        >
          <option value="">-- Elige uno --</option>
          {people.map((p, idx) => (
            <option key={idx} value={p.url}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <div className="border rounded p-3 my-3 bg-gray-50">
        {character ? (
          <>
            <p><strong>Nombre:</strong> {character.name}</p>
            <p><strong>Altura:</strong> {character.height} cm</p>
            <p><strong>Nacimiento:</strong> {character.birth_year}</p>
          </>
        ) : (
          <p className="italic text-gray-500">Selecciona un personaje...</p>
        )}
      </div>

      {/* Formulario */}
      <div className="space-y-2">
        <label className="block">
          Apodo en tu ficha:
          <input
            type="text"
            className="block w-full border p-2 mt-1"
            value={apodo}
            onChange={(e) => setApodo(e.target.value)}
          />
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={favorito}
            onChange={(e) => setFavorito(e.target.checked)}
          />
          <span>¿Es tu favorito?</span>
        </label>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleGuardar}
          disabled={!character}
        >
          Guardar ficha
        </button>
      </div>

      {ficha && (
        <div className="mt-4 border rounded p-3 bg-green-50">
          <h2 className="font-bold">✨ Tu Ficha Galáctica</h2>
          <p><strong>Nombre oficial:</strong> {ficha.name}</p>
          <p><strong>Altura:</strong> {ficha.height} cm</p>
          <p><strong>Nacimiento:</strong> {ficha.birth_year}</p>
          <p><strong>Apodo:</strong> {ficha.apodo}</p>
          <p><strong>Favorito:</strong> {ficha.favorito ? "Sí" : "No"}</p>
        </div>
      )}
    </div>
  );
}