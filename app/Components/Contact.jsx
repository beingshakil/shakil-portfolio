"use client"
// Closing contact section on navy: pitch + direct details on the left,
// the message form (Web3Forms) on the right.
import { useState } from 'react'
import { Eyebrow, Section, headingClass } from './SectionHeading'
import RevealText from './RevealText'

const fieldClass =
  'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 outline-none transition-colors focus:border-secondary focus:bg-white/[0.06]'
const labelClass = 'font-eyebrow text-[11px] font-bold uppercase tracking-[0.2em] text-white/60'

const Contact = ({ content }) => {
  const [result, setResult] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    setResult(content.sendingText)
    const formData = new FormData(event.target)
    formData.append('access_key', content.web3formsKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await response.json()
      if (data.success) {
        setResult(content.successText)
        event.target.reset()
      } else {
        setResult(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setResult('Something went wrong. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id="contact" tone="navy">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Pitch + details */}
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>
          <RevealText text={content.heading} tone="dark" className={`mt-5 ${headingClass}`} />
          <p className="mt-6 text-base md:text-lg leading-relaxed text-white/70">{content.content}</p>

          <dl className="mt-10 space-y-6 border-t border-white/10 pt-8">
            <div>
              <dt className={labelClass}>{content.emailLabel}</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${content.email}`} className="text-lg font-medium text-white hover:text-secondary transition-colors">
                  {content.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>{content.locationLabel}</dt>
              <dd className="mt-1.5 text-lg font-medium text-white">{content.location}</dd>
            </div>
          </dl>

          <a
            href={content.bookCallHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-dark transition-colors duration-300 hover:bg-light"
          >
            {content.bookCallText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold tracking-tight text-white">{content.formTitle}</h3>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>{content.nameLabel}</label>
              <input id="contact-name" type="text" name="name" required autoComplete="name" placeholder={content.namePlaceholder} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>{content.emailFieldLabel}</label>
              <input id="contact-email" type="email" name="email" required autoComplete="email" placeholder={content.emailPlaceholder} className={fieldClass} />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="contact-message" className={labelClass}>{content.messageLabel}</label>
            <textarea id="contact-message" name="message" rows={6} required placeholder={content.messagePlaceholder} className={`${fieldClass} resize-y`} />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-dark transition-colors duration-300 hover:bg-secondary disabled:opacity-60"
            >
              {content.submitText}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
            <p className="text-sm text-white/70" role="status" aria-live="polite">{result}</p>
          </div>
        </form>
      </div>
    </Section>
  )
}

export default Contact
