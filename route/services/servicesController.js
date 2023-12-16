const servicesModel = require("./servicesModel");
const express = require("express");

const router = express.Router();

// create service
router.post("/create-service" , async (req, res) => {
    try {
      const { name , description, icon } = req.body;
      if (!name) {
        return res.status(401).send({ message: "Name is required" });
      }
      if (!description) {
        return res.status(401).send({ message: "description service is required" });
      }
      if (!icon) {
        return res.status(401).send({ message: "icon service is required" });
      }
      const existingservice = await servicesModel.findOne({ name });
      if (existingservice) {
        return res.status(200).send({
          success: true,
          message: "service Already Exisits",
        });
      }
      const service = await new servicesModel({
        name,
        description,
          icon
      }).save();
      res.status(201).send({
        success: true,
        message: "new service created",
        service,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        errro,
        message: "Errro in service",
      });
    }
  });

  //update service
router.put("/update-service/:sid", async (req, res) => {
    try {
      const { name,description,icon } = req.body;
      const { sid } = req.params;
      const service = await servicesModel.findByIdAndUpdate(
        sid,
        { name, description,icon },
        { new: true }
      );
      await service.save();
      res.status(200).send({
        success: true,
        messsage: "service Updated Successfully",
        service,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating service",
      });
    }
  });
  
  // single service
router.get("/single-service/:sid", async (req, res) => {
    try {
      const service = await servicesModel.findById( req.params.sid );
      res.status(200).send({
        success: true,
        message: "Get SIngle service SUccessfully",
        service,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single service",
      });
    }
  });

  //all services
router.get("/get-service", async (req, res) => {
    try {
      const service = await servicesModel.find( {});
      res.status(200).send({
        success: true,
        message: "Getting all service SUccessfully",
        service,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While Getting all service SUccessfully",
      });
    }
  });

  //delete service
router.delete("/delete-service/:sid", async (req, res) => {
    try {
      const { sid } = req.params;
      await servicesModel.findByIdAndDelete(sid);
      res.status(200).send({
        success: true,
        message: "service Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting service",
        error,
      });
    }
  });

  module.exports = router;
