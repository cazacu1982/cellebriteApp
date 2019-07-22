const express = require ('express');
const router = express.Router();
const swagger = require('swagger-express-middleware');
const Middleware = swagger.Middleware;
const swaggerMiddleware = new Middleware(router);

const phonesRoutes = require('../controller/phonesRoutes');

swaggerMiddleware.init('swagger.yaml', () => {

  ////// API ROUTES //////
  router.get('/phones', phonesRoutes.getAllPhones);
  router.post('/phone', phonesRoutes.savePhone);
  router.put('/phones/:id', phonesRoutes.updatePhone);
  router.delete('/phone/:id', phonesRoutes.deletePhone);
});

module.exports = router;
