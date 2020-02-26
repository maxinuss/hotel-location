const bodyParser = require('body-parser');
const googlePlace = require('./src/models/GooglePlace');

const DEFAULT_KEYWORD = 'hotel';
const DEFAULT_TYPE = 'lodging';

function init(app, router) {
  app.use(bodyParser.json());
  routes(router);

  app.use('/api/', router);
}

function routes(router) {
  router.get('/health-check', async (req, res) => {
    const result = {
      status: 'OK',
      timestamp: Date.now()
    };

    res.status(200).json(result);
  });

  router.get('/properties', async (req, res) => {
    const latLong = req.query.at;
    const result = await googlePlace.getPlace(latLong, DEFAULT_KEYWORD, DEFAULT_TYPE);

    res.status(200).json(result);
  });

  return router;
}

module.exports.init = init;