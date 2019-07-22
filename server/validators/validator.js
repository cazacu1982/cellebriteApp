'use strict';

const HTTP = require('http-status');

const validateInput = {
  addPhone: (req) => {
    if (!req.body || !req.body.action) return Promise.reject(HTTP.BAD_REQUEST);
    else {
      return Promise.resolve(req.body);
    }
  }
};

module.exports = {
  validateInput
};
