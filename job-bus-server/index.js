const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User.js');
const RouteModel = require('./models/Route-Bus.js');
const TripModel = require('./models/Bus-Trip.js');
const ChairBedModel = require('./models/Chair-Bed.js');
const ContactModel = require('./models/Contact.js');
const NewsModel = require('./models/News.js');
const TicketModel = require('./models/Ticket.js'); 
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'sdsafdf34654654xgfdgfdg';

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const user = await User.findById(userData.id);
        res.json(user);
      });
    } else {
      res.json(null);
    }
  });

app.get('/tttt', (req, res) => {
    res.json('test ok lắm nè');
});

app.get('/route-bus', async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/trip-bus', async (req, res) => {
    try {
        const trips = await TripModel.find();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/chair-bed/:maChuyenXe', async (req, res) => {
    const { maChuyenXe } = req.params;
    try {
        const chairBed = await ChairBedModel.findOne({ maChuyenXe });
        res.json(chairBed);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/available-seats/:maChuyenXe', async (req, res) => {
    const { maChuyenXe } = req.params;
    try {
        const chairBeds = await ChairBedModel.find({ maChuyenXe });
        console.log("Fetched chair beds:", chairBeds); // Log the fetched data
        const availableSeatsCount = chairBeds.reduce((count, chairBed) => {
            const availableSeats = chairBed.seat_map.filter(seat => seat.trangThai === "Còn trống").length;
            return count + availableSeats;
        }, 0);
        console.log("Available seats count:", availableSeatsCount); // Log the count of available seats
        res.json({ availableSeatsCount });
    } catch (error) {
        console.error("Error fetching available seats:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/news/featured', async (req, res) => {
    try {
        const featuredNews = await NewsModel.find({ levelNoiBat: 5 });
        res.json(featuredNews);
    } catch (error) {
        console.error("Error fetching featured news:", error); // Log the full error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/news/multi-featured', async (req, res) => {
    try {
        const multiFeaturedNews = await NewsModel.find({ levelNoiBat: { $gte: 2, $lte: 4 } });
        res.json(multiFeaturedNews);
    } catch (error) {
        console.error("Error fetching multi-featured news:", error); // Log the full error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/news', async (req, res) => {
    try {
        const allNews = await NewsModel.find();
        res.json(allNews);
    } catch (error) {
        console.error("Error fetching all news:", error); // Log the full error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/news/:id', async (req, res) => {
    try {
      const news = await NewsModel.findById(req.params.id);
      res.json(news);
    } catch (error) {
      console.error("Error fetching news by ID:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
  
app.get('/news/related/:chuDe', async (req, res) => {
    try {
      const relatedNews = await NewsModel.find({ chuDe: req.params.chuDe });
      res.json(relatedNews);
    } catch (error) {
      console.error("Error fetching related news:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/tickets/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const tickets = await TicketModel.find({ maKhachHang: userId });
        res.json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//r8zWF2KUnMp8FAN5
app.post('/register', async (req,res) => {
    const {name, email, password, phone} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            phone,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
    
        res.json(userDoc);
    }catch(e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk){
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc); 
            });
        } else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    console.log(req.cookies); 
    const { token } = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const user = await User.findById(userData.id)
            res.json(user);
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

app.post('/forgot-password', (req,res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        }
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nghianguyen2830@gmail.com',
              pass: 'bxyv oddt zdpq hfjf',
            }
          });
          
          const mailOptions = {
            from: 'nghianguyen2830@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: `http://localhost:5173/cap-nhat-mat-khau/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
});

app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})

app.post('/ud-password', async (req, res) =>{
    const { _id, currentPassword, newPassword } = req.body;
    const user = await User.findById(_id); 
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
    }
    user.password = bcrypt.hashSync(newPassword, bcryptSalt);
    await user.save();
    res.json({ message: 'Password updated successfully' });
});

app.post('/update-user', upload.single('updatedAvatar'), async (req, res) => {
    const { _id, updatedName, updatedPhone, updatedAddress} = req.body;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = updatedName;
        user.phone = updatedPhone;
        user.diaChi = updatedAddress;

        if (req.file) {
            user.avatar = `/uploads/${req.file.filename}`; 
        }

        await user.save();
        res.json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/find-bus-routes", async (req, res) => {
    const { maTuyenXe } = req.body;
    try {
      const matchingTrips = await TripModel.find({ maTuyenXe });
      res.json(matchingTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post('/search-bus', async (req, res) => {
    const { departurePoint, destination, selectedDate } = req.body;
    console.log("Received request at /search-bus with data:", { departurePoint, destination, selectedDate });
    try {
        console.log("Searching for routes with:", { departurePoint, destination, selectedDate });
        
        // Step 1: Fetch routes matching departurePoint and destination
        const routes = await RouteModel.find({ diemDi: departurePoint, diemDen: destination });
        console.log("Found routes:", routes);
        
        if (routes.length === 0) {
            return res.status(404).json({ message: 'No routes found' });
        }

        // Step 2: Get the _id of the matching routes
        const routeIds = routes.map(route => route._id);

        // Step 3: Fetch trips matching the routeIds and selectedDate
        const trips = await TripModel.find({
            maTuyenXe: { $in: routeIds },
            ngayDi: {
                $gte: new Date(new Date(selectedDate).setHours(0, 0, 0, 0)),
                $lt: new Date(new Date(selectedDate).setHours(23, 59, 59, 999))
            }
        });

        console.log("Found trips:", trips);
        
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found for the selected date' });
        }
        
        res.json(trips);
    } catch (error) {
        console.error("Error searching for bus routes:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/send-contact', async (req,res) => {
    const {id, nameSend, emailSend, phoneSend, titleSend, contentSend} = req.body;
    try {
        const contact = new ContactModel({
            maUser: id,
            name: nameSend,
            email: emailSend,
            phone: phoneSend,
            title: titleSend,
            content: contentSend,
        });
    
        await contact.save();
        res.json({ message: 'Contact information sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/tickets', async (req, res) => {
    const {
      maVeXe,
      tenKhachHang,
      phone,
      email,
      tenTuyenXe,
      tenChuyenXe,
      diemDon,
      diemTra,
      gioKhoiHanh,
      soLuongGhe,
      maGhe,
      giaVe,
      maChuyenXe,
      maKhachHang,
      trangThai,
      qrCode,
    } = req.body;
  
    try {
      const newTicket = new TicketModel({
        maVeXe,
        tenKhachHang,
        phone,
        email,
        tenTuyenXe,
        tenChuyenXe,
        diemDon,
        diemTra,
        gioKhoiHanh,
        soLuongGhe,
        maGhe,
        giaVe,
        maChuyenXe,
        maKhachHang,
        trangThai,
        qrCode,
      });
  
      await newTicket.save();
      res.status(201).json({ message: 'Payment successful' });
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.post('/update-seats-status', async (req, res) => {
    const { maChuyenXe, selectedSeats } = req.body;
  
    try {
      const chairBed = await ChairBedModel.findOne({ maChuyenXe });
      if (!chairBed) {
        return res.status(404).json({ message: 'Chair-Bed not found' });
      }
  
      chairBed.seat_map.forEach(seat => {
        if (selectedSeats.includes(seat.maGhe)) {
          seat.trangThai = "Đã đặt";
        }
      });
  
      await chairBed.save();
      res.status(200).json({ message: 'Seat status updated successfully' });
    } catch (error) {
      console.error("Error updating seat status:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/lookup-ticket', async (req, res) => {
    const { phone, maVeXe } = req.body;
    try {
      const ticket = await TicketModel.findOne({ phone, maVeXe });
      if (ticket) {
        res.json(ticket);
      } else {
        res.json(null);
      }
    } catch (error) {
      console.error("Error looking up ticket:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



//admin
app.get('/route-buses', async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/route-buses', async (req, res) => {
    const { diemDi, diemDen, loaiXe, quangDuong, thoiGianHanhTrinh, giaVe } = req.body;
    try {
      const newRoute = new RouteModel({
        diemDi,
        diemDen,
        loaiXe,
        quangDuong,
        thoiGianHanhTrinh,
        giaVe,
      });
      await newRoute.save();
      res.status(201).json(newRoute);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
app.listen(4000);