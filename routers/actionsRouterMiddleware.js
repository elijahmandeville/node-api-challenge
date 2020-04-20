const actions = require("../data/helpers/actionModel");

async function validateActionId(req, res, next) {
  try {
    const action = await actions.get(req.params.id);
    if (action) {
      req.action = action;
      req.id = req.params.id;
      next();
    } else {
      res.status(404).json({
        message: "could not find user by that ID",
      });
    }
  } catch (err) {
    next(err);
  }
}

function validateActionBody(req, res, next) {
  if (!req.body.notes) {
    res.status(404).json({
      message: "missing notes",
    });
  }
  if (!req.body.description) {
    res.status(404).json({
      message: "missing description",
    });
  }
  next();
}

module.exports = {
  validateActionId,
  validateActionBody,
};
