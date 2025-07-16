import app from './src/app.js';
const PORT = process.env.PORT || 5000;
import cors from 'cors';

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
