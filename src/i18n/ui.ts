export const languages = {
  'pt-br': 'Português',
  en: 'English',
} as const;

export const defaultLang = 'pt-br' as const;

export type Lang = keyof typeof languages;

export const showDefaultLang = false;

export const ui = {
  'pt-br': {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    'nav.projects': 'Projetos',
    'nav.links': 'Links',
    'home.tagline': 'Engenheiro de software, criador de conteúdo e fundador.',
    'home.intro':
      'Bem-vindo ao meu cantinho na web. Aqui compartilho ideias sobre desenvolvimento, ASP.NET, IA, produto e empreendedorismo.',
    'home.cta.about': 'Conheça minha história',
    'home.cta.blog': 'Ler o blog',
    'home.latest_posts': 'Últimos posts',
    'home.see_all': 'Ver tudo',
    'about.title': 'Sobre mim',
    'about.subtitle': 'Quem sou e no que estou trabalhando.',
    'blog.title': 'Blog',
    'blog.subtitle': 'Notas, tutoriais e reflexões.',
    'blog.read_more': 'Ler mais',
    'blog.published_on': 'Publicado em',
    'blog.min_read': 'min de leitura',
    'projects.title': 'Projetos',
    'projects.subtitle': 'Open source e iniciativas que mantenho.',
    'projects.visit': 'Visitar',
    'links.title': 'Links',
    'links.subtitle': 'Onde me encontrar na internet.',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.built_with': 'Construído com',
    'theme.toggle': 'Alternar tema',
    'lang.switch': 'Mudar idioma',
    '404.title': 'Página não encontrada',
    '404.message': 'A página que você procura não existe ou foi movida.',
    '404.home': 'Voltar ao início',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.links': 'Links',
    'home.tagline': 'Software engineer, content creator, and founder.',
    'home.intro':
      'Welcome to my corner of the web. I write about software development, ASP.NET, AI, product, and entrepreneurship.',
    'home.cta.about': 'Read my story',
    'home.cta.blog': 'Visit the blog',
    'home.latest_posts': 'Latest posts',
    'home.see_all': 'See all',
    'about.title': 'About me',
    'about.subtitle': 'Who I am and what I am working on.',
    'blog.title': 'Blog',
    'blog.subtitle': 'Notes, tutorials and thoughts.',
    'blog.read_more': 'Read more',
    'blog.published_on': 'Published on',
    'blog.min_read': 'min read',
    'projects.title': 'Projects',
    'projects.subtitle': 'Open source and initiatives I maintain.',
    'projects.visit': 'Visit',
    'links.title': 'Links',
    'links.subtitle': 'Where to find me online.',
    'footer.rights': 'All rights reserved.',
    'footer.built_with': 'Built with',
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Switch language',
    '404.title': 'Page not found',
    '404.message': 'The page you are looking for does not exist or has moved.',
    '404.home': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['pt-br'];
