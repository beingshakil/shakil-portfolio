import Link from 'next/link'

const ColumnTitle = ({ children }) => (
  <p className="mb-5 font-eyebrow text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">{children}</p>
)

const LinkColumn = ({ title, links }) => (
  <div>
    <ColumnTitle>{title}</ColumnTitle>
    <ul className="space-y-3">
      {links.map((link) => {
        const external = /^https?:\/\//.test(link.href)
        const className = 'text-[15px] font-medium text-white/75 hover:text-white transition-colors'
        return (
          <li key={link.label}>
            {external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={className}>
                {link.label}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  </div>
)

const Footer = ({ content }) => {
  const year = new Date().getFullYear()
  const social = content.socialLinks.map((s) => ({ label: s.label, href: s.url }))

  return (
    <footer className="w-full overflow-hidden border-t border-white/10 bg-deep text-white/70 px-4 sm:px-6 lg:px-[8%] pt-16 md:pt-20 dark:bg-[#050506]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <LinkColumn title={content.quickLinksTitle} links={content.quickLinks} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title={content.resourcesTitle} links={content.resources} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title={content.followMeTitle} links={social} />
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-white/70">{content.content}</p>
            <Link
              href={content.ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-secondary/60 px-7 py-3.5 text-sm font-semibold text-secondary transition-colors duration-300 hover:bg-secondary hover:text-dark"
            >
              {content.ctaText}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
            <a href={`mailto:${content.email}`} className="mt-6 block text-sm text-white/60 hover:text-white transition-colors">
              {content.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-20 flex flex-col gap-3 border-y border-white/10 py-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {content.copyrightText}</p>
          <p>{content.location}</p>
        </div>

        {/* Oversized outlined name, cropped at the bottom edge */}
        <div className="mt-8 h-[11vw] max-h-[150px] overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 1000 150" className="w-full h-auto" preserveAspectRatio="xMidYMin meet">
            <text
              x="0"
              y="140"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.9"
              className="font-display-condensed"
              style={{ fontSize: '170px' }}
            >
              {content.brandName.toUpperCase()}
            </text>
          </svg>
        </div>
      </div>
    </footer>
  )
}

export default Footer
