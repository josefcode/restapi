let fs = require("fs");

const FILE_NAME = "./assets/pies.json";

let pieRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },

  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data).find((p) => p.id == id);
        resolve(pie);
      }
    });
  },

  search: (searchObj, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data);
        if (searchObj) {
          pie = pie.filter(
            (p) =>
              (searchObj.id ? p.id == searchObj.id : true) &&
              (searchObj.name
                ? p.name.toLowerCase().indexOf(searchObj.name.toLowerCase()) >=
                  0
                : true)
          );
        }
        resolve(pie);
      }
    });
  },
};

module.exports = pieRepo;
