const nodemailer = require('nodemailer')

const sendEmail = (emailIds,subject,text,html)=> {

    let userEmails = "";

    emailIds.forEach((email,i) =>{
        if(i==0){
            userEmails += email
        }else{
            userEmails +=", ";
            userEmails +=email;
        }
    });

    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"temporaryharshal@gmail.com",
            pass: "pimxlhbpkwjowmsg"
        }
    });

    let mailDetails = {
        from:"temporaryharshal@gmail.com",
        to:userEmails,
        subject: subject
    }

    if(html) {
        mailDetails.html = html;
    }

    if(text) {
        mailDetails.text = text;
    }

    mailTransporter.sendMail(mailDetails, (err,data)=>{
        if(err) {
            console.log("Error occured while sending mail", error);
        } else {
            console.log("Email sent successfully");
        }
    })
   
}

module.exports = {
    sendEmail
}