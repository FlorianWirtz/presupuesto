"use client";
import React, { useState } from 'react';
import Error from './Errror';
import shortid from 'shortid';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
  const [nombre, guardarNombre] = useState('');
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  // cuando el usuario agrega un gasto
  const agregarGasto = e => {
    e.preventDefault();

    // validar
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
      guardarError(true);
      return;
    }

    guardarError(false);

    // construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    };

    console.log(gasto);

    // pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);

    // resetear el form
    guardarNombre('');
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aquí</h2>

      {error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" /> : null}

      <div className="campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={e => guardarNombre(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Cantidad Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad === 0 ? '' : cantidad}  // Controlar que el input no muestre 0
          onChange={e => {
            const value = parseInt(e.target.value, 10);
            guardarCantidad(isNaN(value) ? 0 : value);  // Controlar que no se asigne NaN
          }}
        />
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  );
};

export default Formulario;
