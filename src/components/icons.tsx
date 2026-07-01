interface IconProps {
  className?: string
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#0a66c2" />
      <path
        d="M7.06 9.5h-2v8.5h2V9.5zm-1-3.4a1.16 1.16 0 100 2.31 1.16 1.16 0 000-2.31zM19 18v-4.85c0-2.27-1.21-3.33-2.82-3.33-1.3 0-1.88.71-2.2 1.22V9.5h-2V18h2v-4.74c0-.42.03-.84.16-1.14.34-.84 1.11-1.07 1.66-1.07.78 0 1.21.5 1.21 1.6V18H19z"
        fill="#fff"
      />
    </svg>
  )
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.71c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85.01 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"
        fill="#fff"
      />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v.5l8 5 8-5V7H4zm0 2.62V17h16V9.62l-8 5z"
        fill="#f2c14e"
      />
    </svg>
  )
}

export function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#000" />
      <path
        d="M17.5 5h2.5l-5.6 6.4L21 19h-5.2l-4.1-5.3L6.9 19H4.4l6-6.9L4 5h5.3l3.7 4.9L17.5 5zm-.9 12.4h1.4L7.5 6.5H6l10.6 10.9z"
        fill="#fff"
      />
    </svg>
  )
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#5865f2" />
      <path
        d="M18 7.4a11 11 0 00-2.7-.8l-.3.7a10 10 0 00-3-0 10 10 0 00-3 0l-.3-.7A11 11 0 006 7.4c-1.7 2.6-2.2 5.1-2 7.6a11 11 0 003.5 1.8l.7-1a7.4 7.4 0 01-1.2-.6l.3-.2a8 8 0 006.7 0l.3.2a7.4 7.4 0 01-1.2.6l.7 1a11 11 0 003.5-1.8c.2-2.9-.4-5.4-2-7.6zm-6.6 6.1c-.7 0-1.2-.6-1.2-1.4 0-.8.5-1.4 1.2-1.4.7 0 1.3.6 1.2 1.4 0 .8-.5 1.4-1.2 1.4zm4.4 0c-.7 0-1.2-.6-1.2-1.4 0-.8.5-1.4 1.2-1.4.7 0 1.3.6 1.2 1.4 0 .8-.5 1.4-1.2 1.4z"
        fill="#fff"
      />
    </svg>
  )
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1565c0" />
      <path
        d="M12 2a15 15 0 00-4 10 15 15 0 004 10 15 15 0 004-10 15 15 0 00-4-10zm-1.5 10c0-2.7.5-5.2 1.5-7.3.9 2 1.5 4.6 1.5 7.3 0 2.7-.5 5.2-1.5 7.3-.9-2-1.5-4.6-1.5-7.3z"
        fill="#fff"
        opacity="0.8"
      />
      <path d="M2 12h20M2 8h20M2 16h20" stroke="#fff" strokeWidth="0.4" opacity="0.5" />
    </svg>
  )
}
