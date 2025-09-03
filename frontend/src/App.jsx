import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

function App() {
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
    show: false,
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, show: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Notification notification={notification} onDone={hideNotification} />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/add"
              element={<AddSchool showNotification={showNotification} />}
            />
            <Route
              path="/schools"
              element={<ShowSchools showNotification={showNotification} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
