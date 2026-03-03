export const config = {
  schedule: '5 8 3 3 *',
};

export default async function specialDayEmailBelatedMar12026() {
  const siteUrl = process.env.URL;
  const cronSecret = process.env.CRON_SECRET;

  if (!siteUrl) {
    console.error('Missing Netlify URL environment variable.');
    return new Response('Missing URL env var', { status: 500 });
  }

  const endpoint = `${siteUrl.replace(/\/$/, '')}/api/cron/special-day-email?overrideDateKey=03-03&oneOff=belated-mar1-2026`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (cronSecret) {
    headers.authorization = `Bearer ${cronSecret}`;
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers,
  });

  const body = await response.text();
  console.log('special-day-email-belated-mar1-2026 status:', response.status, 'body:', body);

  return new Response('ok', { status: response.ok ? 200 : 502 });
}
