const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
connectDB();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: 'https://sweet-stardust-eba547.netlify.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: 'https://sweet-stardust-eba547.netlify.app', // or '*' for dev 'http://localhost:5173'
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
// app.use('/api/lyrics', require('./routes/lyricsovh'));
app.use('/api/gemini', require('./routes/gemini'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lists', require('./routes/SongLists'));
app.use('/api/wiki', require('./routes/wikipedia'));


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});