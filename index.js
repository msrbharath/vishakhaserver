const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT || 5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: "msrbharathraj@gmail.com",
      pass: "mkg84712",
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });
  router.get('/', (req, res) => { res.send('Hello from Vishakha Server!')});
  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const site = req.body.site;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "msrbharathraj@gmail.com",
      subject: "Sri Vishakha - Site Enquiry",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Site No: ${site}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
        console.log("Email sent successfully");
      }
    });
  });