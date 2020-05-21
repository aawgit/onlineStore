import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') dotenv.config();

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import Facebook from './routes/Auth/Facebook';
import VerifyEmail from './routes/Auth/VerifyEmail';

import CreateItem from './routes/Items/Create';
import ShowItem from './routes/Items/Show';
import EditItem from './routes/Items/Edit';
import DeleteItem from './routes/Items/Delete';

import ShowUser from './routes/User/Show';
import EditUser from './routes/User/Edit';
import DeleteUser from './routes/User/Delete';

const port = process.env.PORT || 5000;
const app = express();
const db = mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

db.catch((error) => console.log(error));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../../client/build/')));

app.use('/api/auth/login', Login);
app.use('/api/auth/register', Register);
app.use('/api/auth/facebook', Facebook);
app.use('/api/auth/verify/:token', VerifyEmail);

app.use('/api/items/:id?', ShowItem);
app.use('/api/items/create', CreateItem);
app.use('/api/items/edit/:id', EditItem);
app.use('/api/items/delete/:id', DeleteItem);

app.use('/api/user/id?', ShowUser);
app.use('/api/user/edit/:id', EditUser);
app.use('/api/user/delete/:id', DeleteUser);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(port, () => {
	console.log(
		`\x1b[91m Server listening on \x1b[36m${process.env.APP_URL}\x1b[91m in \x1b[36m${process.env.NODE_ENV}\x1b[91m mode! Happy hacking...\x1b[0m`
	);
});
