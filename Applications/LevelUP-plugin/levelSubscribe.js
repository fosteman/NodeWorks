
module.exports = function levelSubscribe (db) {
    //receive notification if a certain pattern is put into db.
    //augmentation pattern (attaching the subscribe method)
  db.subscribe = (pattern, listener) => {
      db.on('put', (key, value) => {
          const match = Object.keys(pattern).every(
              _k => (pattern[_k] === val[_k])
          );
          if (match) listener(key, value);
      });
  };
  return db;
};
