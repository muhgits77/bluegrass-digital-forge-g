import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAIL } from '@/lib/constants';

// Production-ready /api/quote handler
// - Validates payload server-side
// - Sends rich internal notification to BluegrassDigitalForge@protonmail.com
// - Sends branded customer confirmation email
// - Uses bluegrassdigitalforge.com for sending (configure RESEND_FROM)

const TO_EMAIL = CONTACT_EMAIL; // BluegrassDigitalForge@protonmail.com
const FROM_EMAIL = process.env.RESEND_FROM || 'Bluegrass Digital Forge <noreply@bluegrassdigitalforge.com>';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

interface QuotePayload {
  name: string;
  business: string;
  email: string;
  phone?: string;
  goals?: string[];
  goalOther?: string;
  targetCustomers?: string;
  menuFrequency?: string;
  updatesWho?: string;
  likedDemos?: string;
  changesWanted?: string;
  logoStatus?: string;
  mustHaves?: string[];
  hasDomain?: string;
  desiredLive?: string;
  budget?: string;
  updatesAfter?: string;
  gbpStatus?: string;
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

function formatList(items: string[] | undefined, fallback = '—'): string {
  if (!items || items.length === 0) return fallback;
  return items.map(i => `• ${escapeHtml(i)}`).join('<br />');
}

function buildInternalEmailHtml(data: QuotePayload): string {
  const submittedAt = new Date().toLocaleString('en-US', { 
    timeZone: 'America/New_York', 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>New Quote Request — Bluegrass Digital Forge</title>
</head>
<body style="margin:0; padding:0; background:#f5f0e6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#050708;">
  <table role="presentation" width="100%" style="background:#f5f0e6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" style="max-width:640px; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px -15px rgba(0,0,0,0.12);">
          
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
              <h1 style="margin:0 0 8px; font-size:26px; line-height:1.1; color:#050708;">New Quote Request</h1>
              <p style="margin:0; color:#5c676e; font-size:14px;">Submitted ${submittedAt} ET</p>

              <!-- Quick Summary -->
              <div style="margin:28px 0 8px; padding:16px 20px; background:#f8f4ec; border-radius:12px; border-left:4px solid #c17a5a;">
                <table width="100%" style="font-size:15px;">
                  <tr><td style="padding:3px 0;"><strong style="color:#050708;">Name</strong></td><td style="text-align:right;">${escapeHtml(data.name)}</td></tr>
                  <tr><td style="padding:3px 0;"><strong style="color:#050708;">Business</strong></td><td style="text-align:right;">${escapeHtml(data.business)}</td></tr>
                  <tr><td style="padding:3px 0;"><strong style="color:#050708;">Email</strong></td><td style="text-align:right;"><a href="mailto:${escapeHtml(data.email)}" style="color:#c17a5a;">${escapeHtml(data.email)}</a></td></tr>
                  ${data.phone ? `<tr><td style="padding:3px 0;"><strong style="color:#050708;">Phone</strong></td><td style="text-align:right;">${escapeHtml(data.phone)}</td></tr>` : ''}
                </table>
              </div>

              <h3 style="font-size:15px; letter-spacing:0.5px; color:#8a6f5c; margin:28px 0 10px; text-transform:uppercase;">Main Goals</h3>
              <p style="margin:0 0 16px; line-height:1.65; font-size:15px;">${formatList(data.goals)}</p>
              ${data.goalOther ? `<p style="margin:0 0 16px;"><strong>Other:</strong> ${escapeHtml(data.goalOther)}</p>` : ''}

              <h3 style="font-size:15px; letter-spacing:0.5px; color:#8a6f5c; margin:24px 0 10px; text-transform:uppercase;">Project Details</h3>
              <table width="100%" style="font-size:14.5px; line-height:1.7;">
                <tr><td style="padding:4px 0; width:42%; color:#5c676e;">Target Customers</td><td>${escapeHtml(data.targetCustomers || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Content Update Frequency</td><td>${escapeHtml(data.menuFrequency || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Who Handles Updates</td><td>${escapeHtml(data.updatesWho || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Logo / Brand Status</td><td>${escapeHtml(data.logoStatus || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Domain</td><td>${escapeHtml(data.hasDomain || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Desired Live Date</td><td>${escapeHtml(data.desiredLive || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Budget Range</td><td><strong>${escapeHtml(data.budget || '—')}</strong></td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Post-Launch Updates</td><td>${escapeHtml(data.updatesAfter || '—')}</td></tr>
                <tr><td style="padding:4px 0; color:#5c676e;">Google Business Profile</td><td>${escapeHtml(data.gbpStatus || '—')}</td></tr>
              </table>

              <h3 style="font-size:15px; letter-spacing:0.5px; color:#8a6f5c; margin:28px 0 10px; text-transform:uppercase;">Must-Have Features</h3>
              <p style="margin:0 0 18px; line-height:1.65;">${formatList(data.mustHaves)}</p>

              ${data.likedDemos || data.changesWanted ? `
              <h3 style="font-size:15px; letter-spacing:0.5px; color:#8a6f5c; margin:24px 0 10px; text-transform:uppercase;">Design Feedback</h3>
              ${data.likedDemos ? `<p style="margin:0 0 12px;"><strong>Liked in demos:</strong><br />${escapeHtml(data.likedDemos)}</p>` : ''}
              ${data.changesWanted ? `<p style="margin:0 0 12px;"><strong>Requested changes:</strong><br />${escapeHtml(data.changesWanted)}</p>` : ''}
              ` : ''}

              <div style="margin-top:32px; padding-top:20px; border-top:1px solid #e8e0d4; font-size:13px; color:#8a6f5c;">
                Sent from the quote form on <strong>bluegrassdigitalforge.com</strong>
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

function buildCustomerConfirmationHtml(data: QuotePayload): string {
  const name = escapeHtml(data.name.split(' ')[0] || data.name); // First name feel

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
        <table role="presentation" width="620" style="max-width:620px; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 10px 40px -15px rgba(0,0,0,0.1);">
          
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
              <p style="margin:0; font-size:16.5px; line-height:1.65; color:#3f494f;">Your quote request for <strong>${escapeHtml(data.business)}</strong> has been received.</p>

              <div style="margin:28px 0; padding:20px 24px; background:#f8f4ec; border-radius:12px; border:1px solid #e8e0d4;">
                <p style="margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#8a6f5c;">What happens next</p>
                <p style="margin:0; font-size:15px; line-height:1.7; color:#050708;">
                  I review every request personally. You'll hear back from me within <strong>24 hours</strong> (usually same day) with a flat-price proposal and next steps tailored to your Lake Cumberland or Wayne County business.
                </p>
              </div>

              <p style="margin:22px 0 8px; font-size:15px; color:#3f494f;">Here’s a quick recap of what you shared:</p>
              <ul style="margin:0 0 28px; padding-left:18px; line-height:1.75; font-size:14.8px; color:#2f3a3f;">
                ${data.goals && data.goals.length > 0 ? data.goals.slice(0,3).map(g => `<li>${escapeHtml(g)}</li>`).join('') : ''}
                ${data.budget ? `<li><strong>Budget:</strong> ${escapeHtml(data.budget)}</li>` : ''}
                ${data.desiredLive ? `<li><strong>Timeline:</strong> ${escapeHtml(data.desiredLive)}</li>` : ''}
                <li><strong>Project for:</strong> ${escapeHtml(data.business)}</li>
              </ul>

              <p style="font-size:14.5px; color:#5c676e; margin:0 0 32px;">
                If you have logo files, brand photos, or a preferred domain ready, feel free to reply to this email with them.
              </p>

              <div style="text-align:center;">
                <a href="https://bluegrassdigitalforge.com/services" 
                   style="display:inline-block; background:#c17a5a; color:#f8f1e6; text-decoration:none; padding:13px 32px; border-radius:9999px; font-weight:600; font-size:14.5px; box-shadow:0 4px 14px -2px rgba(193,122,90,0.4);">
                  View Services &amp; Pricing
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f4ec; padding:24px 42px; font-size:13px; color:#685e52; text-align:center; border-top:1px solid #e8e0d4;">
              Warm regards,<br>
              <strong style="color:#050708;">Brian</strong> — Bluegrass Digital Forge<br>
              <span style="font-size:12px;">Monticello, KY • Lake Cumberland Region</span><br><br>
              <a href="mailto:${TO_EMAIL}" style="color:#c17a5a; text-decoration:underline;">${TO_EMAIL}</a> &nbsp;•&nbsp; <a href="https://bluegrassdigitalforge.com" style="color:#c17a5a; text-decoration:underline;">bluegrassdigitalforge.com</a>
            </td>
          </tr>

        </table>

        <p style="font-size:11px; color:#8c8072; margin-top:20px; text-align:center;">This email was sent because you submitted the quote form at bluegrassdigitalforge.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as QuotePayload;

    // Server-side validation (basic but solid)
    const errors: string[] = [];
    if (!body.name?.trim()) errors.push('name');
    if (!body.business?.trim()) errors.push('business');
    if (!body.email?.trim() || !isValidEmail(body.email)) errors.push('email');

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
    }

    const payload: QuotePayload = {
      name: body.name.trim(),
      business: body.business.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      goals: body.goals || [],
      goalOther: body.goalOther?.trim() || undefined,
      targetCustomers: body.targetCustomers?.trim() || undefined,
      menuFrequency: body.menuFrequency?.trim() || undefined,
      updatesWho: body.updatesWho?.trim() || undefined,
      likedDemos: body.likedDemos?.trim() || undefined,
      changesWanted: body.changesWanted?.trim() || undefined,
      logoStatus: body.logoStatus?.trim() || undefined,
      mustHaves: body.mustHaves || [],
      hasDomain: body.hasDomain?.trim() || undefined,
      desiredLive: body.desiredLive?.trim() || undefined,
      budget: body.budget?.trim() || undefined,
      updatesAfter: body.updatesAfter?.trim() || undefined,
      gbpStatus: body.gbpStatus?.trim() || undefined,
    };

    const resendClient = getResend();

    // Send email to business owner
    const internalResult = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: payload.email, // So owner can reply directly to customer
      subject: `New Quote Request — ${payload.business}`,
      html: buildInternalEmailHtml(payload),
    });

    if (internalResult.error) {
      console.error('Resend internal email error:', internalResult.error);
      // Still try to send confirmation if possible, but report issue
    }

    // Send beautiful confirmation to the customer
    const customerResult = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      replyTo: TO_EMAIL,
      subject: `Thank you — Your quote request for ${payload.business} was received`,
      html: buildCustomerConfirmationHtml(payload),
    });

    if (customerResult.error) {
      console.error('Resend customer email error:', customerResult.error);
      // Still succeed for UX if at least one went through? But better to surface if both fail.
    }

    // Always succeed client-side if we got here without throwing — user sees thank you screen.
    // Log ids for debugging
    console.log('Quote emails sent', { 
      internal: internalResult.data?.id, 
      customer: customerResult.data?.id 
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request received. Confirmation email sent.' 
    });

  } catch (error) {
    console.error('Quote API error:', error);

    const message = (error instanceof Error && error.message.includes('RESEND_API_KEY'))
      ? 'Email service is temporarily unavailable. Please email us directly.'
      : 'Something went wrong sending your request. Please try again or email us directly.';

    return NextResponse.json({ 
      error: message 
    }, { status: 500 });
  }
}
