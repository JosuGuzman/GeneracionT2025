import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

type ReactionType = "like" | "heart" | "funny" | "wow" | "sad" | "angry";

export default function App() {
  const [reactions, setReactions] = useState({
    like: 0,
    heart: 0,
    funny: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });

  // Estado de comentarios
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [error, setError] = useState("");

  // 🔥 Estado para la lluvia de emojis
  const [rain, setRain] = useState<
    { id: number; emoji: string; left: number }[]
  >([]);

  // Manejo de clicks en reacciones
  const handleReaction = (type: ReactionType) => {
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    // Relacionar reacción con emoji
    const emojiMap: Record<ReactionType, string> = {
      like: "👍",
      heart: "❤️",
      funny: "😂",
      wow: "😲",
      sad: "😢",
      angry: "😡",
    };

    const selectedEmoji = emojiMap[type];

    // Generar lluvia de emojis (15 por reacción)
    const newRain = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      emoji: selectedEmoji,
      left: Math.random() * 100,
    }));

    setRain((prev) => [...prev, ...newRain]);

    // Limpiar después de 3s
    setTimeout(() => {
      setRain((prev) =>
        prev.filter((r) => !newRain.some((n) => n.id === r.id))
      );
    }, 3000);
  };

  // Manejo de comentarios
  const handleComment = () => {
    if (comment.trim().length === 0) {
      setError("⚠️ El comentario no puede estar vacío.");
      return;
    }
    if (comment.length > 40) {
      setError("⚠️ El comentario no puede superar los 40 caracteres.");
      return;
    }

    setComments([...comments, comment]);
    setComment("");
    setError("");
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">

        <img
          src="https://hips.hearstapps.com/hmg-prod/images/homer-meme-1547553537.gif?resize=640:*"
          alt="meme"
          className="rounded-xl w-full"/>

        <p className="mt-4 text-lg font-semibold">
          <b>Yo en la Vida, cada ves que me preguntan algo que dije que se, pero en realidad no se </b> 
        </p>


        <div className="flex justify-around mt-4 text-3xl">
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction("like")}>
            
            👍 {reactions.like}
          
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction("heart")}>
            
            ❤️ {reactions.heart}

          </motion.button>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction("funny")}>
            
            😂 {reactions.funny}

          </motion.button>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction("wow")} >
            
            😲 {reactions.wow}
          
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction("sad")} >
            
            😢 {reactions.sad}
          
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => handleReaction("angry")} >
            
            😡 {reactions.angry}
          
          </motion.button>

            {rain.map((r) => (
              <span
                key={r.id}
                className="emoji-rain"
                style={{ left: `${r.left}%` }}
              >
                {r.emoji}
              </span>
            ))}
            
        </div>

        <div className="mt-6">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribí tu comentario..."
            className="border p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"/>

          <button
            onClick={handleComment}
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition">
            Comentar
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="mt-4 text-left">
          <h3 className="font-semibold mb-2">Comentarios:</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay comentarios aún.</p>
          ) : (
            <ul className="space-y-1">
              {comments.map((c, i) => (
                <li
                  key={i}
                  className="bg-gray-100 p-2 rounded-lg shadow-sm text-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}