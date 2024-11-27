import Navbar from "./components/Navbar";
import Poster from "./components/Poster";
import Sections from "./components/Sections";
import Seats from "./components/Seats";
import OrderCompleted from "./components/OrderCompleted";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Poster />} />
        <Route path="/sessoes/:movieId" element={<Sections />} />
        <Route path="/assentos/:idSession" element={<Seats />} />
        <Route path="/sucesso" element={<OrderCompleted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
