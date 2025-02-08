import './App.css';
import { useRef, useState, useEffect } from 'react';

function App() {
  const [valorCambio, setValorCambio] = useState(null);
  const [monedaOrigen, setMonedaOrigen] = useState("COP");
  const [monedaDestino, setMonedaDestino] = useState("USD");

  const cantidadRef = useRef();
  const resultadoRef = useRef();

  useEffect(() => {
    const llamaApiCambio = async () => {
      try {
        const respuesta = await fetch(`https://v6.exchangerate-api.com/v6/9e84f6c074076b75919255b3/latest/${monedaOrigen}`);
        const datos = await respuesta.json();
        setValorCambio(datos.conversion_rates[monedaDestino]);
      } catch (error) {
        console.error("Error al acceder a la API:", error);
      }
    };
    llamaApiCambio();
  }, [monedaOrigen, monedaDestino]);

  const calcular = () => {
    const cantidad = parseFloat(cantidadRef.current.value);
    if (!isNaN(cantidad) && valorCambio) {
      const resultado = cantidad * valorCambio;
      resultadoRef.current.innerHTML = `${resultado.toFixed(2)} ${monedaDestino}`;
    } else {
      resultadoRef.current.innerHTML = "Introduce un valor válido";
    }
  };

  return (
    <div className="container">
      <h1>Conversor de Moneda</h1>

      <label htmlFor="monedaOrigen">Moneda Origen:</label>
      <select id="monedaOrigen" value={monedaOrigen} onChange={(e) => setMonedaOrigen(e.target.value)}>
        <option value="COP">Peso colombiano</option>
        <option value="MXN">Peso mexicano</option>
        <option value="CLP">Peso chileno</option>
        <option value="USD">Dólar estadounidense</option>
        <option value="AUD">Dólar australiano</option>
        <option value="EUR">Euro</option>
        <option value="CHF">Franco suizo</option>
      </select>

      <label htmlFor="monedaDestino">Moneda Destino:</label>
      <select id="monedaDestino" value={monedaDestino} onChange={(e) => setMonedaDestino(e.target.value)}>
        <option value="COP">Peso colombiano</option>
        <option value="MXN">Peso mexicano</option>
        <option value="CLP">Peso chileno</option>
        <option value="USD">Dólar estadounidense</option>
        <option value="AUD">Dólar australiano</option>
        <option value="EUR">Euro</option>
        <option value="CHF">Franco suizo</option>
      </select>

      <label htmlFor="cantidad">Cantidad:</label>
      <input type="number" id="cantidad" ref={cantidadRef} placeholder="Introduce la cantidad" className="centrarElementos" />

      <button className="centrarElementos" onClick={calcular}>Convertir</button>

      <div className="centrarElementos resultado" ref={resultadoRef}></div>
    </div>
  );
}

export default App;
