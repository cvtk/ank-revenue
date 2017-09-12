import firebase from '../firebase.js';

const revenueRef = firebase.database().ref('revenue');
const model = {
  created: 'date',
  price: 'int',
  commission: 'int',
  communal_included: 'bool',
  key: 'text',
  partner: 'text',
  employee: 'text',
  city: 'object',
  street: 'object',
  building: 'object',
  room: 'text'
}

function _each(object, callback) {
  Object.keys(object).map(function(key, index) {
    return callback(object[key], key, index);
  });
}

function _isDate(value) {
  let date = new Date(value);
  return !isNaN(date.getDate());
}

function _toUnix(date) {
  return parseInt((new Date(date).getTime() / 1000).toFixed(0));
}

function _isInt(value) {
  if ( isNaN(value) ) {
    return false;
  }
  let x = parseFloat(value);
  return (x | 0) === x;
}

function _isBool(value) {
  return typeof(value) === 'boolean' || ( value == 'true' || value == 'false' );
}

function _toBool(value) {
  if ( typeof(value) !== 'boolean' ) return value == 'true'
  else return value;
}

function _validate(value, type) {
  switch(type) {
    case 'date': return _isDate(value); break;
    case 'int': return _isInt(value); break;
    case 'bool': return _isBool(value); break;
    default: return true;
  }
}

export default {
  revenue: {
    check: function(object) {
      let log = [];
      if ( typeof object === 'undefined' )
        return false;
      _each( model, (type, property) => {
        if ( property in object ) {
          _validate(object[property], type) ||
            log.push('Property ' + property + ' type error');
        } else log.push('Property ' + property + ' doesn\'t exist');
      });
      return ( log.length > 0 )? log: true;
    },

    save: function(data) {
      let sale = {}, checkResult = this.check(data);
      if ( checkResult === true ) {
        _each( data, (value, key) => {
          let tmp = {};
          if ( key in model ) {
            if ( model[key] === 'int' ) sale[key] = parseInt(value, 10)
            else if ( model[key] === 'bool' ) sale[key] = _toBool(value)
            else if ( model[key] === 'date' ) sale[key] = _toUnix(value)
            else sale[key] = value;
          }
        })
        if ( !sale.key ) {
          sale.key = revenueRef.push().key;
        }
        return revenueRef.child(sale.key).update(sale);
 
      } else return checkResult;
    }
  }
}