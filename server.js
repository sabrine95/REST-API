const express = require('express')
const connectDB = require('./config/connectDB')
const User = require('./models/User')
require("dotenv").config({ path: './config/.env' })
const app = express()

app.use(express.json())
connectDB()


app.post('/users/add', async (req, res) => {
    const { fullName, email, phone } = req.body;
    const newUser = new User({
        fullName,
        email,
        phone
    })
    try {
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        alert('Post request error');
    }
})

app.use('/users/get', async (req, res) => {
    try {
        let users = await User.find()
        res.send(users);
    } catch (error) {
        alert("Get request error")
    }
})

app.get('/users/get/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);        //get one user 
        res.send(user);
    } catch (error) {
        alert("Get request by id error")
    }
})

app.delete('/users/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send("user successfully deleted")        //delete user 
    } catch (error) {
        alert("Delete request error")
    }
})

app.put('/users/update/:id', async (req, res) => {
    try {
        let editedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.send("user updated successfully")          //put user 
    } catch (error) {
        alert("Update request error")
    }
})

const PORT = process.env.PORT || 5005
app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server running on port ${PORT}`))