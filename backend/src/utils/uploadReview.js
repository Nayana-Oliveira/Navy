import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storage/reviews");
  },

  filename: function (req, file, cb) {
    let extensao = file.originalname.substring(
      file.originalname.lastIndexOf("."),
    );
    let nome = Date.now() + extensao;

    cb(null, nome);
  },
});

const uploadReview = multer({ storage });

export default uploadReview;
