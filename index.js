const express = require('express');
const cors = require('cors')
const jobj = require('json2xls');
const fs = require('fs');
const fsasync = require('fs/promises');
const path = require('node:path');
const  {jsPDF}  = require("jspdf"); 
require('jspdf-autotable');// will automatically load the node version

const docy = new jsPDF();
const time = Date.now();

const app = express();
const port = 4000;
const sendmail = require('./email/nodemailer')

app.use(cors());
// app.use(express.static(path.join(__dirname, '/uploads')));
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 

app.post('/excel',async(req,res)=>{


    try {

        var xls = jobj(req.body.data);
    fs.writeFileSync(`${req.body.email}${time}.xlsx`,xls,'binary');
    

    const q = path.resolve(`${req.body.email}${time}.xlsx`);

    const mail =  sendmail.transporter.sendMail({
     from: 'support@xtratechgs.com', // sender address
     to: `${req.body.email}`, // list of receivers
     subject: "Hello ✔", // Subject line
     // text: "Hello world?", // plain text body
     html: "<p>Hello world?</p>", // html body
     attachments:[{
         path: q
     }]
     }
     )
     res.status(200).json({message:"the document will be sent to your email...thanks"})
        
    } catch (error) {
        res.status(400).json({error})
    }
 
    
 
})



app.post('/pdf',async(req,res)=>{

    try {

        const info = []
    const mation =[]
   const json = req.body.data
const keys = Object.keys(json[0])
console.log(keys)
json.forEach((x)=>{
keys.forEach((y)=>{
   mation.push(x[y]) 
})
info.push(mation)
})
console.log(info)
docy.autoTable({
    // styles:{cellWidth:5,overflow:'visible},
    head: [keys],
  body: [mation],
})
docy.save(`${req.body.email}${time}.pdf`);


    const q = path.resolve(`${req.body.email}${time}.pdf`);

   const mail =  sendmail.transporter.sendMail({
    from: 'support@xtratechgs.com', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<p>Hello world?</p>", // html body
    attachments:[{
        path: q
    }]
    }
    )
    res.status(200).json({message:"the document will be sent to your email...thanks"})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
    
})


 app.listen(port,()=>{
    console.log(`live on port ${port}`)
 })