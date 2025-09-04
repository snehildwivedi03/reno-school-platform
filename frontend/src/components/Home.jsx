import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Reno School Platform
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add School
          </button>
          <button
            onClick={() => navigate("/schools")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            📋 Show Schools
          </button>
        </div>
      </div>
    </motion.div>
  );
}
