const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "madlanimm@gmail.com",
    pass: "Mamta#madlani@123",
  },
})

// Email Options
const emailConfig = {
  from: "madlanimm@gmail.com",
  to: "madlanimamta@gmail.com",
  subject: "Test email",
  text: "Test email sent by Developer (Mamta)",
}

transporter.sendMail(emailConfig, (error, information) => {
  if (error) {
    return console.error("Error sending email :" + error)
  }
  console.log("Email sent successfully")
  console.log("Information \n" + information.response)
})
