const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
/*CORS คือสิ่งที่ Browser คุยกับ Server เพื่อถามว่า
จะให้ JavaScript ที่อยู่คนละ Origin กับ Server ส่ง Request ไปหาได้ไหม
ถ้าได้ จะให้ JavaScript ส่งอะไรไปหา Server บ้าง
แล้ว Response ที่ Server ส่งกลับมา จะให้ JavaScript อ่านอะไรได้บ้าง*/
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "employeeSystem"
})
/*
ของ express
app.get เอาไว้กำหนด routing (url) สำหรับ HTTP GET ของเว็บไซต์เรา
path ที่เราต้องการ เช่น / หรือ /home หรือ /about อะไรพวกนี้
callback function
req คือค่าที่รับมา req.body คือค่าด้านใน req.body.id คือค่า id
res เป็น object ที่เราจะ return กลับไปให้ Client (Browser)
*/
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employees (name,age,country,position,wage) VALUES(?,?,?,?,?)", [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
            res.send("values inserted");
            }
        });
});

app.put("/updateWage",(req,res)=>{
    const id =  req.body.id;
    const wage = req.body.wage;

    db.query("UPDATE employees SET wage = ? WHERE id=?", [wage,id], (err,result)=>{
        if (err) {
        } else {
        res.send(result);
        }
    });
});

app.delete("/delete/:id", (req,res)=>{
    const id =  req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", [id],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen('3001', () => {
    console.log("Server is running on port 3001");
});