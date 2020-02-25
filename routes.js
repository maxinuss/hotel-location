const bodyParser = require('body-parser');

function init(app, router) {
  app.use(bodyParser.json());
  routes(router);

  app.use('/api/v1', router);
}

function routes(router) {
  router.get('/health-check', async (req, res) => {
    const result = {
      status: 'OK',
      timestamp: Date.now()
    };

    res.status(200).json(result);
  });

  return router;
}

module.exports.init = init;