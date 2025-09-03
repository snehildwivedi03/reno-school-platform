import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Notification({ notification, onDone }) {
  const { message, type, show } = notification;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDone();
      }, 3000); // Notification disappears after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const styles = {
    success: {
      bg: "bg-green-500",
      icon: <FaCheckCircle className="text-white text-xl" />,
    },
    error: {
      bg: "bg-red-500",
      icon: <FaTimesCircle className="text-white text-xl" />,
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-5 left-1/2 z-50 flex items-center gap-4 w-auto max-w-md p-4 rounded-lg shadow-lg text-white ${styles[type]?.bg}`}
        >
          {styles[type]?.icon}
          <p className="font-semibold">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
