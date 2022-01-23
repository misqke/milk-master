import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import Milks from "./pages/Milks";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <div>
      <HashRouter>
        <Header />
        <div
          className="bg-dark"
          style={{ width: "100vw", minHeight: "calc(100vh - 100px)" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/order" element={<Order />} />
            <Route path="/milks" element={<Milks />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
