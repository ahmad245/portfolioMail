const {Contact,validate}=require('../../model/contact/contact');
const config=require('config');
const nodemailer = require('nodemailer');
module.exports.post=async(req,res)=>{
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
       
        user: config.get('email'),
        pass: config.get('pass')
      }
    });
    mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      to: config.get('email'),
    //   to: GMAIL_USER,
      subject: 'New message from contact form at tylerkrys.ca',
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
          console.log(error);
        res.send('contact-failure');
      }
      else {
        res.send('contact-success');
      }
    });
}
  
// module.exports.post=async(req,res)=>{
//     const {error}=validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
  
//     const contact=new Contact(req.body);
//     await contact.save();

//     res.send(contact);

// }

