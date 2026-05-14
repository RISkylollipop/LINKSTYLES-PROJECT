// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465, // or 465
//   secure: true, // true for 465, false for 587
//   auth: {
//     user: process.env.GMAIL,
//     pass: process.env.GMAILPASS,
//   },
// });

const {Resend} = require(`resend`);
require('dotenv').config();

const resendKey = process.env.RESEND_API_KEY

const resend = new Resend(resendKey)

const fromOrder = 'Linkstyles <orders@mail.kwarapolydata.com.ng>'
const fromRegistration = 'Linkstyles <support@mail.kwarapolydata.com.ng>'



async function sendMail({ customerEmail, customerName, amount, filtercart }) {

  try {
  const {data, error} = await resend.emails.send({
    from: fromOrder,
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
  });

  
    if (data) {
      console.log(`📧 Email sent to ${customerEmail}: ${data}`);
      
    }
    else if(error){
      console.log(`Error Sending Email`, error);
      
    }
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
}


async function sendCompanyMail({ companyEmail, customerEmail, customerName, amount, filtercart }) {
  try {
  
  const {data, error} = await resend.emails.send({
    from: fromOrder,
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
  });

 
    if (data) {
      console.log(`📧 Company mail sent to ${companyEmail}: ${data}`);
    }else{
      console.log(`Resend Error`, error);
      
    }
  } catch (err) {
    console.error('❌ Company email sending failed:', err);
  }
}


const frontendURL = process.env.ALLOWED_ORIGINS
const BASE_URL = process.env.BASE_URL

async function RegistrationMail({
  first_name, lastname, middle_name,
  email, phone_number, address, city, state, country,
}) {
  try {
    // Fetch products for welcome email
    const res = await fetch(`${BASE_URL}/api/v1/clothes`);
    const products = await res.json();
    const featured = products.slice(0, 5);

    const productCards = featured.map(p => `
      <div style="display:inline-block; width:160px; margin:10px; vertical-align:top;
                  background:#fff; border-radius:12px; overflow:hidden;
                  box-shadow:0 2px 8px rgba(0,0,0,0.1); text-align:center;">
        <img src="${p.image1}" alt="${p.productName}"
             style="width:100%; height:100px; object-fit:cover;"/>
        <div style="padding:10px;">
          <p style="font-size:13px; font-weight:bold; margin:0 0 4px; color:#222;">
            ${p.productName}
          </p>
          <p style="font-size:13px; color:#e63946; font-weight:bold; margin:0 0 8px;">
            ₦${Number(p.price).toLocaleString()}
          </p>
          <a href="${frontendURL}"
             style="background:#222; color:#fff; padding:6px 14px;
                    border-radius:20px; font-size:12px; text-decoration:none;">
            Shop Now
          </a>
        </div>
      </div>
    `).join('');

    // User welcome email
    const { error: userError } = await resend.emails.send({
      from:fromRegistration,
      to: email,
      subject: `Welcome to Linkstyles, ${first_name}! 🎉`,
      html: `
        <div style="font-family:Arial; background:#f4f4f4; margin:0; padding:0;">
          <div style="background:#111; padding:24px; text-align:center;">
            <h1 style="color:#fff; margin:0; font-size:32px; letter-spacing:3px;">
              LINK<span style="color:#e63946;">STYLES</span>
            </h1>
            <p style="color:#aaa; margin:6px 0 0; font-size:13px;">FASHION THAT SPEAKS</p>
          </div>

          <div style="background:linear-gradient(135deg,#1a1a2e,#16213e); padding:40px 24px; text-align:center;">
            <h2 style="color:#fff; font-size:26px; margin:0 0 10px;">Welcome, ${first_name}! 🎉</h2>
            <p style="color:#ccc; font-size:15px; margin:0 0 24px;">
              Your account is ready. Explore the latest styles handpicked for you.
            </p>
            <a href="${frontendURL}"
               style="background:#e63946; color:#fff; padding:14px 32px;
                      border-radius:30px; text-decoration:none; font-size:15px;
                      font-weight:bold; letter-spacing:1px;">
              START SHOPPING →
            </a>
          </div>

          <div style="padding:30px 16px; text-align:center;">
            <h3 style="font-size:18px; color:#111; margin:0 0 6px;">🔥 Trending Right Now</h3>
            <p style="color:#888; font-size:13px; margin:0 0 20px;">Don't miss out on these hot picks</p>
            ${productCards}
          </div>

          <div style="background:#e63946; padding:24px; text-align:center;">
            <p style="color:#fff; font-size:16px; margin:0 0 12px; font-weight:bold;">
              🎁 New members get FREE delivery on first order!
            </p>
            <a href="${frontendURL}"
               style="background:#fff; color:#e63946; padding:12px 28px;
                      border-radius:30px; text-decoration:none; font-size:14px; font-weight:bold;">
              CLAIM YOUR PERK
            </a>
          </div>

          <div style="background:#111; padding:20px; text-align:center;">
            <p style="color:#666; font-size:12px; margin:0;">
              © ${new Date().getFullYear()} Linkstyles Nigeria. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (userError) console.error('❌ Welcome email error:', userError);
    else console.log(`📧 Welcome email sent to ${email}`);

    // Admin notification email

    const { error: adminError } = await resend.emails.send({
      from: fromRegistration,
      to: process.env.COMPANYMAIL,
      subject: `🆕 New User Registration – ${first_name} ${lastname}`,
      html: `
        <div style="font-family:Arial; color:#333; padding:20px;">
          <h3>New User Registered</h3>
          <p><b>Name:</b> ${first_name} ${middle_name || ''} ${lastname}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone_number}</p>
          <p><b>Address:</b> ${address}, ${city}, ${state}, ${country}</p>
          <p><b>Registered On:</b> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    if (adminError) console.error('❌ Admin notification error:', adminError);
    else console.log(`📧 Admin notified of new registration`);

  } catch (err) {
    console.error('❌ RegistrationMail failed:', err);
  }
}


module.exports = {
  sendMail,
  sendCompanyMail,
  RegistrationMail,
};
