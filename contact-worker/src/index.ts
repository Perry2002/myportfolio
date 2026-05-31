import { Resend } from 'resend';

export interface Env {
  RESEND_API_KEY: string;
}

const corsHeaders = {
//   'Access-Control-Allow-Origin': 'https://votre-portfolio.com', // votre domaine
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Preflight CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { name, email, message } = await request.json<{
        name: string;
        email: string;
        message: string;
      }>();

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Champs manquants' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      const resend = new Resend(env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>', // remplacer par votre domaine vérifié
        to: 'perrydoyigbe197@gmail.com',
        replyTo: email,
        subject: `📩 Nouveau message de ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #111;">Nouveau message depuis votre portfolio</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 80px;"><strong>Nom</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Message</strong></td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
        `,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};