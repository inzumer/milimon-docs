// Copies the plan and the suggestions from milimon-frontend-web/docs (the single source) into Starlight pages:
// adds the frontmatter title and order, drops the original h1 and rewrites the links between
// documents. Locally it reads ../milimon-frontend-web/docs (or ../milimon/docs, the old folder
// name); CI checks the repo out and sets DOCS_SOURCE.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const REPO_BLOB = 'https://github.com/inzumer/milimon-frontend-web/blob/dev/docs';

/** `03-contenido-y-redes` → `03-contenido-y-redes`; `README` → `index`. */
export const pageSlug = (file) => (file === 'README' ? 'index' : file);

/** Title from the first `# ` heading, without the "NN · " prefix. */
export const titleOf = (markdown, fallback) => {
  const heading = /^#\s+(.+)$/m.exec(markdown)?.[1]?.trim();
  return (heading ?? fallback).replace(/^\d+\s*·\s*/, '');
};

/**
 * Rewrites a link of a document in `folder` (`''` for docs/, `suggestions`) to the docs site, or
 * to GitHub for files that aren't published here.
 */
export const rewriteHref = (href, folder, base) => {
  if (!href.startsWith('.')) {
    return href;
  }
  const [path = '', hash = ''] = href.split('#');
  const parts = [folder, ...path.split('/')].reduce((acc, part) => {
    if (part === '..') return acc.slice(0, -1);
    return part === '.' || part === '' ? acc : [...acc, part];
  }, []);
  const target = parts.join('/');
  const anchor = hash ? `#${hash}` : '';
  const suggestion = /^suggestions\/(\d\d-[\w-]+)\.md$/.exec(target);
  if (suggestion) {
    return `${base}/sugerencias/${suggestion[1]}/${anchor}`;
  }
  if (target === 'suggestions/README.md' || target === 'suggestions') {
    return `${base}/sugerencias/${anchor}`;
  }
  if (target === 'PLAN.md') {
    return `${base}/plan/${anchor}`;
  }
  return `${REPO_BLOB}/${target}${anchor}`;
};

/** A Starlight page from a Markdown document. */
export const toPage = (markdown, { title, order, folder, base }) => {
  const body = markdown
    .replace(/^#\s+.+\n+/m, '')
    .replace(/\]\(([^)\s]+)\)/g, (_, href) => `](${rewriteHref(href, folder, base)})`);
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    ...(order === undefined ? [] : ['sidebar:', `  order: ${order}`]),
    'editUrl: false',
    '---',
    '',
    `:::note[Fuente]\nEste documento se genera desde \`milimon/docs\`: se edita allá.\n:::`,
    '',
  ];
  return `${frontmatter.join('\n')}\n${body}`;
};

const main = () => {
  const source = resolve(
    process.env.DOCS_SOURCE ??
      ['../milimon-frontend-web/docs', '../milimon/docs'].find((dir) => existsSync(dir)) ??
      '../milimon-frontend-web/docs',
  );
  const base = (process.env.BASE_PATH ?? '/milimon-docs').replace(/\/+$/, '');
  const out = resolve('src/content/docs');

  const plan = join(out, 'plan');
  rmSync(plan, { recursive: true, force: true });
  mkdirSync(plan, { recursive: true });
  const planMarkdown = readFileSync(join(source, 'PLAN.md'), 'utf8');
  writeFileSync(
    join(plan, 'index.md'),
    toPage(planMarkdown, { title: 'Plan y pendientes', order: 0, folder: '', base }),
  );

  const suggestions = join(out, 'sugerencias');
  rmSync(suggestions, { recursive: true, force: true });
  mkdirSync(suggestions, { recursive: true });
  const files = readdirSync(join(source, 'suggestions')).filter((file) => file.endsWith('.md'));
  for (const file of files) {
    const name = file.replace(/\.md$/, '');
    const markdown = readFileSync(join(source, 'suggestions', file), 'utf8');
    const order = name === 'README' ? 0 : Number(name.slice(0, 2));
    const title = name === 'README' ? 'Todas las sugerencias' : titleOf(markdown, name);
    writeFileSync(
      join(suggestions, `${pageSlug(name)}.md`),
      toPage(markdown, { title, order, folder: 'suggestions', base }),
    );
  }
  process.stdout.write(`Synced PLAN.md and ${files.length} suggestions from ${source}\n`);
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
