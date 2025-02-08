import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, CardContent, Typography, TextField, Select, MenuItem, Button, Box } from '@mui/material';

function App() {
  const [valorCambio, setValorCambio] = useState(null);
  const [monedaOrigen, setMonedaOrigen] = useState('COP');
  const [monedaDestino, setMonedaDestino] = useState('USD');
  const PesosCRef = useRef();
  const resultadoRef = useRef();

  useEffect(() => {
    const llamaApiCambio = async () => {
      try {
        const respuesta = await fetch(`https://v6.exchangerate-api.com/v6/9e84f6c074076b75919255b3/latest/${monedaOrigen}`);
        const datos = await respuesta.json();
        setValorCambio(datos.conversion_rates[monedaDestino]);
      } catch (error) {
        console.error("Error al acceder a la API: ", error);
      }
    };
    llamaApiCambio();
  }, [monedaOrigen, monedaDestino]);

  const calcular = () => {
    const pesosValor = parseFloat(PesosCRef.current.value);
    if (!isNaN(pesosValor)) {
      const monedaResultado = pesosValor * valorCambio;
      resultadoRef.current.innerHTML = monedaResultado.toFixed(2) + ` ${monedaDestino}`;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Conversor de Moneda
          </Typography>

          <Typography variant="body1">Moneda Origen:</Typography>
          <Select fullWidth value={monedaOrigen} onChange={(e) => setMonedaOrigen(e.target.value)}>
            <MenuItem value="COP">Peso colombiano</MenuItem>
            <MenuItem value="MXN">Peso mexicano</MenuItem>
            <MenuItem value="CLP">Peso chileno</MenuItem>
            <MenuItem value="USD">Dólar estadounidense</MenuItem>
            <MenuItem value="AUD">Dólar australiano</MenuItem>
            <MenuItem value="EUR">Euro</MenuItem>
            <MenuItem value="CHF">Franco suizo</MenuItem>
          </Select>

          <Typography variant="body1" mt={2}>Moneda Destino:</Typography>
          <Select fullWidth value={monedaDestino} onChange={(e) => setMonedaDestino(e.target.value)}>
            <MenuItem value="COP">Peso colombiano</MenuItem>
            <MenuItem value="MXN">Peso mexicano</MenuItem>
            <MenuItem value="CLP">Peso chileno</MenuItem>
            <MenuItem value="USD">Dólar estadounidense</MenuItem>
            <MenuItem value="AUD">Dólar australiano</MenuItem>
            <MenuItem value="EUR">Euro</MenuItem>
            <MenuItem value="CHF">Franco suizo</MenuItem>
          </Select>

          <TextField fullWidth label="Cantidad" type="number" inputRef={PesosCRef} sx={{ mt: 2 }} />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={calcular}>
            Convertir
          </Button>

          <Box ref={resultadoRef} sx={{ mt: 2, fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
