const contactModel = require("./contactModel");
const express = require("express");
const rewardModel = require("./rewardModel");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { name, company, message } = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!company) {
        return res.send({ message: "company is Required" });
      }
      if (!message) {
        return res.send({ message: "message is Required" });
      }
    
     
      //save
      const client = await new contactModel({
        name,
        email,
        company,
        interview ,
       message
      }).save();
  
      res.status(201).send({
        success: true,
        message: "client Register Successfully",
        client,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  });

  router.get("/get-client", async (req, res) => {
    try {
      const client = await contactModel.find( {});
      res.status(200).send({
        success: true,
        message: "Getting all client SUccessfully",
        client,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While Getting all client SUccessfully",
      });
    }
  });

  // create cetificates
  router.post("/add-certificates", async (req, res) => {
    try {
      const { certificate, client, experience } = req.body;
      //validations
      if (!certificate) {
        return res.send({ error: "certificate is Required" });
      }
      if (!client) {
        return res.send({ message: "client is Required" });
      }
      if (!experience) {
        return res.send({ message: "experience is Required" });
      }
    
     
      //save
      const Rewards = await new rewardModel({
        certificate,
        client,
        experience,
       
      }).save();
  
      res.status(201).send({
        success: true,
        message: "Rewards Register Successfully",
        Rewards,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  });

 // get certificate
  router.get("/get-certificate", async (req, res) => {
    try {
      const Rewards = await rewardModel.find( {} );
      res.status(200).send({
        success: true,
        message: "Get SIngle Rewards SUccessfully",
        Rewards,
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

  // delete cetificate
  router.delete("/delete-certificate/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      await rewardModel.findByIdAndDelete(cid);
      res.status(200).send({
        success: true,
        message: "Rewards Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting Rewards",
        error,
      });
    }
  });
  module.exports = router;