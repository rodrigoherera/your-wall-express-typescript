import express from 'express';
import router from './router/routes';
import bodyParser from 'body-parser';
import db from './db/Mongodb';
import cors from 'cors';

export class App {
    public app: express.Application;    

    constructor
    (
      private port?: number | string
    ) 
    {
      this.app = express();
      this.config();
      this.routes();
      this.settings();
    }
    
    private routes(): void {
      this.app.use(router);
      db;
    }
    private config(): void {
      this.app.use(cors());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use('/uploads', express.static('uploads'));
    }

    private settings(): void {
      this.app.set('port', this.port || process.env.PORT || 3000);
    }

    async listen(): Promise<void> {
      this.app.listen(this.app.get('port'));
      console.log('Server on port', this.app.get('port'));
    }
}