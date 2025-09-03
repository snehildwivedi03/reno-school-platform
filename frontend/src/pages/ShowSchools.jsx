// src/pages/ShowSchools.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/schools");
      setSchools(res.data || []);
    } catch (err) {
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Loader />
      </motion.div>
    );
  }

  return (
    <motion.div>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          All Schools
        </h2>

        {schools.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4 text-lg">
              No schools available yet.
            </p>
            <Link
              to="/add"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              ➕ Add a School
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:5000/uploads/school-Img/${school.image}`}
                  alt={school.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {school.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{school.address}</p>
                <p className="text-sm text-gray-600 mb-1">
                  {school.city}, {school.state}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  📞 {school.contact}
                </p>
                <p className="text-sm text-gray-600">📧 {school.email_id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
