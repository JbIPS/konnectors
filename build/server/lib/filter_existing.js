// Generated by CoffeeScript 1.9.0
module.exports = function(log, model, suffix, vendor) {
  return function(requiredFields, entries, body, next) {
    entries.filtered = [];
    if ((vendor == null) && entries.fetched.length > 0) {
      vendor = entries.fetched[0].vendor;
    }
    return model.all(function(err, entryObjects) {
      var entry, entryHash, _i, _len;
      if (err) {
        return next(err);
      }
      entryHash = {};
      for (_i = 0, _len = entryObjects.length; _i < _len; _i++) {
        entry = entryObjects[_i];
        if (vendor != null) {
          if (entry.vendor === vendor) {
            entryHash[entry.date.toISOString()] = entry;
          }
        } else {
          entryHash[entry.date.toISOString()] = entry;
        }
      }
      entries.filtered = entries.fetched.filter(function(entry) {
        return entryHash[entry.date.toISOString()] == null;
      });
      return next();
    });
  };
};
