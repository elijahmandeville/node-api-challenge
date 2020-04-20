const projects = require("../data/helpers/projectModel");

async function validateProjectId(req, res, next) {
  try {
    const project = await projects.get(req.params.id);
    if (project) {
      req.project = project;
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

function validateProjectBody(req, res, next) {
  if (!req.body.name) {
    res.status(404).json({
      message: "missing name",
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
  validateProjectId,
  validateProjectBody,
};
