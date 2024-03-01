const express=require('express')
const path=require('path')
const monu=require('./models/monumentmodel')
const app=express();
const userRoute=require('./routes/userRoute')
const db=require('./db.js')
const cors=require('cors')
app.use(express.json());

const monuRoute=require('./routes/monuRoute')

app.use(cors(
  {
    origin: {"https://ticketless-entry-way-system-to-monuments.vercel.app/"},
    methods: {"POST", "GET", "DELETE", "PUT"},
    credentials: true
  }
));

app.use(monuRoute)
app.use(userRoute)

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,'/client/build')))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,"client","build","index.html"))
//     })
// }
// else{
//     app.get('/',(req,res)=>{
//         res.send(  'server working')
//     })
// }

const startServer = () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(5000, () => {
            console.log("Server listening on [^2^][6]");
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();

