import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAIL, SITE_URL } from '@/lib/constants';

// Production-ready /api/contact handler
// - Validates payload server-side
// - Sends rich internal notification to CONTACT_EMAIL
// - Sends branded customer confirmation email
// - Uses bluegrassdigitalforge.com for sending (configure RESEND_FROM)
// - Mirrors the robust setup from /api/quote

const TO_EMAIL = CONTACT_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM || 'Bluegrass Digital Forge <noreply@bluegrassdigitalforge.com>';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

interface ContactPayload {
  name: string;
  business?: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildInternalEmailHtml(data: ContactPayload): string {
  const submittedAt = new Date().toLocaleString('en-US', { 
    timeZone: 'America/New_York', 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  });

  const businessLine = data.business?.trim() 
    ? `<tr><td style="padding:3px 0;"><strong style="color:#050708;">Business</strong></td><td style="text-align:right;">${escapeHtml(data.business)}</td></tr>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>New Contact Message — Bluegrass Digital Forge</title>
</head>
<body style="margin:0; padding:0; background:#f5f0e6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#050708;">
  <table role="presentation" width="100%" style="background:#f5f0e6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" style="max-width:620px; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px -15px rgba(0,0,0,0.12);">
          
          <!-- Header -->
          <tr>
            <td style="background:#050708; padding:28px 32px; text-align:center;">
              <div style="font-family:Georgia, 'Playfair Display', serif; font-size:22px; color:#f5f0e6; letter-spacing:-0.3px;">
                Bluegrass Digital Forge
              </div>
              <div style="color:#c17a5a; font-size:12px; letter-spacing:2px; margin-top:4px; text-transform:uppercase;">
                MONTICELLO, KY • LAKE CUMBERLAND
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 40px 20px;">
              <h1 style="margin:0 0 8px; font-size:26px; line-height:1.1; color:#050708;">New Contact Message</h1>
              <p style="margin:0; color:#5c676e; font-size:14px;">Submitted ${submittedAt} ET</p>

              <!-- Quick Summary -->
              <div style="margin:28px 0 8px; padding:16px 20px; background:#f8f4ec; border-radius:12px; border-left:4px solid #c17a5a;">
                <table width="100%" style="font-size:15px;">
                  <tr><td style="padding:3px 0;"><strong style="color:#050708;">Name</strong></td><td style="text-align:right;">${escapeHtml(data.name)}</td></tr>
                  ${businessLine}
                  <tr><td style="padding:3px 0;"><strong style="color:#050708;">Email</strong></td><td style="text-align:right;"><a href="mailto:${escapeHtml(data.email)}" style="color:#c17a5a;">${escapeHtml(data.email)}</a></td></tr>
                </table>
              </div>

              <h3 style="font-size:15px; letter-spacing:0.5px; color:#8a6f5c; margin:28px 0 10px; text-transform:uppercase;">Message</h3>
              <div style="background:#f8f4ec; padding:18px 20px; border-radius:12px; font-size:15px; line-height:1.7; white-space:pre-wrap;">${escapeHtml(data.message)}</div>

              <div style="margin-top:32px; padding-top:20px; border-top:1px solid #e8e0d4; font-size:13px; color:#8a6f5c;">
                Sent from the contact form on <strong>bluegrassdigitalforge.com</strong>
              </div>
            </td>
          </tr>

          <!-- Footer CTA -->
          <tr>
            <td style="background:#f8f4ec; padding:20px 40px; font-size:13px; color:#5c676e; text-align:center;">
              Reply directly to this email or reach the customer at <a href="mailto:${escapeHtml(data.email)}" style="color:#c17a5a;">${escapeHtml(data.email)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCustomerConfirmationHtml(data: ContactPayload): string {
  const name = escapeHtml(data.name.split(' ')[0] || data.name);
  const business = data.business?.trim() ? ` for <strong>${escapeHtml(data.business)}</strong>` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Thank you — Bluegrass Digital Forge</title>
</head>
<body style="margin:0; padding:0; background:#f5f0e6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#050708;">
  <table role="presentation" width="100%" style="background:#f5f0e6; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" style="max-width:600px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 10px 40px -15px rgba(0,0,0,0.1);">
          
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(145deg, #050708, #0c1210); padding:32px 36px; text-align:center;">
              <div style="color:#f5f0e6; font-size:21px; letter-spacing:-0.4px; font-family:Georgia, serif;">Bluegrass Digital Forge</div>
              <div style="margin-top:6px;">
                <span style="background:#c17a5a; color:#050708; font-size:10px; padding:2px 11px; border-radius:999px; letter-spacing:1.5px; font-weight:600;">KENTUCKY CRAFTED</span>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:42px 42px 30px;">
              <h1 style="margin:0 0 12px; font-size:28px; line-height:1.1; color:#050708;">Thank you, ${name}.</h1>
              <p style="margin:0; font-size:16.5px; line-height:1.65; color:#3f494f;">I received your message${business}.</p>

              <div style="margin:28px 0; padding:20px 24px; background:#f8f4ec; border-radius:12px; border:1px solid #e8e0d4;">
                <p style="margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#8a6f5c;">What happens next</p>
                <p style="margin:0; font-size:15px; line-height:1.7; color:#050708;">
                  I review every message personally from Monticello. You'll hear back within <strong>24 hours</strong> (usually same day).
                </p>
              </div>

              <p style="font-size:14.5px; color:#5c676e; margin:0 0 32px;">
                In the meantime, feel free to explore the site or reply to this email with any additional details, photos, or links.
              </p>

              <div style="text-align:center;">
                <a href="${SITE_URL}/quote" 
                   style="display:inline-block; background:#c17a5a; color:#f8f1e6; text-decoration:none; padding:13px 32px; border-radius:9999px; font-weight:600; font-size:14.5px; box-shadow:0 4px 14px -2px rgba(193,122,90,0.4);">
                  Get a Custom Quote
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f4ec; padding:24px 42px; font-size:13px; color:#685e52; text-align:center; border-top:1px solid #e8e0d4;">
              Warm regards,<br>
              <strong style="color:#050708;">Brian</strong> — Bluegrass Digital Forge<br>
              <span style="font-size:12px;">Monticello, KY • Lake Cumberland Region</span><br><br>
              <a href="mailto:${TO_EMAIL}" style="color:#c17a5a; text-decoration:underline;">${TO_EMAIL}</a> &nbsp;•&nbsp; <a href="${SITE_URL}" style="color:#c17a5a; text-decoration:underline;">bluegrassdigitalforge.com</a>
            </td>
          </tr>

        </table>

        <p style="font-size:11px; color:#8c8072; margin-top:20px; text-align:center;">This email was sent because you contacted us at bluegrassdigitalforge.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload;

    // Server-side validation
    const errors: string[] = [];
    if (!body.name?.trim()) errors.push('name');
    if (!body.email?.trim() || !isValidEmail(body.email)) errors.push('email');
    if (!body.message?.trim()) errors.push('message');

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    const payload: ContactPayload = {
      name: body.name.trim(),
      business: body.business?.trim() || undefined,
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
    };

    const resendClient = getResend();

    // Send email to business owner (internal notification)
    const internalResult = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: payload.email,
      subject: `New Contact from ${payload.name}${payload.business ? ` — ${payload.business}` : ''}`,
      html: buildInternalEmailHtml(payload),
    });

    if (internalResult.error) {
      console.error('Resend internal contact email error:', internalResult.error);
    }

    // Send beautiful confirmation to the customer
    const customerResult = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      replyTo: TO_EMAIL,
      subject: `Thank you — I received your message`,
      html: buildCustomerConfirmationHtml(payload),
    });

    if (customerResult.error) {
      console.error('Resend customer contact email error:', customerResult.error);
    }

    console.log('Contact emails sent', { 
      internal: internalResult.data?.id, 
      customer: customerResult.data?.id 
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Message received. Confirmation email sent.' 
    });

  } catch (error) {
    console.error('Contact API error:', error);

    const message = (error instanceof Error && error.message.includes('RESEND_API_KEY'))
      ? 'Email service is temporarily unavailable. Please email us directly.'
      : 'Something went wrong sending your message. Please try again or email us directly.';

    return NextResponse.json({ 
      error: message 
    }, { status: 500 });
  }
}
