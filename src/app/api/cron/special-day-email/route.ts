import { NextRequest, NextResponse } from 'next/server';
import { specialDates } from '@/data/specialDates';

export const runtime = 'nodejs';

const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqedwoao';
const TIMEZONE = 'Africa/Nairobi';
const ONE_OFF_BELATED_ID = 'belated-mar1-2026';
const ONE_OFF_BELATED_ALLOWED_DATE = '2026-03-03';

function getNairobiDateInfo(now = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === 'year')?.value ?? '';
  const month = parts.find((p) => p.type === 'month')?.value ?? '';
  const day = parts.find((p) => p.type === 'day')?.value ?? '';
  const key = `${month}-${day}`;

  const readable = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  return {
    key,
    readable,
    isoDate: `${year}-${month}-${day}`,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml(args: {
  title: string;
  subtitle?: string;
  dateLabel: string;
  message: string;
}) {
  const { title, subtitle, dateLabel, message } = args;

  const safeTitle = escapeHtml(title);
  const safeSubtitle = subtitle ? escapeHtml(subtitle) : '';
  const safeDate = escapeHtml(dateLabel);
  const safeMessage = escapeHtml(message);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Rocher → Rachael | ${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f4ef;font-family:Arial,sans-serif;color:#2f2a24;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border:1px solid #ebe4db;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:22px 24px;background:linear-gradient(135deg,#f4e3c6,#ead4ae);">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6d5532;">From Rocher to Rachael</p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:#2f2a24;">A special-day note for you</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 12px;font-size:13px;color:#8b7456;">This was sent automatically by ray-of-solace because today is one of your meaningful dates.</p>
                <h2 style="margin:0 0 8px;font-size:20px;color:#2f2a24;">${safeTitle}</h2>
                ${safeSubtitle ? `<p style="margin:0 0 12px;font-size:14px;color:#6c5d4b;">${safeSubtitle}</p>` : ''}
                <p style="margin:0 0 16px;padding:10px 12px;background:#f8f3ec;border-left:4px solid #d6b98f;border-radius:6px;font-size:14px;color:#4a4034;"><strong>Special day:</strong> ${safeDate}</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#2f2a24;">${safeMessage}</p>
                <p style="margin:18px 0 0;font-size:15px;line-height:1.6;color:#2f2a24;">
                  With love,<br />
                  <strong>Your amazing boyfriend and projects partner,</strong><br />
                  <strong>Rocher</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;

  const token = authHeader.slice('Bearer '.length).trim();
  return token === secret;
}

function getSpecialDayEndpoints(): string[] {
  const list = process.env.FORMSPREE_SPECIAL_DAY_ENDPOINTS;
  if (list) {
    const parsed = list
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (parsed.length > 0) {
      return [...new Set(parsed)];
    }
  }

  return [process.env.FORMSPREE_SPECIAL_DAY_ENDPOINT ?? DEFAULT_FORMSPREE_ENDPOINT];
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized cron call.' }, { status: 401 });
  }

  const { key, readable, isoDate } = getNairobiDateInfo();
  const requestedKey = req.nextUrl.searchParams.get('overrideDateKey')?.trim();
  const oneOffId = req.nextUrl.searchParams.get('oneOff')?.trim();

  if (requestedKey && oneOffId !== ONE_OFF_BELATED_ID) {
    return NextResponse.json(
      {
        ok: false,
        sent: false,
        error: 'overrideDateKey requires a valid oneOff token.',
      },
      { status: 400 },
    );
  }

  if (oneOffId === ONE_OFF_BELATED_ID && isoDate !== ONE_OFF_BELATED_ALLOWED_DATE) {
    return NextResponse.json({
      ok: true,
      sent: false,
      reason: 'One-off window closed.',
      timezone: TIMEZONE,
      date: isoDate,
    });
  }

  const lookupKey = requestedKey || key;
  const specialDay = specialDates.find((item) => item.date === lookupKey);

  if (!specialDay) {
    return NextResponse.json({
      ok: true,
      sent: false,
      reason: 'No special date today.',
      timezone: TIMEZONE,
      date: isoDate,
    });
  }

  const formspreeEndpoints = getSpecialDayEndpoints();

  const subject = `Rocher → Rachael | ${specialDay.title} (${readable})`;
  const html = buildEmailHtml({
    title: specialDay.title,
    subtitle: specialDay.subtitle,
    dateLabel: readable,
    message: specialDay.message,
  });

  const plainMessage = [
    `Hello Rachael,`,
    '',
    `This was sent because today is a special date in ray-of-solace.`,
    `Special day: ${specialDay.title}`,
    `Date: ${readable}`,
    '',
    specialDay.message,
    '',
    'With love,',
    'Your amazing boyfriend and projects partner,',
    'Rocher',
  ].join('\n');

  const formPayload = {
    _subject: subject,
    subject,
    from_name: 'Rocher',
    to_name: 'Rachael',
    app: 'ray-of-solace',
    special_day_key: key,
    special_day_title: specialDay.title,
    special_day_subtitle: specialDay.subtitle,
    special_day_date: readable,
    timezone: TIMEZONE,
    message: plainMessage,
    html,
    sign_off: 'Your amazing boyfriend and projects partner, Rocher',
  };

  const failures: Array<{ endpoint: string; status: number; details: string }> = [];

  for (const endpoint of formspreeEndpoints) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formPayload),
    });

    if (!response.ok) {
      const details = await response.text();
      failures.push({ endpoint, status: response.status, details });
    }
  }

  if (failures.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        sent: false,
        error: 'One or more Formspree endpoints rejected request.',
        details: failures,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    sent: true,
    timezone: TIMEZONE,
    specialDate: lookupKey,
    specialDayTitle: specialDay.title,
    recipientsCount: formspreeEndpoints.length,
    deliveredVia: 'Formspree',
  });
}