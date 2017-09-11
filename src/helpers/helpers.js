export default {
  _dateToUnix(date) {
    return parseInt((new Date(date).getTime() / 1000).toFixed(0));
  },

  _isEmptyObject(object) {
    for(var prop in object) {
      if(object.hasOwnProperty(prop)) return false;
    }
  return JSON.stringify(object) === JSON.stringify({});
  }
}