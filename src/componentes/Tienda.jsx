import React from "react";
import Productos from "./Productos";

const Tienda = ({
  productos,
  agregarProductoAlCarrito,
  addToCart,
  addToCarrito,
}) => {
  return (
    <div>
      Tienda
      <Productos
        productos={productos}
        agregarProductoAlCarrito={agregarProductoAlCarrito}
        addToCart={addToCart}
        addToCarrito={addToCarrito}
      />
    </div>
  );
};

export default Tienda;
