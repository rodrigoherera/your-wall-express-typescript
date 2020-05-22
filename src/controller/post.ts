import Post from '../models/Post';
import { Request, Response} from 'express';
import Jimp from 'jimp';
import appRoot from 'app-root-path';


export class PostController {

  savePost(req: Request, res: Response){
    if(req.body == null) {
      res.status(400).json({error: 'Body required'})
    }
    try {
      if (req.file.size > 700000) {
        resizeImage(req.file.path);
      }
      const image: String|null = req.file.path;
      const description: String = req.body.description;
      Post.create({
        image,
        description
      })
      .then((data) => {
        console.log(`Post created: \n ${data}`)
        res.status(201).json(data)
      })
      .catch((err: Error) => res.status(500).json(err));
    } catch (err) {
      console.error(err);
      res.status(400).json({error: err})
    }
  }

  getPosts(req: Request, res: Response){
    Post.find({}, (err, result) => {
      if (err) {
        console.error(err);
        res.status(400).json({error: err});
      }else{
        res.status(200).json(result);
      }
    });
  }
}

async function resizeImage(image: string) {
  try {
    console.log("Resizing image.");
    const _path = appRoot.path +'\\'+image    
    const jimpIMG = await Jimp.read(_path)
    jimpIMG.quality(70);
    await jimpIMG.writeAsync(_path)
    console.log("Image resized.");
  } catch (error) {
    console.error(error);
  }
}