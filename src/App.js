import { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [valorCambio, setValorCambio] = useState(null);
  const [monedaOrigen, setMonedaOrigen] = useState("COP");
  const [monedaDestino, setMonedaDestino] = useState("USD");
  const [modoOscuro, setModoOscuro] = useState(true);
  const [cantidad, setCantidad] = useState(""); // Estado para la cantidad
  const resultadoRef = useRef();

  useEffect(() => {
    const llamaApiCambio = async () => {
      try {
        const respuesta = await fetch(
          `https://v6.exchangerate-api.com/v6/9e84f6c074076b75919255b3/latest/${monedaOrigen}`
        );
        const datos = await respuesta.json();
        setValorCambio(datos.conversion_rates[monedaDestino]);
      } catch (error) {
        console.error("Error al acceder a la API:", error);
      }
    };
    llamaApiCambio();
  }, [monedaOrigen, monedaDestino]);

  // ✅ Modo oscuro/claro
  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, [modoOscuro]);

  // ✅ Calcular conversión automáticamente cuando cambia la cantidad
  useEffect(() => {
    calcular();
  }, [cantidad, valorCambio, monedaDestino]);

  const calcular = () => {
    const cantidadNumerica = parseFloat(cantidad);
    if (!isNaN(cantidadNumerica) && valorCambio) {
      const resultado = cantidadNumerica * valorCambio;
      resultadoRef.current.innerHTML = `${resultado.toFixed(2)} ${monedaDestino}`;
    } else {
      resultadoRef.current.innerHTML = "Introduce un valor válido";
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="d-flex justify-content-center mb-3">
          <h1>Conversor de Moneda</h1>
        </div>

        <div className="card p-4 shadow col-4 d-flex ">
          {/* Botón de modo oscuro/claro */}
          <button
            className={`btn ${modoOscuro ? "btn-light" : "btn-dark"}`}
            onClick={() => setModoOscuro(!modoOscuro)}
          >
            {modoOscuro ? "Modo Claro" : "Modo Oscuro"}
          </button>

          <div className="mb-4">
            <label htmlFor="monedaOrigen" className="form-label">
              Moneda Origen:
            </label>
            <select
              id="monedaOrigen"
              className="form-select"
              value={monedaOrigen}
              onChange={(e) => setMonedaOrigen(e.target.value)}
            >
              <option value="COP">Peso colombiano</option>
              <option value="MXN">Peso mexicano</option>
              <option value="CLP">Peso chileno</option>
              <option value="USD">Dólar estadounidense</option>
              <option value="AUD">Dólar australiano</option>
              <option value="EUR">Euro</option>
              <option value="CHF">Franco suizo</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">
              Cantidad:
            </label>
            <input
              type="number"
              id="cantidad"
              className="form-control"
              placeholder="Introduce la cantidad"
              value={cantidad} // Controlado por estado
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="monedaDestino" className="form-label">
              Moneda Destino:
            </label>
            <select
              id="monedaDestino"
              className="form-select"
              value={monedaDestino}
              onChange={(e) => setMonedaDestino(e.target.value)}
            >
              <option value="COP">🗽Peso colombiano</option>
              <option value="MXN">Peso mexicano</option>
              <option value="CLP">Peso chileno</option>
              <option value="USD">Dólar estadounidense</option>
              <option value="AUD">Dólar australiano</option>
              <option value="EUR">Euro</option>
              <option value="CHF">Franco suizo</option>
            </select>
          </div>

          <div className="mt-3 p-3 text-center bg-primary text-white rounded" ref={resultadoRef}></div>
        </div>





      </div>


      <div className="container col-3 py-5 consejos">
        <p>LOREM</p>

      </div>



    </div>
  );
}

export default App;
