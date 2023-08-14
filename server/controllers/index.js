const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const generateToken = require("../utils/generatetoken");
const logOut = require("../utils/logout");
const dateFormat = { month: "long", day: "numeric", year: "numeric" };
const today = new Date().toLocaleDateString([], dateFormat);
const nodeMail = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

//creating bucket for file uploads
let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads",
  });
});

// main controller
const defaultController = {
  register: (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      created: today,
    };
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (!user) {
          User.findOne({
            username: req.body.username,
          })
            .then((user) => {
              if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                  userData.password = hash;
                  User.create(userData)
                    .then((user) => {
                      generateToken(res, user.username);
                      return;
                    })
                    .catch((err) => {
                      res.json({ err });
                      return;
                    });
                });
              } else {
                res.json({ error: "This username is already in use" });
                return
              }
            })
            .catch((err) => {
              res.send({ error: err });
              return;
            });
        } else {
          res.json({ error: "This email is already in use" });
          return;
        }
      })
      .catch((err) => {
        res.send({ error: err });
        return;
      });
  },
  login: (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.json({user},{ message: "Login Success" })
            return;
          } else {
            res.json({ error: "Password is incorrect" });
            return;
          }
        }
        res.json({ error: "User doesn't exist" });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  },

  ticket: (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const ticket = req.body.ticket;
    const seat_number = req.body.seat_number;
    User.findOne({ username }).then((user) => {
      user.ticket = ticket;
      user.seat_number = seat_number;
      user.save((err) => {
        console.log({ message: "user ticket updated!" });
      });
    });
    res.json({
      username,
      ticket: req.body.ticket,
      seat_number: req.body.seat_number,
    });
  },
  confirmation: (req, res) => {
    console.log(req.body);
    const email = req.body.email;

    async function sendMail(email) {
      const transporter = await nodeMail.createTransport(
        smtpTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.PASSWORD,
          },
        })
      );
      const mailOption = {
        from: "Techverse Conference",
        to: email,
        subject: "Techverse Conference",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <!--[if gte mso 9]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <title></title>
        
            <style type="text/css">
              @media only screen and (min-width: 620px) {
                .u-row {
                  width: 600px !important;
                }
                .u-row .u-col {
                  vertical-align: top;
                }
                .u-row .u-col-100 {
                  width: 600px !important;
                }
              }
        
              @media (max-width: 620px) {
                .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
                .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
                .u-row {
                  width: 100% !important;
                }
                .u-col {
                  width: 100% !important;
                }
                .u-col > div {
                  margin: 0 auto;
                }
              }
        
              body {
                margin: 0;
                padding: 0;
              }
        
              table,
              tr,
              td {
                vertical-align: top;
                border-collapse: collapse;
              }
        
              p {
                margin: 0;
              }
        
              .ie-container table,
              .mso-container table {
                table-layout: fixed;
              }
        
              * {
                line-height: inherit;
              }
        
              a[x-apple-data-detectors="true"] {
                color: inherit !important;
                text-decoration: none !important;
              }
        
              table,
              td {
                color: #000000;
              }
            </style>
        
            <!--[if !mso]><!-->
            <link
              href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500&display=swap"
              rel="stylesheet"
              type="text/css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Cabin:400,700"
              rel="stylesheet"
              type="text/css"
            />
            <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
            rel="stylesheet"
            type="text/css"
          />
            <!--<![endif]-->
          </head>
        
          <body
            class="clean-body u_body"
            style="
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              background-color: #f9f9f9;
              color: #000000;
            "
          >
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table
              style="
                border-collapse: collapse;
                table-layout: fixed;
                border-spacing: 0;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                vertical-align: top;
                min-width: 320px;
                margin: 0 auto;
                background-color: #f9f9f9;
                width: 100%;
              "
              cellpadding="0"
              cellspacing="0"
            >
              <tbody>
                <tr style="vertical-align: top">
                  <td
                    style="
                      word-break: break-word;
                      border-collapse: collapse !important;
                      vertical-align: top;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
        
                    <div
                      class="u-row-container"
                      style="padding: 0px; background-color: transparent"
                    >
                      <div
                        class="u-row"
                        style="
                          margin: 0 auto;
                          min-width: 320px;
                          max-width: 600px;
                          overflow-wrap: break-word;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: #ffffff;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                          "
                        >
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                          <div
                            class="u-col u-col-100"
                            style="
                              max-width: 320px;
                              min-width: 600px;
                              display: table-cell;
                              vertical-align: top;
                            "
                          >
                            <div style="height: 100%; width: 100% !important">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="
                                  box-sizing: border-box;
                                  height: 100%;
                                  padding: 0px;
                                  border-top: 0px solid transparent;
                                  border-left: 0px solid transparent;
                                  border-right: 0px solid transparent;
                                  border-bottom: 0px solid transparent;
                                "
                              >
                                <!--<![endif]-->
        
                                <table
                                  style="font-family: 'Cabin', sans-serif"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          overflow-wrap: break-word;
                                          word-break: break-word;
                                          padding: 20px;
                                          font-family: 'Cabin', sans-serif;
                                        "
                                        align="left"
                                      >
                                        <table
                                          width="100%"
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                        >
                                          <tr>
                                            <td
                                              style="
                                                padding-right: 0px;
                                                padding-left: 0px;
                                              "
                                              align="center"
                                            >
                                              <img
                                                align="center"
                                                border="0"
                                                src="https://assets.unlayer.com/projects/177296/1692023453777-logo.png"
                                                alt="Image"
                                                title="Image"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: inline-block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  width: 32%;
                                                  max-width: 179.2px;
                                                "
                                                width="179.2"
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
        
                                <!--[if (!mso)&(!IE)]><!-->
                              </div>
                              <!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
        
                    <div
                      class="u-row-container"
                      style="padding: 0px; background-color: transparent"
                    >
                      <div
                        class="u-row"
                        style="
                          margin: 0 auto;
                          min-width: 320px;
                          max-width: 600px;
                          overflow-wrap: break-word;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: #730a99;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                          "
                        >
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #730a99;"><![endif]-->
        
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                          <div
                            class="u-col u-col-100"
                            style="
                              max-width: 320px;
                              min-width: 600px;
                              display: table-cell;
                              vertical-align: top;
                            "
                          >
                            <div style="height: 100%; width: 100% !important">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="
                                  box-sizing: border-box;
                                  height: 100%;
                                  padding: 0px;
                                  border-top: 0px solid transparent;
                                  border-left: 0px solid transparent;
                                  border-right: 0px solid transparent;
                                  border-bottom: 0px solid transparent;
                                "
                              >
                                <!--<![endif]-->
        
                                <table
                                  style="font-family: 'Cabin', sans-serif"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          overflow-wrap: break-word;
                                          word-break: break-word;
                                          padding: 40px 10px 10px;
                                          font-family: 'Cabin', sans-serif;
                                        "
                                        align="left"
                                      >
                                        <table
                                          width="100%"
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                        >
                                          <tr>
                                            <td
                                              style="
                                                padding-right: 0px;
                                                padding-left: 0px;
                                              "
                                              align="center"
                                            >
                                              <img
                                                align="center"
                                                border="0"
                                                src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png"
                                                alt="Image"
                                                title="Image"
                                                style="
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  clear: both;
                                                  display: inline-block !important;
                                                  border: none;
                                                  height: auto;
                                                  float: none;
                                                  width: 26%;
                                                  max-width: 150.8px;
                                                "
                                                width="150.8"
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
        
                                <table
                                  style="font-family: 'Cabin', sans-serif"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          overflow-wrap: break-word;
                                          word-break: break-word;
                                          padding: 10px;
                                          font-family: 'Cabin', sans-serif;
                                        "
                                        align="left"
                                      >
                                        <div
                                          style="
                                            font-size: 14px;
                                            color: #e5eaf5;
                                            line-height: 140%;
                                            text-align: center;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <p style="font-size: 14px; line-height: 140%">
                                            <strong
                                              >T H A N K S&nbsp; &nbsp;F O R&nbsp;
                                              &nbsp;S I G N I N G&nbsp; &nbsp;U P
                                              </strong
                                            >
                                          </p>
                                          <p style="font-size: 14px; line-height: 140%">
                                            &nbsp;
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
        
                                <!--[if (!mso)&(!IE)]><!-->
                              </div>
                              <!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
        
                    <div
                      class="u-row-container"
                      style="padding: 0px; background-color: transparent"
                    >
                      <div
                        class="u-row"
                        style="
                          margin: 0 auto;
                          min-width: 320px;
                          max-width: 600px;
                          overflow-wrap: break-word;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: #ffffff;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                          "
                        >
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                          <div
                            class="u-col u-col-100"
                            style="
                              max-width: 320px;
                              min-width: 600px;
                              display: table-cell;
                              vertical-align: top;
                            "
                          >
                            <div style="height: 100%; width: 100% !important">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="
                                  box-sizing: border-box;
                                  height: 100%;
                                  padding: 0px;
                                  border-top: 0px solid transparent;
                                  border-left: 0px solid transparent;
                                  border-right: 0px solid transparent;
                                  border-bottom: 0px solid transparent;
                                "
                              >
                                <!--<![endif]-->
        
                                <table
                                  style="font-family: 'Cabin', sans-serif"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          overflow-wrap: break-word;
                                          word-break: break-word;
                                          padding: 33px 55px 60px;
                                          font-family: 'Cabin', sans-serif;
                                        "
                                        align="left"
                                      >
                                        <div
                                          style="
                                            font-size: 14px;
                                            line-height: 160%;
                                            text-align: center;
                                            word-wrap: break-word;
                                          "
                                        >
                                          <h3>
                                            <span
                                              style="
                                                font-family: 'Epilogue', sans-serif;
                                                line-height: 22.4px;
                                              "
                                              ><strong
                                                ><span
                                                  style="
                                                    font-family: 'Montserrat', sans-serif;
                                                    font-size: 20px;
                                                    line-height: 32px;
                                                  "
                                                  >Watch out for Exculsive deals,
                                                  updates, and latest news right in your
                                                  inbox 🎉</span
                                                ></strong
                                              >
                                            </span>
                                          </h3>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
        
                                <!--[if (!mso)&(!IE)]><!-->
                              </div>
                              <!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
        
                    <div
                      class="u-row-container"
                      style="padding: 0px; background-color: transparent"
                    >
                      <div
                        class="u-row"
                        style="
                          margin: 0 auto;
                          min-width: 320px;
                          max-width: 600px;
                          overflow-wrap: break-word;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: #e5eaf5;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                          "
                        >
                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->
        
                          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                          <div
                            class="u-col u-col-100"
                            style="
                              max-width: 320px;
                              min-width: 600px;
                              display: table-cell;
                              vertical-align: top;
                            "
                          >
                            <div style="height: 100%; width: 100% !important">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="
                                  box-sizing: border-box;
                                  height: 100%;
                                  padding: 0px;
                                  border-top: 0px solid transparent;
                                  border-left: 0px solid transparent;
                                  border-right: 0px solid transparent;
                                  border-bottom: 0px solid transparent;
                                "
                              >
                                <!--<![endif]-->
        
                                <table
                                  style="font-family: 'Cabin', sans-serif"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  border="0"
                                >
                                 
                                </table>
        
                                <!--[if (!mso)&(!IE)]><!-->
                              </div>
                              <!--<![endif]-->
                            </div>
                          </div>
                          <!--[if (mso)|(IE)]></td><![endif]-->
                          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                      </div>
                    </div>
        
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
          </body>
        </html>
        `,
      };
      try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
    sendMail(email)
      .then(() => {
        res.json({ message: "Email Sent" });
      })
      .catch((err) => console.log(err));
  },
  upload_file: (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    User.findOne({ username }).then((user) => {
      user.photo_url = req.file.filename;
      user.save((err) => {
        console.log({ message: "Upload Success" });
      });
    });
    res.json({ username, file: req.file });
  },
  logout: (req, res) => {
    logOut(res);
  },

  // misc
  update_bio: (req, res) => {
    User.findOne({ username: req.user.username }).then((user) => {
      user.bio = req.body.bio;
      user.save((err) => {
        res.json({ message: "Bio has been updated" });
      });
    });
  },
  user_page: (req, res) => {
    const username = res.params.username;
    // returns all information about the user to populate the frontend template
    User.findOne({ username: req.body.username }).then((user) => {
      res.json({ user });
    });
  },
  get_file: (req, res) => {
    const file = bucket
      .find({
        filename: req.params.filename,
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist",
          });
        }
        bucket.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  },
  user_profile: (req, res) => {
    const username = req.body.username;
    User.findOne({ username })
      .then((user) => {
        if (user) {
          res.json({ user });
        } else {
          res.json({ message: "No user found" });
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  },
  get_all: (req, res) => {
    User.find()
      .then((users) => {
        if (users) {
          res.json({ users });
        } else {
          res.json({ message: "No users found" });
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  },
};

module.exports = defaultController;
