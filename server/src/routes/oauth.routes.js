import express from 'express';
import session from 'express-session';
import '../config/passport-setup.js'; 

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
    failureRedirect: '/login-failure', // Redirect on failure
  }),
  (req, res) => {
    // Check if the user's role is null
    if (req.user.role === null) {
      // If role is not set, redirect to the role setting page
      res.redirect('http://localhost:5173/choose-role'); 
    } else {
      // If role is already set, redirect to the main dashboard
      res.redirect('http://localhost:3000/dashboard');
    }
  }
);

app.get('/current_user', (req, res) => {
  res.send(req.user);
});




export default app;