export const config = {
  schedule: '0 5 * * *',
};

export default async function specialDayEmailScheduler() {
  const siteUrl = process.env.URL;
  const cronSecret = process.env.CRON_SECRET;

  if (!siteUrl) {
    console.error('Missing Netlify URL environment variable.');
    return new Response('Missing URL env var', { status: 500 });
  }

  const endpoint = `${siteUrl.replace(/\/$/, '')}/api/cron/special-day-email`;
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
  console.log('special-day-email-scheduler status:', response.status, 'body:', body);

  return new Response('ok', { status: response.ok ? 200 : 502 });
}