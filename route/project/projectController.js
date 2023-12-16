const projectModel = require("./projectModel");
const express = require("express");
const formidable = require("express-formidable");
const fs = require("fs")

const router = express.Router();

// add project
router.post("/create-project",  formidable(), async (req, res) => {
    try {
      const { name, description, link } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !link:
          return res.status(500).send({ error: "project link is Required" });
      
      
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const project = new projectModel({ ...req.fields });
      if (photo) {
        project.photo.data = fs.readFileSync(photo.path);
        project.photo.contentType = photo.type;
      }
      await project.save();
      res.status(201).send({
        success: true,
        message: "project Created Successfully",
        project,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing project",
      });
    }
  });

  //get  projects
router.get("/get-project" , async (req, res) => {
    try {
      const projects = await projectModel
        .find({})
        .select("-photo")
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: projects.length,
        message: "ALlprojects ",
        projects,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting projects",
        error: error.message,
      });
    }
  });

  // project photo
  router.get("/project-photo/:pid" ,  async (req, res) => {
    try {
      const project = await projectModel.findById(req.params.pid).select("photo");
      if (project.photo.data) {
        res.set("Content-type", project.photo.contentType);
        return res.status(200).send(project.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  });

  // get single project
router.get ("/get-project/:pid" ,  async (req, res) => {
    try {
      const project = await projectModel
        .findById(req.params.pid)
        .select("-photo")
      res.status(200).send({
        success: true,
        message: "Single project Fetched",
        project,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single project",
        error,
      });
    }
  });

    //upate projecta
router.put("/update-project/:pid", formidable(), async (req, res) => {
    try {
      const { name, description, link } =
      req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !link:
          return res.status(500).send({ error: "project link is Required" });
          
        
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const projects = await projectModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields },
        { new: true }
      );
      if (photo) {
        projects.photo.data = fs.readFileSync(photo.path);
        projects.photo.contentType = photo.type;
      }
      await projects.save();
      res.status(201).send({
        success: true,
        message: "project Updated Successfully",
        projects,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte project",
      });
    }
  });

    //delete controller
router.delete("/delete-project/:pid" , async (req, res) => {
    try {
      await projectModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "project Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting project",
        error,
      });
    }
  });

  module.exports = router;