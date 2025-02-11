import { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Select from "react-select";

function App() {
  const opcionesMonedas = [
    { value: "COP", label: "Peso colombiano", img: "https://flagcdn.com/w40/co.png" },
    { value: "MXN", label: "Peso mexicano", img: "https://flagcdn.com/w40/mx.png" },
    { value: "CLP", label: "Peso chileno", img: "https://flagcdn.com/w40/cl.png" },
    { value: "USD", label: "Dólar estadounidense", img: "https://flagcdn.com/w40/us.png" },
    { value: "AUD", label: "Dólar australiano", img: "https://flagcdn.com/w40/au.png" },
    { value: "EUR", label: "Euro", img: "https://flagcdn.com/w40/eu.png" },
    { value: "CHF", label: "Franco suizo", img: "https://flagcdn.com/w40/ch.png" },
  ];

  const [valorCambio, setValorCambio] = useState(null);
  const [monedaOrigen, setMonedaOrigen] = useState("COP");
  const [monedaDestino, setMonedaDestino] = useState("USD");
  const [modoOscuro, setModoOscuro] = useState(true);
  const [cantidad, setCantidad] = useState("");
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
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="d-flex justify-content-center mb-3">
          <h1>Conversor de Divisas en Tiempo Real</h1>
        </div>

        <div className="card p-4 shadow col-md-4 col-sm-12">
          {/* Botón de modo oscuro/claro */}
          <button
            className={`btn ${modoOscuro ? "btn-light" : "btn-dark"}`}
            onClick={() => setModoOscuro(!modoOscuro)}
          >
            {modoOscuro ? "Modo Claro" : "Modo Oscuro"}
          </button>

          {/* Select de moneda origen */}
          <div className="mb-4">
            <label htmlFor="monedaOrigen" className="form-label">Moneda Origen:</label>
            <Select
              options={opcionesMonedas}
              value={opcionesMonedas.find(option => option.value === monedaOrigen)}
              onChange={(selectedOption) => setMonedaOrigen(selectedOption.value)}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={e.img} alt="" style={{ width: 24, height: 16, marginRight: 10 }} />
                  {e.label}
                </div>
              )}
            />
          </div>

          {/* Input de cantidad */}
          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              className="form-control"
              placeholder="Introduce la cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          {/* Select de moneda destino */}
          <div className="mb-3">
            <label htmlFor="monedaDestino" className="form-label">Moneda Destino:</label>
            <Select
              options={opcionesMonedas}
              value={opcionesMonedas.find(option => option.value === monedaDestino)}
              onChange={(selectedOption) => setMonedaDestino(selectedOption.value)}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={e.img} alt="" style={{ width: 24, height: 16, marginRight: 10 }} />
                  {e.label}
                </div>
              )}
            />
          </div>

          {/* Resultado */}
          <div className="mt-3 p-3 text-center bg-info text-white rounded" ref={resultadoRef}></div>
        </div>
      </div>

      {/* Carrusel de consejos */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 col-sm-12 mb-4">
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner text-center bg-light text-dark p-3 rounded shadow">
              <div className="carousel-item active">
                <p>💡 Ahorra al menos el 10% de tus ingresos cada mes.</p>
              </div>
              <div className="carousel-item">
                <p>📈 Aplica la regla 50/30/20: 50% necesidades, 30% deseos y 20% ahorro/inversión.</p>
              </div>
              <div className="carousel-item">
                <p>🏦 Crea un fondo de emergencia con al menos 3 a 6 meses de gastos.</p>
              </div>
            </div>
            {/* Botones de navegación */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>

          </div>
          <p className="py-3"><em>Desarrollado por -🦅 Alejandro J.</em></p>
        </div>
      </div>



    </div>
  );
}

export default App;