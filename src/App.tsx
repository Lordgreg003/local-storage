import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Create from "./component/Create";
import ViewTodo from "./component/Create";
import GetAllLocalStorage from "./component/GetAll";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetAllLocalStorage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view:id" element={<ViewTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
