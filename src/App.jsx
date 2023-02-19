import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, Route, Routes } from "react-router-dom";
import Inicio from "./componentes/Inicio";
import Blog from "./componentes/Blog";
import Tienda from "./componentes/Tienda";
import Error404 from "./componentes/Error404";
import Carrito from "./componentes/Carrito";

const App = () => {
  const productos = [
    { id: 1, nombre: "Producto1" },
    { id: 2, nombre: "Producto2" },
    { id: 3, nombre: "Producto3" },
    { id: 4, nombre: "Producto4" },
  ];

  const [carrito, setCarrito] = useState([]);

  const agregarProductoAlCarrito = (idProductoAAgregar, nombre) => {
    /**
     * Si el carrito no tiene datos agregamos uno nuevo
     */
    if (carrito.length === 0) {
      setCarrito([{ id: idProductoAAgregar, nombre: nombre, cantidad: 1 }]);
    } else {
      /**
       * Si tiene datos
       *
       * Primero debemos revisar que el carrito no tenga ya el producto agregado anteriormente
       *
       * si ya lo tiene entonces debemos actualizar su cantidad
       *  para poder editar el arreglo debemos clonarlo
       */
      const nuevoCarrito = [...carrito];

      // comprobamos si el carrito ya tiene el ID del producto a agregar
      const yaEstaeEnCarrito =
        nuevoCarrito.filter(
          (productoDeCarrito) => productoDeCarrito.id === idProductoAAgregar
        ).length > 0;

      /**
       * si ya esta en el carrito entonces actualizamos su cantidad
       * buscando su posicion
       */
      if (yaEstaeEnCarrito) {
        /**
         * Para ello tenemos que buscarlo, obtner su posicion en el arrelgo
         * y en base a su posicion actualizar su valor
         */
        nuevoCarrito.forEach((productoDecarrito, index) => {
          if (productoDecarrito.id === idProductoAAgregar) {
            const cantidadNueva = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = {
              id: idProductoAAgregar,
              nombre: nombre,
              cantidad: cantidadNueva + 1,
            };
          }
        });
        // si no existe el producto en el carrito entonces lo agregamos
      } else {
        nuevoCarrito.push({
          id: idProductoAAgregar,
          nombre: nombre,
          cantidad: 1,
        });
      }

      //FInalmente actualizamos el carrito
      setCarrito(nuevoCarrito);
    }
  };

  const addToCart = (productId, producName) => {
    if (carrito.length === 0) {
      setCarrito([{ id: productId, name: producName, cantidad: 1 }]);
    } else {
      const prodcutoIndex = carrito.findIndex(
        (producto) => producto.id === productId
      );

      if (prodcutoIndex >= 0) {
        carrito[prodcutoIndex].cantidad++;
        setCarrito([...carrito]);
      } else {
        setCarrito([
          ...carrito,
          { id: productId, nombre: producName, cantidad: 1 },
        ]);
      }
    }
  };

  const addToCarrito = (producto) => {
    const carritoModificado = [...carrito];
    const yaEstaEnCarrito =
      carrito.filter((item) => item.id === producto.id).length === 0;

    if (yaEstaEnCarrito)
      setCarrito([...carritoModificado, { ...producto, cantidad: 1 }]);
    else {
      carritoModificado.forEach((item, index) => {
        if (item.id === producto.id)
          carritoModificado[index] = { ...item, cantidad: item.cantidad + 1 };
      });
      setCarrito(carritoModificado);
    }
  };

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>
      <main>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/tienda"
            element={
              <Tienda
                productos={productos}
                agregarProductoAlCarrito={agregarProductoAlCarrito}
                addToCart={addToCart}
                addToCarrito={addToCarrito}
              />
            }
          />
        </Routes>
      </main>
      <aside>
        <Carrito carrito={carrito} />
      </aside>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  max-width: 1000px;
  padding: 40px;
  width: 90%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
  background: #fff;
  margin: 40px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
  width: 100%;
  text-align: center;
  background: #092c4c;
  grid-column: span 2;
  border-radius: 3px;

  a {
    color: #fff;
    display: inline-block;
    padding: 15px 20px;
  }

  a:hover {
    background: #1d85e8;
    text-decoration: none;
  }
`;

export default App;
