const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // or 465
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready");
  }
});



async function sendMail({ customerEmail, customerName, amount, filtercart }) {
  const mailOptions = {
    from: process.env.GMAIL,
    to: customerEmail,
    subject: `Payment Confirmation - ${customerName}`,
    html: `
      <div style='font-family: Arial; background:#f5f5f5; padding:20px;'>
        <div style='text-align:center; background:#444; padding:15px;'>
          <h3 style='color:white; margin:0; font-size:28px; letter-spacing:1px;'>
            Link Styles
          </h3>
        </div>

        <div style='max-width:600px; margin:20px auto; background:#fff; padding:20px; border-radius:8px;'>
          <p>Hello <strong>${customerName}</strong>,</p>

          <p style='color:green;'>Your payment of <strong>₦${amount}</strong> was received successfully.</p>

          <h4>🛒 Order Details</h4>

          ${filtercart
            .map(
              (item, i) => `
            <div style='display:flex; margin-bottom:15px;'>
              <img src='${item.goodsImage}' width='80' style='border-radius:5px; margin-right:10px;'>
              <div>
                <p><strong>${i + 1}. ${item.goodsName}</strong></p>
                <p>₦${item.goodsPrice} × ${item.goodsQuantity}</p>
                <p><b>Total: ₦${item.goodsPrice * item.goodsQuantity}</b></p>
              </div>
            </div>
          `
            )
            .join('')}

          <p>Thank you for shopping with us!</p>
        </div>

        <div style='text-align:center; font-size:12px; color:#888;'>
          © ${new Date().getFullYear()} Link Styles.
        </div>
      </div>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${customerEmail}: ${info.response}`);
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
}


async function sendCompanyMail({ companyEmail, customerEmail, customerName, amount, filtercart }) {
  const mailOptions = {
    from: process.env.GMAIL,
    to: companyEmail,
    subject: `📦 New Order - ${customerName}`,
    html: `
      <div style='font-family:Arial; padding:20px; background:#fafafa;'>
        <h2>New Order Received</h2>

        <p><b>Customer:</b> ${customerName}</p>
        <p><b>Email:</b> ${customerEmail}</p>
        <p><b>Order Total:</b> ₦${amount}</p>

        <h3>🛒 Order Summary:</h3>
        <ul style='list-style:none; padding:0;'>
          ${filtercart
            .map(
              (item, i) => `
            <li style='display:flex; margin-bottom:10px;'>
              <img src='${item.goodsImage}' width='80' style='border-radius:5px; margin-right:10px;'>
              <div>
                <p><strong>${i + 1}. ${item.goodsName}</strong></p>
                <p>₦${item.goodsPrice} × ${item.goodsQuantity}</p>
              </div>
            </li>
          `
            )
            .join('')}
        </ul>

        <p><b>Total:</b> ₦${amount}</p>
        <p style='font-size:13px; color:#777;'>Automated notification.</p>
      </div>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`📧 Company mail sent to ${companyEmail}: ${info.response}`);
  } catch (err) {
    console.error('❌ Company email sending failed:', err);
  }
}





async function RegistrationMail({
  first_name,
  lastname,
  middle_name,
  email,
  phone_number,
  address,
  city,
  state,
  country,
}) {
  // ========= 1️⃣ User Welcome Email ==========
  const userMailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: `Welcome to Medic's Health!`,
    html: `
      <div style='font-family:Arial; color:#333;'>
        <h2 style='color:#2d89ef;'>Welcome, ${first_name}!</h2>

        <p>Dear <b>${first_name} ${lastname}</b>,</p>

        <p>Your account has been successfully created on <b>Medic's Health</b>.</p>

        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> Not shown for security reasons.</p>

        <p>You can now login and continue your journey with us.</p>

        <p style='margin-top:20px;'>Best regards,<br>Medic's Health Team</p>
      </div>
    `,
  };

  // ========= 2️⃣ Admin Notification Email ==========
  const adminMailOptions = {
    from: process.env.GMAIL,
    to: process.env.COMPANYMAIL,
    subject: `🆕 New User Registration – ${first_name} ${lastname}`,
    html: `
      <div style='font-family:Arial; color:#333;'>
        <h3>New User Registered</h3>

        <p><b>Name:</b> ${first_name} ${middle_name || ''} ${lastname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone_number}</p>

        <p><b>Address:</b> ${address}, ${city}, ${state}, ${country}</p>

        <p><b>Registered On:</b> ${new Date().toLocaleString()}</p>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    console.log('✅ Registration emails sent.');
  } catch (error) {
    console.error('❌ Error sending registration emails:', error);
  }
}


module.exports = {
  sendMail,
  sendCompanyMail,
  RegistrationMail,
};
