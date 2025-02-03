import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import "./App.css";
import Alumnos from "./pages/alumnos/Alumnos";
import CrearAlumno from "./pages/crear-alumno/CrearAlumno";
import Cursos from "./pages/cursos/Cursos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/alumnos" element={<Alumnos />}></Route>
            <Route path="/crear-alumno" element={<CrearAlumno />}></Route>
            <Route path="/cursos" element={<Cursos />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
