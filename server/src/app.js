import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import {swaggerSpec} from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';


const app = express();
app.use(cors());
app.use(json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

export default app;
