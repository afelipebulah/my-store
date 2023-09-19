const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const validatorHandler = require('./middlewares/validator.handler');

const app = express();
const port = 3000;

//Se define el puerto de la aplicación
app.listen(port, () => {
  console.log(`application listening on port: ${port}`);
});

app.get('/api',
  (req, res) => {
    res.status(200).send("<h1>Welcome to site: here using <code>express.js</code> for implementation an <code>/api</code> demo of <code>/products</code></h1>");
  });

//Se define middleware nativo de express para procesar .json en peticione POST/PATCH
app.use(express.json());
app.use(cors());

routerApi(app);

//Se define el uso de los middlewares para manejo de errores después del routing
app.use(logErrors);
app.use(validatorHandler);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);