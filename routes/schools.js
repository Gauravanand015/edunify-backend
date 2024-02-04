const express = require("express");
const { schools } = require("../models/school-model");
const schoolRoutes = express.Router();

schoolRoutes.get("/schools", async (req, res) => {
  try {
    const schoolData = await schools.findAll();
    res.json(schoolData);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

schoolRoutes.post("/schools", async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id, secureURL } =
      req.body;
    const imageFileName = req.file.filename;
    const schoolData = await schools.findAll();
    const hasMatchEmail = schoolData.some((elem) => elem.email_id === email_id);

    const hasMatchContact = schoolData.some((elem) => elem.contact === contact);

    if (hasMatchContact || hasMatchEmail) {
      return res.json({ message: "Email or Contact is already registered" });
    } else {
      const schoolData = await schools.create({
        name,
        address,
        city,
        state,
        contact,
        image: secureURL,
        email_id,
      });

      let savedData = await schoolData.save();
      res.status(200).json({ message: "Successfully Stored", data: savedData });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = {
  schoolRoutes,
};
