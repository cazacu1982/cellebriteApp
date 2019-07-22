'use strict';

const HTTP = require('http-status');
const Phone = require('../models/phones');
const Validators = require('../validators/validator');
const encrypter = require('object-encrypter');
const engine = encrypter('your secret', {ttl: false});


const getAllPhones = (req, res) => {
  Phone.find({}, 'action')
    .then(data => {
      //Proud off_________________________________________________________________________________
      let mappedMeta;
      mappedMeta = data.map(item => {
        const { meta: value, ...rest } = item.action;
        return { action: {meta: engine.decrypt(item.action.meta),  ...rest}, _id: item._id}
      });
      return mappedMeta;
    })
    .then(mappedMeta => res.status(HTTP.OK).jsonp({ message: 'Phones list', data: mappedMeta }))
    .catch(err => res.status(HTTP.BAD_REQUEST).jsonp({ error: err }));
};

const savePhone = (req, res) => {
  Validators.validateInput.addPhone(req)
    .then(response => {
      let json = {
        'phoneId': 'json meta data 1',
        'description': 'json meta data 2',
        'valid': 'json meta data 3',
        'tags': 'json meta data 4'
      };

      let meta = engine.encrypt(json);

      if(response){
        response.action.meta = meta;
        Phone.create(response)
          .then(data => {
            res.status(HTTP.OK).jsonp({ message: 'The phone was added', data: data });
          })
          .catch(err => console.info(err))
      } else {
        res.json({
          error: "The input fields are empty"
        })
      }
    })
    .catch(err => res.status(HTTP.BAD_REQUEST).jsonp({ error: err }));
};

const updatePhone = (req, res) => {
  Validators.validateInput.addPhone(req)
    .then(response => {
      if(response){
        Phone.updateOne({"_id": req.params.id}, {$set: {
          'action.type': response.action.type,
          'action.serial': response.action.serial,
          'action.color': response.action.color,
          'action.created': new Date(),
          }})
          .then(data => {
            res.status(HTTP.OK).jsonp({ message: 'The phone was updated', data: data });
          })
          .catch(err => console.info(err))
      } else {
        res.json({
          error: "The input fields are empty"
        })
      }
    })
    .catch(err => res.status(HTTP.BAD_REQUEST).jsonp({ error: err }));
};

const deletePhone = (req, res) => {
  Phone.findOneAndDelete({"_id": req.params.id})
    .then(() => {
      res.status(HTTP.OK).jsonp({ message: 'The phone was deleted', data: {} });
    })
    .catch(err => res.status(HTTP.BAD_REQUEST).jsonp({ error: err }));
};

module.exports = {
  getAllPhones,
  savePhone,
  updatePhone,
  deletePhone
};
