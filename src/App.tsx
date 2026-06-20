import { BrowserRouter, Route, Routes } from "react-router-dom";
import SortPage from "./pages/Sort/Sort";
import SortPageAlgo from "./pages/Sort/SortAlgo";
import HomePage from "./pages/Home/Home";
import Navbar from "./components/NavBar/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sort" element={<SortPage />} />
        <Route path="/sort/visualize" element={<SortPageAlgo />} />
      </Routes>
    </BrowserRouter>
  );
}