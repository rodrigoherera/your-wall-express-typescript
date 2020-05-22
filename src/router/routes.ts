import { Router } from 'express';
import {PostController} from '../controller/post';
import multer from 'multer';
const router = Router();
const post = new PostController();

const storage = multer.diskStorage({
  destination: function(_req, _file, cb) {
    cb(null, './uploads/');
  },
  filename: async function(_req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (_req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpeg' 
      || file.mimetype === 'image/png') {
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  fileFilter: fileFilter, 
  limits: {
    fileSize:1024*1024
  },
});

router.route('/api/post')
  .post(upload.single('image'), post.savePost)
  .get(post.getPosts)

export default router;

