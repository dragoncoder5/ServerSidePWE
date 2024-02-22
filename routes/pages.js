const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const axios = require("axios");


router.get("/", (req, res) => {
    res.render("home");
})
router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.post("/contact", multer().none(), async (req, res) => {
    try {
        // Extract form data
        const formData = {
            fullname: req.body.fullname,
            email: req.body.email,
            age: req.body.age,
            // Add other form fields as needed
        };

        // Make a POST request to json-server to save the form data
        await axios.post("http://localhost:3000/contactForms", formData);

        // Redirect to the contact page
        res.redirect("/contact");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/student", async (req, res) => {
    try {
        // Fetch data from json-server
        const response = await axios.get("http://localhost:3000/contactForms");

        // Extract the data from the response
        const contactForms = response.data;

        // Render the display page with the fetched data
        res.render("student", { contactForms });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// Add this route after the existing routes
router.get("/student/:id/update", async (req, res) => {
    try {
      // Fetch the specific contact form data based on the provided ID
      const response = await axios.get(`http://localhost:3000/contactForms/${req.params.id}`);
      const contactForm = response.data;
  
      // Render the update form with the fetched data
      res.render("update", { contactForm });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.post("/student/:id/update", multer().none(), async (req, res) => {
    try {
      // Extract form data
      const formData = {
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        // Add other form fields as needed
      };
  
      // Make a PUT request to update the form data
      await axios.put(`http://localhost:3000/contactForms/${req.params.id}`, formData);
  
      // Redirect to the student page
      res.redirect("/student");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
// Add this route after the existing routes
router.get("/student/:id/delete", async (req, res) => {
    try {
      // Make a DELETE request to remove the contact form data
      await axios.delete(`http://localhost:3000/contactForms/${req.params.id}`);
  
      // Redirect to the student page
      res.redirect("/student");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  




module.exports = router;
