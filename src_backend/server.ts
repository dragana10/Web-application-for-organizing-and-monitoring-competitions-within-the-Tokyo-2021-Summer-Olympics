import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import countryRouter from './routes/country.routes';
import medalRouter from './routes/medal.routes';
import athleteRouter from './routes/athlete.routes';
import userRouter from './routes/user.routes';
import sportsRouter from './routes/sports.routes';
import competitionsRouter from './routes/competitions.routes';
import recordsRouter from './routes/records.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/projekatPia");
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("Konekcija sa bazom je uspesna");
})

const router = express.Router();
router.use('/country', countryRouter );
router.use('/medals', medalRouter );
router.use('/athletes', athleteRouter );
router.use('/organizer', userRouter );
router.use('/user', userRouter );
router.use('/sports', sportsRouter );
router.use('/comp', competitionsRouter );
router.use('/rec', recordsRouter );



app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));