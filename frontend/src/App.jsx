import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "../src/pages/Dashboard";
import Products from "../src/pages/Products";
import Analytics from "../src/pages/Analytics";
import Scraper from "../src/pages/Scraper";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/scraper" element={<Scraper />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;