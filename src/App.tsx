import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/Login";
import ExamPage from "../src/pages/ExamPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/exam" element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  );
}
