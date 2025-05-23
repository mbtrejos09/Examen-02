import React from "react";
import Encabezado from "./Encabezado";

const Layout = () => {
  return (
    <div className="layout">
      <Encabezado />
      <main className="contenido-principal">test desde main</main>
    </div>
  );
};

export default Layout;
