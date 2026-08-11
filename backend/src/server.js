const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5001;

// Connect to Database, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch((error) => {
  console.error(`Server initialization notice: ${error.message}`);
  app.listen(PORT, () => {
    console.log(`Server running in fallback mode on port ${PORT}`);
  });
});

