import multer from "multer";

const storage = multer.memoryStorage();

const uploadReview = multer({
  storage,
});

export default uploadReview;
