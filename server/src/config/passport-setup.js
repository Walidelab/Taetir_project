import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getUserById , createUser } from '../services/userService.js';

// --- IMPORTANT: Store these in environment variables in a real app ---
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SESSION_SECRET = 'a_very_secret_key_for_session';

const app = express();

// --- Middleware Setup ---
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

// --- Passport Configuration ---

// This function is called to save the user's ID to the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Example: saving user.id
});

// This function is called to retrieve user data from the session
passport.deserializeUser((id, done) => {
  // In a real app, you would find the user in your database using the id
  // For this example, we'll just use a placeholder object
  // User.findById(id, (err, user) => done(err, user));
  done(null, { id: id, name: 'Test User' }); // Placeholder user
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback', // Must match Google Console setting
      scope: ['profile', 'email'],
    },
    // This "verify" function is called when Google successfully authenticates the user
    (accessToken, refreshToken, profile, done) => {
      // This is where you find or create a user in your database
      const userId = profile.id; // Use profile.id or any other unique identifier
      // Example: Check if user exists in your database
      const existingUser = getUserById(userId);
      if (existingUser) {
        return done(null, existingUser); // User exists, pass it to serializeUser
      }

      const newUser = createUser({
        id: profile.id,
        email: profile.emails[0].value
      });
      return done(null, newUser); // Pass the new user object to serializeUser
    }
  )
);