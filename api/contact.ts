import { z } from 'zod'
import { Resend } from 'resend'

// Edge runtime — Web-standard Request/Response, no @vercel/node dep,
// faster cold-start than Node runtime for this small function.
export const config = { runtime: 'edge' }

const RECIPIENT = 'wchen1396@gmail.com'
// Swap to 'contact@willchennn.com' once the domain is verified in Resend.
const FROM = 'Portfolio Contact <onboarding@resend.dev>'

const BodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Valid email required').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  // Honeypot — a hidden field real users leave empty. Bots fill all fields.
  website: z.string().optional()
})

const json = (data: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders }
  })

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return json(
      {
        error: 'Invalid input',
        issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message }))
      },
      400
    )
  }

  const { name, email, message, website } = parsed.data

  // Honeypot tripped — respond success so bots don't learn the trick, drop the submission.
  if (website && website.trim().length > 0) {
    return json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY env var is not set')
    return json({ error: 'Email service unavailable' }, 500)
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `Portfolio contact: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n')
    })

    if (error) {
      console.error('Resend error:', error)
      return json({ error: 'Failed to send message' }, 502)
    }

    return json({ ok: true })
  } catch (err) {
    console.error('Unexpected error sending email:', err)
    return json({ error: 'Failed to send message' }, 500)
  }
}
