const router = require("express").Router();
const fileUpload = require('../config/cloudinary');

router.get("/", (req, res, next) => {
  res.render("index");
});

router.post('/upload', fileUpload.single('file'), (req, res) => {
  try {
      res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
      res.status(500).json({message: e.message})
  }
})

module.exports = router;
