import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Advertisement from "../components/Advertisement";
import { motion } from "framer-motion";

export default function AddSchool({ showNotification }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const imageFile = watch("image");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/schools`, formData);

      reset();
      showNotification("School added successfully!", "success");

      setTimeout(() => {
        navigate("/schools");
      }, 1500);
    } catch (error) {
      if (error.response?.status === 409 && error.response?.data?.error) {
        showNotification(error.response.data.error, "error");
      } else {
        // For all other errors, show a generic message
        showNotification("Failed to add school. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hidden md:flex w-1/4 items-center justify-center p-4">
        <Advertisement side="left" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Add a New School
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {[
              { id: "name", label: "School Name", type: "text" },
              { id: "address", label: "Address", type: "text" },
              { id: "city", label: "City", type: "text" },
              { id: "state", label: "State", type: "text" },
              { id: "contact", label: "Contact", type: "text" },
              { id: "email_id", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-gray-700 mb-1.5 font-medium"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  {...register(field.id, {
                    required: `${field.label} is required`,
                  })}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md transition-shadow duration-300"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {errors[field.id] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[field.id].message}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label
                htmlFor="imageUpload"
                className="block text-gray-700 mb-1.5 font-medium"
              >
                Upload Image
              </label>
              <div className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 hover:border-blue-400 hover:bg-gray-100 cursor-pointer transition-colors">
                <FaUpload className="text-blue-500" />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer text-gray-600 flex-1 truncate"
                >
                  {imageFile && imageFile.length > 0
                    ? imageFile[0].name
                    : "Choose file"}
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className="hidden"
                />
              </div>
              {errors.image && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out flex justify-center items-center font-bold text-lg shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Add School"
              )}
            </button>
          </form>
        </motion.div>
      </div>
      <div className="hidden md:flex w-1/4 items-center justify-center p-4">
        <Advertisement side="right" />
      </div>
    </motion.div>
  );
}
