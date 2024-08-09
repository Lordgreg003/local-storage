import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Create from "./component/Create";
import ViewTodo from "./component/view";
import GetAllLocalStorage from "./component/GetAll";
import UpdateTodo from "./component/Update";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetAllLocalStorage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view/:id" element={<ViewTodo />} />
          <Route path="/update/:id" element={<UpdateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
