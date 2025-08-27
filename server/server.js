require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const http = require('http');
const { Server } = require('socket.io');

connectDB();

const app = express();
const server = http.createServer(app);
app.use(express.json());

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS
  || 'http://localhost:5173,https://sweet-stardust-eba547.netlify.app'
).split(',');

app.use(cors({
  origin(origin, cb) {
    // !origin allows postman and curl to make requests
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));


const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.set('io', io);

// API routes
app.use('/api/spotify', require('./routes/spotify'));
app.use('/api/gemini', require('./routes/gemini'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lists', require('./routes/SongLists'));
app.use('/api/wiki', require('./routes/wikipedia'));


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});