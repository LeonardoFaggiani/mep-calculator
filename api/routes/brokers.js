var express = require('express');
var router = express.Router();
var axios = require('axios')
const Broker = require('../domain/broker');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


router.get('api/', asyncMiddleware(async (req, res, next) => {
  var result = await getBondsFromBrokerGreaterThanFiftyOperations();
  res.json(result)
}));

async function getBondsFromBrokerGreaterThanFiftyOperations() {

  try {

    var broker = new Broker();

    const resp = await axios(broker.AxiosConfig);

    return broker.getBondsGreaterThanFiftyOperations(resp.data.data);

  }
  catch (err) {
    console.error(err);
  }

};

module.exports = router;
