import nodemailer from 'nodemailer';
import logger from './logger.js';

// Create transporter based on environment
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production: Use real email service (Gmail, SendGrid, Mailgun, etc.)
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    // Development: Use Ethereal (fake SMTP for testing)
    // Or you can configure your own test email service
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
};

const transporter = createTransporter();

// Welcome email template
const getWelcomeEmailTemplate = (name) => {
  return {
    subject: 'Welcome to Our E-Commerce Store! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome Aboard! 🚀</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}! 👋</h2>
            <p>Thank you for joining our E-Commerce Store! We're thrilled to have you as part of our community.</p>
            <p>Your account has been successfully created, and you're now ready to explore amazing products and exclusive deals.</p>
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Browse our featured products</li>
              <li>Add items to your cart</li>
              <li>Enjoy secure checkout</li>
              <li>Track your orders</li>
            </ul>
            <div style="text-align: center;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" class="button">Start Shopping</a>
            </div>
            <p>If you have any questions or need assistance, our support team is always here to help!</p>
            <p>Happy Shopping! 🛍️</p>
            <p>Best regards,<br><strong>The E-Commerce Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 E-Commerce Store. All rights reserved.</p>
            <p>This email was sent because you created an account on our platform.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hi ${name}!
      
      Welcome to our E-Commerce Store! 🎉
      
      Thank you for joining us! We're excited to have you as part of our community.
      
      Your account has been successfully created, and you're now ready to explore amazing products and exclusive deals.
      
      What's next?
      - Browse our featured products
      - Add items to your cart
      - Enjoy secure checkout
      - Track your orders
      
      If you have any questions or need assistance, our support team is always here to help!
      
      Happy Shopping! 🛍️
      
      Best regards,
      The E-Commerce Team
      
      © 2026 E-Commerce Store. All rights reserved.
    `,
  };
};

// Order confirmation email template
const getOrderConfirmationTemplate = (name, orderId, total) => {
  return {
    subject: `Order Confirmation - #${orderId} ✅`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Thank You for Your Order! 🎉</h2>
          <p>Hi ${name},</p>
          <p>Your order has been successfully placed!</p>
          <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Total Amount:</strong> $${total}</p>
          </div>
          <p>We'll send you another email when your order ships.</p>
          <p>Best regards,<br>The E-Commerce Team</p>
        </div>
      </body>
      </html>
    `,
    text: `Thank you for your order, ${name}! Order ID: #${orderId}, Total: $${total}`,
  };
};

// Send email function
export const sendEmail = async (to, template) => {
  try {
    const mailOptions = {
      from: `"E-Commerce Store" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully', { to, subject: template.subject, messageId: info.messageId });
    
    // Log preview URL for development (Ethereal)
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Preview URL', { url: nodemailer.getTestMessageUrl(info) });
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Failed to send email', { to, error: error.message, stack: error.stack });
    return { success: false, error: error.message };
  }
};

// Send welcome email
export const sendWelcomeEmail = async (to, name) => {
  const template = getWelcomeEmailTemplate(name);
  return await sendEmail(to, template);
};

export default { sendEmail, sendWelcomeEmail };
