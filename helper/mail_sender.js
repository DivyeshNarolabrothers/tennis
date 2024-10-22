let nodemailer = require('nodemailer')


exports.sendMail = async (email, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nikunjnavapara1230@gmail.com',
                pass: 'onxvvptzdsswpeov',
            },
        });
        // Email content
        const mailOptions = {
            from: 'nikunjnavapara1230@gmail.com',
            to: email,
            subject: "Digi Pay Report",
            html: text
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info.response);


    } catch (error) {
        console.error('Error sending email:', error);
        // res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

// async function main(email, data, req, res) {
//     try {
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASSWORD,
//             },
//         });
//         var templte = await fs.readFileSync(path.resolve(__dirname, '../../views/email.ejs'), 'utf-8')
//         var complidtemplet = ejs.compile(templte)
//         const emailbody = complidtemplet({
//             data: data
//         })
//         console.log(email);
//         let info = await transporter.sendMail({
//             from: process.env.USER,
//             to: process.env.PASSWORD,
//             subject: "Table Cover",
//             text: "your order confirm",
//             html: emailbody
//         });

//         console.log("Message sent: %s", info.messageId);
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//         res.status(200).json({
//             status: true,
//             message: 'ok',
//             data

//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             status: false,
//             result: null,
//             message: error.message
//         })
//     }
// }


