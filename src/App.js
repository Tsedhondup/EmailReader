import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<WareHouse />} />
          <Route path="/warehouses/:id" element={<WareHouseDetailPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
