import { ui, defaultLang, showDefaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return 'pt-br';
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang && !showDefaultLang) return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

export function getAlternatePath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  let path = url.pathname;

  if (current === 'en') {
    path = path.replace(/^\/en/, '') || '/';
  }

  const segments = path.split('/').filter(Boolean);
  const slugMap: Record<string, Record<Lang, string>> = {
    sobre: { 'pt-br': 'sobre', en: 'about' },
    about: { 'pt-br': 'sobre', en: 'about' },
    projetos: { 'pt-br': 'projetos', en: 'projects' },
    projects: { 'pt-br': 'projetos', en: 'projects' },
    blog: { 'pt-br': 'blog', en: 'blog' },
    links: { 'pt-br': 'links', en: 'links' },
    eventos: { 'pt-br': 'eventos', en: 'events' },
    events: { 'pt-br': 'eventos', en: 'events' },
  };

  if (segments.length > 0 && slugMap[segments[0]]) {
    segments[0] = slugMap[segments[0]][target];
  }

  const mapped = '/' + segments.join('/');
  return localizedPath(mapped, target);
}

export function htmlLang(lang: Lang): string {
  return lang === 'pt-br' ? 'pt-BR' : 'en';
}
