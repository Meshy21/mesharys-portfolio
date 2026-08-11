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

      const parseNum = (obj: unknown, fallback: number): number => {
        if (typeof obj === 'number') return obj;
        if (obj && typeof obj === 'object' && 'value' in obj && typeof (obj as { value: unknown }).value === 'number') {
          return (obj as { value: number }).value;
        }
        return fallback;
      };

      const parseChange = (obj: unknown, fallback: number): number => {
        if (obj && typeof obj === 'object' && 'change' in obj && typeof (obj as { change: unknown }).change === 'number') {
          return (obj as { change: number }).change;
        }
        return fallback;
      };

      const visitorsVal = parseNum(data.visitors ?? data.uniques, fallbackData.visitors.value);
      const visitorsChange = parseChange(data.visitors, fallbackData.visitors.change);
      const pageviewsVal = parseNum(data.pageviews, fallbackData.pageviews.value);
      const pageviewsChange = parseChange(data.pageviews, fallbackData.pageviews.change);

      const totalTimeVal = parseNum(data.totaltime, 0);
      const visitsVal = parseNum(data.visits, 0);
      const bouncesVal = parseNum(data.bounces, 0);

      let avgDurationStr = fallbackData.avgDuration;
      if (totalTimeVal > 0 && visitsVal > 0) {
        const avgSeconds = Math.round(totalTimeVal / visitsVal);
        const mins = Math.floor(avgSeconds / 60);
        const secs = avgSeconds % 60;
        avgDurationStr = `${mins}m ${secs}s`;
      }

      let bounceRateStr = fallbackData.bounceRate;
      if (bouncesVal >= 0 && visitsVal > 0) {
        const rate = ((bouncesVal / visitsVal) * 100).toFixed(1);
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
