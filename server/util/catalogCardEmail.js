const fs = require('fs')
const nodemailer = require('nodemailer')

const mailer = async function(emailAddres, pdfName, stream) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sedepti.devs@gmail.com', // generated ethereal user
      pass: 'suporte@sedepti' // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail(
    {
      from: '"Samantinha do Pop 👻" <sedepti.devs@gmail.com>', // sender address
      to: emailAddres, // list of receivers
      subject: 'Teste! ✔', // Subject line
      text: 'Oki.', // plain text body
      html: '<b>Hello world?</b>', // html body
      attachments: [
        {
          filename: pdfName,
          path: stream
        }
      ]
    },
    (err, info) => {
      if (err) {
        console.log(err)
      } 
      // else {
      //   console.log(info)
      // }
      fs.unlink('./assets/pdf_location/ficha.pdf', err => {
        if (err) {
          console.error(err)
        } else {
          console.log('cleared')
        }
      })
    }
  )

  // console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = mailer
