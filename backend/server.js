/* Include "type": "module" in package.json */
/* npm install -g nodemon*/
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import reload from 'reload';

const app = Express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// Always have cors before routes

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

/* Cloud database: https://www.mongodb.com/atlas/database*/

app.use('/', (req, res) => {
    res.send('APP IS RUNNING');
});

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(PORT, () => console.log('Server running on PORT: ' + PORT));
    reload(app);
})
.catch((error) =>{
    console.log(error);
});

mongoose.set('strictQuery', false);
