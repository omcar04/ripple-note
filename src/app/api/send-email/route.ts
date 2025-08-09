export const runtime = "nodejs";

import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const {recipients, subject, emailContent} = await req.json();

        if (!recipients?.length) {
            return NextResponse.json({error: 'No recipients provided'}, {status: 400});
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Format email nicely
        const formattedEmail = `
            <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <div style="background-color: #048998; color: white; padding: 16px; font-size: 20px; font-weight: bold;">
                        ${subject || 'Meeting Summary'}
                    </div>

                    <!-- Body -->
                    <div style="padding: 20px; color: #333; line-height: 1.5;">
                        ${emailContent
            .replace(/\n\s*\n/g, '</p><p>') // Paragraph breaks
            .replace(/\n/g, '<br/>')        // Single line breaks
            .replace(/^/, '<p>')            // Start with <p>
            .concat('</p>')                 // End with </p>
        }
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f1f3f5; padding: 12px; text-align: center; font-size: 12px; color: #666;">
                        Sent with RippleꕀNote • ${new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>
        `;

        // Send mail
        const info = await transporter.sendMail({
            from: `"RippleNote" <${process.env.EMAIL_USER}>`,
            to: recipients.join(','),
            subject: subject || 'Meeting Summary',
            html: formattedEmail
        });

        return NextResponse.json({success: true, messageId: info.messageId});
    } catch (error: unknown) {
        console.error('Email send failed:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({error: message}, {status: 500});
    }

}
