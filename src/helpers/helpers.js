var moment = require('moment');
moment.locale('ru');

export default {
  _moment(date) {
    return moment(date);
  },

  _dateToUnix(date) {
    return parseInt((new Date(date).getTime() / 1000).toFixed(0));
  },

  _isEmptyObject(object) {
    for(var prop in object) {
      if(object.hasOwnProperty(prop)) return false;
    }
  return JSON.stringify(object) === JSON.stringify({});
  },

  _unixToHumanDate: function(epoch) {
    return moment(epoch * 1000).calendar();
  },

  _objToArr(obj) {
    let arr = Object.keys( obj ).map( (key) => obj[key] );
    return arr;
  },

  _priceFormat: function (number) {
    number = number.toString();
    number = typeof number != "undefined" && number > 0 ? number : "";
    number = number.replace(new RegExp("^(\\d{" + (number.length%3? number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    if(typeof _sep != "undefined" && _sep != " ") {
        number = number.replace(/\s/g, _sep);
    }
    return number;
  }
}