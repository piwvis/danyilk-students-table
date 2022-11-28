const express = require("express");
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const res = require("express");



const app = express();
app.use(cors())
const PORT = process.env.PORT || 9999;

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect(`mongodb+srv://apple:${"B5fY76IRYeTVXvAF"}@cluster0.3vjdyu4.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function() {
    console.log("Connected successfully")
});

const StudentSchema = new mongoose.Schema({
    name: {type: String,}, surname: {type: String}, studentId: {type: String},
});

const Student = mongoose.model('Student', StudentSchema)

app.post("/addStudent", async (request, response) => {
    const student = new Student(request.body);
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    try {
        await student.save();
        response.send(student);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put(`/editStudent/:id`, async (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const student = await Student.findOneAndUpdate({_id: request.body._id}, {$set:request.body});
    try {
        response.send(student);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/deleteStudents", async (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const students = await Student.deleteMany({});
    try {
        response.send([]);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/deleteStudent/:id", async (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const student = await Student.findOneAndDelete({_id: request.body._id});
    try {
        response.send(student);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/students", async (request, response) => {
    const students = await Student.find({});
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    try {
        response.send(students);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server up at ${PORT}`)
})