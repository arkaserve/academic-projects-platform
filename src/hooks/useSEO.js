import { useEffect } from 'react'

const SITE_NAME = 'Prep by Arkaserve'
const BASE_URL  = 'https://projects.arkaserve.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export function useSEO({ title, description, path = '', image }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Engineering Project Hub`

    const desc = description ||
      'Hands-on engineering projects with complete source code, step-by-step guides, and viva Q&A for B.Tech, M.Tech & School students.'

    const canonical = `${BASE_URL}${path}`
    const ogImage   = image || DEFAULT_IMAGE

    // Title
    document.title = fullTitle

    // Helpers
    const setMeta = (sel, val) => {
      let el = document.querySelector(sel)
      if (!el) {
        el = document.createElement('meta')
        const attr = sel.startsWith('meta[name') ? 'name' : 'property'
        const key  = sel.match(/"([^"]+)"/)?.[1]
        if (key) el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', val)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Standard meta
    setMeta('meta[name="description"]',        desc)
    setMeta('meta[name="robots"]',             'index, follow')

    // Canonical
    setLink('canonical', canonical)

    // Open Graph
    setMeta('meta[property="og:title"]',       fullTitle)
    setMeta('meta[property="og:description"]', desc)
    setMeta('meta[property="og:url"]',         canonical)
    setMeta('meta[property="og:image"]',       ogImage)
    setMeta('meta[property="og:type"]',        'website')
    setMeta('meta[property="og:site_name"]',   SITE_NAME)

    // Twitter Card
    setMeta('meta[name="twitter:card"]',        'summary_large_image')
    setMeta('meta[name="twitter:title"]',       fullTitle)
    setMeta('meta[name="twitter:description"]', desc)
    setMeta('meta[name="twitter:image"]',       ogImage)
  }, [title, description, path, image])
}
