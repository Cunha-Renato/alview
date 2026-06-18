import { BrowserRouter, Route, Routes } from "react-router-dom";
import SortPage from "./routes/sort/Sort";
import SortPageAlgo from "./routes/sort/SortAlgo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sort" element={<SortPage />} />
        <Route path="/sort/:id" element={<SortPageAlgo />} />
      </Routes>
    </BrowserRouter>
  );
}