const bodyParser = require('body-parser');
const googlePlace = require('./src/models/GooglePlace');

const GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD;
const GOOGLE_MAPS_SEARCH_DEFAULT_TYPE = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_TYPE;

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
    const result = await googlePlace.getPlace(
        latLong,
        GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD,
        GOOGLE_MAPS_SEARCH_DEFAULT_TYPE
    );

    res.status(200).json(result);
  });

  return router;
}

module.exports.init = init;