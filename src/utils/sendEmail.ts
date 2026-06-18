import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (toEmail: string, name: string): Promise<void> => {
  console.log('📧 Attempting to send email to:', toEmail);
  console.log('📧 EMAIL_USER configured:', process.env.EMAIL_USER ? 'YES' : 'NO — MISSING!');
  console.log('📧 EMAIL_APP_PASSWORD configured:', process.env.EMAIL_APP_PASSWORD ? 'YES' : 'NO — MISSING!');

  try {
    const info = await transporter.sendMail({
      from: `"Zentrix" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Welcome to Zentrix! 🎓',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
          <h2>Welcome, ${name}!</h2>
          <p>Your Zentrix account is ready. Start managing tasks, taking notes, and using AI to study smarter.</p>
          <p>Happy studying!</p>
        </div>
      `,
    });
    console.log(`✅ Welcome email sent to ${toEmail} — messageId: ${info.messageId}`);
  } catch (error) {
    console.error('❌ Email send error:', error);
  }

};