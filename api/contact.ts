import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import { Resend } from 'resend'

const RECIPIENT = 'wchen1396@gmail.com'
// Swap this to 'contact@willchennn.com' once the domain is verified in Resend.
const FROM = 'Portfolio Contact <onboarding@resend.dev>'

const BodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Valid email required').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  // Honeypot — a hidden field real users leave empty. Bots fill all fields.
  website: z.string().optional()
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const parsed = BodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid input',
      issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message }))
    })
  }

  const { name, email, message, website } = parsed.data

  // Honeypot tripped — respond success so bots don't learn the trick, drop the submission.
  if (website && website.trim().length > 0) {
    return res.status(200).json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY env var is not set')
    return res.status(500).json({ error: 'Email service unavailable' })
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
      return res.status(502).json({ error: 'Failed to send message' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Unexpected error sending email:', err)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
