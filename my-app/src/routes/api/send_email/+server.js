// src/routes/api/send-email/+server.js

import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return json({ error: 'Missing required fields: name, email, message' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Message <noreply@zoetsai.com>',
      to: ['zoe.tsai@gmail.com'],
      subject: `New Message from ${name}`,
      html: `<div>
        <h1>Contact Form Submission</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>`,
      reply_to: email
    });

    if (error) {
      console.error({ error });
      return json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return json({ message: 'Email sent successfully!', id: data.id });
  } catch (e) {
    console.error(e);
    return json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}