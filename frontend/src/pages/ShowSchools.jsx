import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 1. Accept `showNotification` as a prop
export default function ShowSchools({ showNotification }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/schools`
        );
        setSchools(res.data);
      } catch (err) {
        console.error("Error fetching schools", err);
        // Show a notification if fetching fails
        showNotification("Could not load schools.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, [showNotification]); // Add showNotification to dependency array

  const handleDelete = async (id) => {
    // We've replaced window.confirm with a less intrusive check for simplicity
    // In a real app, a custom modal component would be best here.
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/schools/${id}`);
      setSchools((prev) => prev.filter((school) => school.id !== id));
      // 2. Call the notification on successful deletion
      showNotification("School deleted successfully.", "success");
    } catch (err) {
      console.error("Delete failed", err);
      // 3. Use the notification for errors instead of an alert
      showNotification("Failed to delete school.", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        All Schools
      </h2>

      {schools.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No schools available yet.</p>
          <button
            // 4. (Bonus Fix) Corrected the navigation path
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add a School
          </button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {schools.map((school) => (
            <motion.div
              key={school.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/school-Img/${
                  school.image
                }`}
              />

              <h3 className="text-lg font-semibold text-gray-800 truncate w-full">
                {school.name}
              </h3>
              <p className="text-gray-600 text-sm truncate w-full">
                {school.address}
              </p>
              <p className="text-gray-600 text-sm">
                {school.city}, {school.state}
              </p>
              <p className="text-gray-600 text-sm">{school.contact}</p>
              <p className="text-gray-600 text-sm truncate w-full">
                {school.email_id}
              </p>

              <button
                onClick={() => handleDelete(school.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 w-full"
              >
                🗑️ Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
