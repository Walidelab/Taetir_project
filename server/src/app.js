import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import oauthRoutes from './routes/oauth.routes.js';
import UsersRoutes from './routes/users.routes.js';
import {swaggerSpec} from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import session from 'express-session';
import profileRoutes from './routes/profile.routes.js';
import mentorRoutes from './routes/mentor.routes.js';

import './config/passport-setup.js'; 



const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/auth', oauthRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/mentors', mentorRoutes);

export default app;
