const express = require("express");
const app = express();
// let pieRepo = require("./repos/pieRepo");
const port = 2000;

let router = express.Router();

router.get("/", (req, res, next) => {
  pieRepo.get(
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statustext: "OK",
          message: "All pies retrieved.",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statustext: "Not Found",
          message: "The pie could not be found.",
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

router.get("/:id", (req, res, next) => {
  pieRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statustext: "OK",
          message: "All pies retrieved.",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statustext: "Not Found",
          message: "The pie '" + req.params.id + "' could not be found.",
          error: {
            code: "NOT_FOUND",
            message: "The pie '" + req.params.id + "' could not be found.",
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

app.use("/api/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
