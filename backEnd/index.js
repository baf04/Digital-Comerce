const port = 4000
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Database conection mongoDB
mongoose.connect("mongodb+srv://bruno:mongodb101@spa.9bxm8zz.mongodb.net/spa");

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating uploads endpoint

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        succes: true,
        Image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({})
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    try {
        const newProduct = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
        });
        console.log(newProduct);
        await newProduct.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API for deleting products 

app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        succes:true,
        name:req.body.name,
    })
})

// API for getting all products 

app.get('/allproducts', async (req,res)=>{
   let products = await Product.find({});
   console.log("All products fetched")
   res.send(products)
})

// API for getting frecuentemente elejidos 

app.get('/getfrecuent', async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched")
    res.send(products)
 })

//API for creating users

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    points:{
        type:Number,
    },

})

// endpoint for creating Users

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing User Found with the same email Address" });
    }
    
    let cart = {};
    for (let i = 0; i < 1200; i++) {
        cart[i] = 0;
    }
    
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        points: 500,     
    });

    try {
        await user.save();

        const data = {
            user: {
                id: user.id,
            }
        }

        const token = jwt.sign(data, 'secret_tkn');
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// endpoint for login Users

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) { 
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_tkn' );
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"})
        }
    }else {
        res.json({success:false, errors:"Wrong Email ID"})
    }
})

//validating the user

const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Authentication error"})
    }
    else {
        try {
            const data = jwt.verify(token,'secret_tkn');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Authentication error"})   
        }
    }
}

//mecanismos de filtrado
//apartados explicando funcionalidaes about us
// enviar correo electronico contactanos
// hostear
// historial de comprar
// que los productos generen 10% del valor real

// endpoint for updating coins

app.post('/updatepoints', async (req, res) => {
    const { points } = req.body;
    const token = req.headers['auth-token'];
    
    if (!token) {
        return res.status(401).json({ success: false, error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_tkn');
        const userId = decoded.user.id;

        let user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        user.points = points;
        await user.save();

        res.json({ success: true, points: user.points });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// endpoint for getting points

app.post('/getpoints',fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.points);
});

// endpoint for getting username

app.post('/getusername',fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.name);
});

//API creation

app.get("/", (req, res) => {
    res.send("Express app is running")
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port " + port)
    } else {
        console.log(error)
    }
})