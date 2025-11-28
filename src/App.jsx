import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import WeatherDetail from "./pages/WeatherDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/weather/:city" element={<WeatherDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
