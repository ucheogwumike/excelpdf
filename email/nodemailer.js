const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host:"email-smtp.us-east-2.amazonaws.com",
    port:465,
    secure:true,
    auth:{
        user:"AKIAXS3UFXFXUPEDSWEX",
        pass:"BHSbcwLb4oQ+meCuIkup0y+IF0K+R8W6vk1wFKQV9ABU"
    }

});

module.exports = {transporter};