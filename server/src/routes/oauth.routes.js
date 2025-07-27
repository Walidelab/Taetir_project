import express from 'express';
import session from 'express-session';
import '../config/passport-setup.js'; 
import { getProfileByUserId } from '../services/userService.js';

import passport from 'passport';
import cors from 'cors';

const app = express();

// --- Routes ---

// 1. The route that initiates the Google OAuth flow
app.get(
  '/auth/google',
  passport.authenticate('google') // This redirects to Google's consent screen
);

// 2. The callback route that Google redirects to after user consent
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure', 
  }),
  (req, res) => {
      
    if (req.user.role === null) {
      
      res.redirect('http://localhost:5173/choose-role'); 
    } else {
      res.redirect('http://localhost:5173/dashboard');
    }
  }
);




export default app;