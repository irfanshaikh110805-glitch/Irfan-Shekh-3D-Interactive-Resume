import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/react-app/pages/Home";

export default function App() {
  return (
    <Router basename="/Irfan-Shekh-3D-Interactive-Resume">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
