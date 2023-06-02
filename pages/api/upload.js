import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const apiRoute = async (req, res) => {
  req.method == "POST"
    ? upload(req, res, (err) => {
        if (err){
          return res.status(500).json({error:err.message})
        }
        const {filename}= req.file;
        res.status(200).json({ nombre: filename});
      })
    : res.status(404).json({ Error: "Method Not Allowed!" });
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};