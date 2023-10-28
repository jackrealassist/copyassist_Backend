const nodemailer = require("nodemailer");

// Create a transporter object using your SMTP credentials
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use a service like Gmail or provide your SMTP settings
  auth: {
    user: "bhavya.popat.8@gmail.com", // Your email address
    pass: "hqtk rnnn oqji vxki", // Your email password or app-specific password
  },
});

exports.submitContactUsForm = async (req, res) => {
  try {
    const formData = req.body;

    // Email data
    const mailOptions = {
      from: formData.email,
      to: "jack@realassist.ai",
      subject: "Nodemailer Email",
      // text: "Use this to send your email without html formatting"
      html: `<html>
      <body>
      <table style="width:100%;">
      <tr>
      <td colspan=2 style="text-align:center;"> <center>
      <img src="https://drive.google.com/uc?export=view&id=1dwjb-qZz4zvq4hAT7ed2uUk9dxVtVyOg" alt="RealAssist LOGO" />
    </center></td>
      </tr>
      <tr>
      <td colspan=2 style="text-align:center;"><h1>You have received a new Contact Us Email!</h1></td>
      </tr>
      <tr>
      <td style="text-align:left; width:15%;">
        <h2>User Name:</h2>
      </td>
      <td>
        <h2><span style="font-weight:normal !important;">${formData.user_name}</span></h2>
      </td>
      </tr>
      <tr>
      <td style="text-align:left; width:15%;"><h2>Email: </h2></td>
      <td><h2><u style="font-weight:normal !important;">${formData.email}</u></h2></td>
      </tr>
      <tr>
      <td style="text-align:left; width:15%;"><h2>Subject: </h2></td>
      <td><h2><i style="font-weight:normal !important;">${formData.subject}</i></h2></td>
      </tr>
      <tr>
      <td style="text-align:left; width:15%;"><h2>Message:</h2></td>
      <td>
      <p style="font-size:1.125rem;">${formData.message}</p>
      </td>
      </tr>
      <tr>
      </tr>
      </table>    
      </body>
    </html>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return;
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email Sent Successfully!" });
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
