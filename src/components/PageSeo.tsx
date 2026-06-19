import { useEffect } from 'react';
import { buildPageSeo, type PageSeoInput } from '../lib/seo';

function ensureMetaByName(name: string) {
  let meta = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  return meta;
}

function ensureMetaByProperty(property: string) {
  let meta = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  return meta;
}

function ensureCanonicalLink() {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  return link;
}

function ensureJsonLdScript() {
  let script = document.head.querySelector('script[data-seo-jsonld="page"]') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'page');
    document.head.appendChild(script);
  }
  return script;
}

export function PageSeo(input: PageSeoInput) {
  useEffect(() => {
    const seo = buildPageSeo(input);

    document.title = seo.title;
    ensureMetaByName('description').setAttribute('content', seo.description);
    ensureMetaByName('robots').setAttribute('content', seo.robots);

    ensureMetaByProperty('og:title').setAttribute('content', seo.title);
    ensureMetaByProperty('og:description').setAttribute('content', seo.description);
    ensureMetaByProperty('og:type').setAttribute('content', seo.type);
    ensureMetaByProperty('og:url').setAttribute('content', seo.canonical);
    ensureMetaByProperty('og:image').setAttribute('content', seo.image);
    ensureMetaByProperty('og:image:alt').setAttribute('content', seo.title);

    ensureMetaByName('twitter:card').setAttribute('content', 'summary_large_image');
    ensureMetaByName('twitter:title').setAttribute('content', seo.title);
    ensureMetaByName('twitter:description').setAttribute('content', seo.description);
    ensureMetaByName('twitter:image').setAttribute('content', seo.image);

    ensureCanonicalLink().setAttribute('href', seo.canonical);

    const jsonLdScript = ensureJsonLdScript();
    if (seo.jsonLd) {
      jsonLdScript.textContent = JSON.stringify(seo.jsonLd);
    } else {
      jsonLdScript.textContent = '';
    }
  }, [input]);

  return null;
}
