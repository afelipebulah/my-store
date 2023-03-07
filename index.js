const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola esta es un instancia de un server express js!');
})

app.get('/bienvenido', (req, res) => {
    res.json({
        "nombre": "Felipe",
        "apellido": "Bula"
    });
})

app.listen(port, () => {
  console.log(`La app de ejemplo esta escuchando por el puerto ${port}`);
})