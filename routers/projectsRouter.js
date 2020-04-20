const express = require("express");

const middleware = require("./projectsRouterMiddleware");
const actionMiddleware = require("./actionsRouterMiddleware");
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projectList = await projects.get();
    res.status(200).json(projectList);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", middleware.validateProjectId, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post("/", middleware.validateProjectBody, async (req, res, next) => {
  try {
    const newProject = await projects.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", middleware.validateProjectId, async (req, res, next) => {
  try {
    const updatedProject = await projects.update(req.id, req.body);
    res.status(202).json({
      message: "Project updated",
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", middleware.validateProjectId, async (req, res, next) => {
  try {
    const projectDeleted = await projects.remove(req.id);
    res.status(200).json({
      message: "successfully nuked",
    });
  } catch (err) {
    next(err);
  }
});

//Action CRUD
router.post(
  "/:id/actions",
  middleware.validateProjectId,
  actionMiddleware.validateActionBody,
  async (req, res, next) => {
    try {
      const newAction = await actions.insert({
        ...req.body,
        project_id: req.id,
      });
      res.status(201).json(newAction);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
