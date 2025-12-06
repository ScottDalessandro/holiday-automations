import type { APIRoute } from 'astro';

export const prerender = false;

const BEEHIIV_API_KEY = import.meta.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = 'pub_0f6290ba-50e3-4732-8cd9-112033e0e7f9';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If no API key is configured, return a fallback response
    if (!BEEHIIV_API_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          fallback: true,
          error: 'API not configured'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call Beehiiv API
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          utm_source: 'website',
          utm_medium: 'footer_form',
          send_welcome_email: true,
        }),
      }
    );

    if (response.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      const errorData = await response.json().catch(() => ({}));
      return new Response(
        JSON.stringify({
          success: false,
          error: errorData.message || 'Subscription failed'
        }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
