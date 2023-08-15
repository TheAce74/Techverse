const controller = require("../controllers/index");
const router = require("express").Router();
const config = require("../config/config");
const verifyToken = require("../utils/verifytoken");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

// Multer Configurations
const storage = new GridFsStorage({
  url: config.URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = "yotalk" + Date.now() + file.originalname.slice(-6);
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

//Home
router.get("/",(req,res)=>{res.send("Welcome to Techverse Server 🚀 ... There's nothing here tho, suprised?")}) ;


//Register User
router.post("/register", controller.register);

//Login User
router.post("/login", controller.login);
router.post("/ticket", controller.ticket);
router.post("/keepmeupdated", controller.confirmation);
router.post("/contact", controller.contact);



//Get All Users
router.get("/get_all", controller.get_all);

//Upload Bio
router.post("/user/upload_bio", verifyToken, controller.update_bio);

//User Page Links
router.post("/:username", controller.user_page);

// Log Out User
router.get("/user/logout", controller.logout);

// Get Specific File
router.get("/fileinfo/:filename", controller.get_file);

// Get User Profile
router.post("/user/profile", controller.user_profile);

// Routes for Uploading Files
router.post("/user/upload", upload.single("file"), controller.upload_file);

module.exports = router;
