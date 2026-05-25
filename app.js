require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

const callRoutes = require('./src/routes/call.routes');
app.use('/call', callRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});