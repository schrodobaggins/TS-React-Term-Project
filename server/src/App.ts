import express, { Express, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import api from './routes/api';

const app = express();

/** Logging */
app.use(logger('dev'));
/** Parse requests */
app.use(express.urlencoded({extended: false}));
/** Handle JSON data */
app.use(express.json());

app.use(cors());

/** RULES OF OUR API */
app.use((req: Request, res: Response, next: NextFunction) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes and error handling */
app.use('/api', api);
app.use((req: Request, res: Response, next: NextFunction) => {
   const err = new Error('not found');
   return res.status(404).json({
      message: err.message
   });
});

export default app;