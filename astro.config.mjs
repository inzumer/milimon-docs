// @ts-check
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { defineConfig } from 'astro/config';
import starlightLinksValidator from 'starlight-links-validator';

// GitHub Pages of this repo until the docs.<domain> subdomain exists (then BASE_PATH=/).
const site = process.env.SITE_URL ?? 'https://inzumer.github.io';
const base = process.env.BASE_PATH ?? '/milimon-docs';

export default defineConfig({
  site,
  base,
  integrations: [
    // Before Starlight, so ```mermaid blocks become diagrams instead of highlighted code.
    mermaid({ theme: 'neutral', autoTheme: true }),
    starlight({
      title: 'Milimon · Documentación',
      description:
        'Cómo funciona Milimon: arquitectura, flujos con diagramas, guías, plan y sugerencias.',
      defaultLocale: 'root',
      locales: { root: { label: 'Español', lang: 'es' } },
      logo: { src: './src/assets/logo.png', alt: 'Milimon' },
      favicon: '/favicon.png',
      customCss: ['./src/styles/theme.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/inzumer/milimon' }],
      editLink: { baseUrl: 'https://github.com/inzumer/milimon-docs/edit/main/' },
      lastUpdated: true,
      plugins: [starlightLinksValidator({ errorOnRelativeLinks: false })],
      sidebar: [
        { label: 'Inicio', link: '/' },
        { label: 'Arquitectura', items: [{ autogenerate: { directory: 'arquitectura' } }] },
        { label: 'Cómo funciona', items: [{ autogenerate: { directory: 'como-funciona' } }] },
        { label: 'Guías', items: [{ autogenerate: { directory: 'guias' } }] },
        { label: 'Desarrollo', items: [{ autogenerate: { directory: 'desarrollo' } }] },
        { label: 'Plan', items: [{ autogenerate: { directory: 'plan' } }] },
        { label: 'Sugerencias', items: [{ autogenerate: { directory: 'sugerencias' } }] },
      ],
    }),
  ],
});
