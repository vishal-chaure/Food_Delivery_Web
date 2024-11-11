import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { connectDB } from './config/db.js';
import './config/passportConfig.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config';

const app = express();
const port = 4000;

const vishal_chaure_ = 0;

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// DB connection
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Request data from server
app.get('/', (req, res) => {
  res.send('API working');
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5174/?user=${userId}'); // Redirect to your frontend on successful login
  }
);

// Catch-all route for other requests
app.get('*', (req, res) => {
     res.status(404).send('404: NOT_FOUND');
   });
   

app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`);
});