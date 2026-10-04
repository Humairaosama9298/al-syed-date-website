import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }

    // Send email
    await transporter.sendMail({
      from: `"Alsyed Brothers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'info@alsyedbrothers.com',
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}
