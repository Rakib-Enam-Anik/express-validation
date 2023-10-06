const express = require("express");
const { validationResult } = require("express-validator");
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});

app.get("/test", (req,res)=>{
    res.send("testing the server");
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// name, email, password, dob
app.post(
"/api/register", 

// input validation
// name = "anisul islam"
body("name")
.trim()
.notEmpty()
.withMessage("Name is missing")
.isLength({min: 5})
.withMessage("name must have at least 5 characters")
.isLength({max: 31})
.withMessage("name can have maximum 31 characters"),

body("name")
.trim()
.notEmpty()
.withMessage("Email is missing")
.isLength({min: 5})
.isEmail()
.withMessage("Not a valid email"),

body("password")
.trim()
.notEmpty()
.withMessage("Password is missing")
.isLength({min: 5})
.withMessage("password must have at least 5 characters"),

body("dob")
.trim()
.notEmpty()
.withMessage("dob is missing")
.isISO8601()
.toDate()
.withMessage("Not a valid dob"),

(req,res,next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
     }
     next();
},


(req,res)=>{
    const {name, email, password, dob} = req.body;
    const newUser = {
        name, email, password, dob 
    }

    try {
        return res.status(201).json({
            message: "user was created",
            newUser
        });
    } catch (error) {
        return res.json({
            message: error.message
        })
        
    }
})

// api/register

