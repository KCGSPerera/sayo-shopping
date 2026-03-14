import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { fullName, email, phone1, phone2, address, description } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Sayoshopping <onboarding@resend.dev>',
            to: ['nawanjanase2001@gmail.com'],
            subject: `New Inquiry from ${fullName}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #111; border-bottom: 2px solid #111; padding-bottom: 10px;">New Website Inquiry</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone 1:</strong> ${phone1}</p>
          <p><strong>Phone 2:</strong> ${phone2 || 'N/A'}</p>
          <p><strong>Address:</strong> ${address}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${description}</p>
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">This inquiry was sent from the Sayoshopping website contact form.</p>
        </div>
      `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        console.error('API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
