import { BrowserRouter, Route, Routes } from "react-router-dom";
import SortPageAlgo from "./pages/Sort/SortAlgo";
import HomePage from "./pages/Home/Home";
import Navbar from "./components/NavBar/NavBar";
import AlgosInfoPage from "./pages/AlgosInfo/AlgosInfo";
import { SEARCH_INFO_DATA, SORT_INFO_DATA } from "./pages/AlgosInfo/Algos";
import SearchPageAlgo from "./pages/Search/SearchAlgo";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sort" element={<AlgosInfoPage algo_type={SORT_INFO_DATA} />} />
        <Route path="/sort/visualize" element={<SortPageAlgo />} />
        <Route path="/search" element={<AlgosInfoPage algo_type={SEARCH_INFO_DATA} />} />
        <Route path="/search/visualize" element={<SearchPageAlgo />} />
      </Routes>
    </BrowserRouter>
  );
}