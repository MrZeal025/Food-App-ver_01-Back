require('dotenv').config();
require('./database/connect')();

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const cors = require('cors');

// enable to use json
app.use(express.json());
const server = http.createServer(app);
app.use(cors());

// import routes
const authRoute = require('./routes/auth.router');
const uploadRouter = require('./routes/upload.router');
const userRouter = require('./routes/user.router');
const recipeRouter = require('./routes/recipe.router');
const adminRouter = require('./routes/admin.router');

// route middlewares
app.use('/api/auth', authRoute);
app.use('/api/uploads', uploadRouter);
app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/admin', adminRouter);
 
//  serve static assets if in productions
if(process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// run the server
server.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${process.env.PORT}`));