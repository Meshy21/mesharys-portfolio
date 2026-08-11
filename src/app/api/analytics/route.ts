import { NextResponse } from 'next/server';

export interface AnalyticsStatsData {
  visitors: {
    value: number;
    change: number;
  };
  pageviews: {
    value: number;
    change: number;
  };
  avgDuration: string;
  bounceRate: string;
  isLive: boolean;
  shareUrl: string;
}

export async function GET() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'f54f12c9-a5ad-4282-a4d1-ad3621b88a8e';
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';
  const shareUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL || `https://cloud.umami.is/share/${websiteId}`;
  const apiKey = process.env.UMAMI_API_KEY;

  // Default fallback statistics if Umami API key is absent or unreachable
  const fallbackData: AnalyticsStatsData = {
    visitors: { value: 145, change: 18 },
    pageviews: { value: 490, change: 12 },
    avgDuration: '3m 18s',
    bounceRate: '24.5%',
    isLive: false,
    shareUrl,
  };

  if (!apiKey) {
    return NextResponse.json(fallbackData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  }

  try {
    const endAt = Date.now();
    const startAt = endAt - 7 * 24 * 60 * 60 * 1000; // Last 7 days

    const baseUrl = scriptUrl.includes('cloud.umami.is')
      ? 'https://api.umami.is/v1'
      : scriptUrl.replace(/\/script\.js$/, '/api');

    const res = await fetch(`${baseUrl}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-umami-api-key': apiKey,
        'User-Agent': 'NextJS-Portfolio-App',
      },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      const visitorsVal = data.visitors?.value ?? fallbackData.visitors.value;
      const visitorsChange = data.visitors?.change ?? fallbackData.visitors.change;
      const pageviewsVal = data.pageviews?.value ?? fallbackData.pageviews.value;
      const pageviewsChange = data.pageviews?.change ?? fallbackData.pageviews.change;

      let avgDurationStr = fallbackData.avgDuration;
      if (data.totaltime?.value && data.visits?.value && data.visits.value > 0) {
        const avgSeconds = Math.round(data.totaltime.value / data.visits.value);
        const mins = Math.floor(avgSeconds / 60);
        const secs = avgSeconds % 60;
        avgDurationStr = `${mins}m ${secs}s`;
      }

      let bounceRateStr = fallbackData.bounceRate;
      if (data.bounces?.value !== undefined && data.visits?.value && data.visits.value > 0) {
        const rate = ((data.bounces.value / data.visits.value) * 100).toFixed(1);
        bounceRateStr = `${rate}%`;
      }

      const liveData: AnalyticsStatsData = {
        visitors: { value: visitorsVal, change: visitorsChange },
        pageviews: { value: pageviewsVal, change: pageviewsChange },
        avgDuration: avgDurationStr,
        bounceRate: bounceRateStr,
        isLive: true,
        shareUrl,
      };

      return NextResponse.json(liveData, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }
  } catch (err) {
    console.warn('Umami API fetch error, falling back to cached defaults:', err);
  }

  return NextResponse.json(fallbackData, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
