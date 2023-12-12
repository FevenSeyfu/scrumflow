import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
dotenv.config()
const app = express();

// import routes
import projectRoutes from './routes/projectRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import sprintRoutes from './routes/sprintRoutes.js'

app.use(bodyParser.json({limit: '5mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
    parameterLimit: 50000,
  }),
);
app.use(express.json());
app.use(cors())

// define routes
app.get('/', (req, res) => {
    res.json({ message: 'Project Management Tool API is up and running!' });
  });
  
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sprints', sprintRoutes);
  

// catch-all route for handling unknown routes
app.use((request, response) => {
    response.status(404).json({ message: 'Route not found' });
  });
  
  // error handling middleware
  app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).json({ message: 'Internal Server Error' });
  });

// lets connect to db
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('App connected to database');
    app.listen(5555 || process.env.PORT ,()=>{
        console.log(`App is listening to Port : ${process.env.PORT}`)
    })
}).catch((error)=> {
        console.log(error)
})