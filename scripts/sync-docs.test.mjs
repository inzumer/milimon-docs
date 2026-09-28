import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { pageSlug, rewriteHref, titleOf, toPage } from './sync-docs.mjs';

const BASE = '/milimon-docs';

describe('sync docs', () => {
  it('should name pages after their files', () => {
    assert.equal(pageSlug('README'), 'index');
    assert.equal(pageSlug('03-contenido-y-redes'), '03-contenido-y-redes');
  });

  it('should take the title from the first heading without its number', () => {
    assert.equal(titleOf('# 09 · Dirección visual\n\nTexto', 'x'), 'Dirección visual');
    assert.equal(titleOf('Sin título', 'fallback'), 'fallback');
  });

  it('should point links between suggestions to their pages, keeping anchors', () => {
    assert.equal(
      rewriteHref('./02-cms-y-emails.md#keystatic', 'suggestions', BASE),
      '/milimon-docs/sugerencias/02-cms-y-emails/#keystatic',
    );
    assert.equal(
      rewriteHref('./suggestions/08-calidad-y-tests.md', '', BASE),
      '/milimon-docs/sugerencias/08-calidad-y-tests/',
    );
    assert.equal(rewriteHref('./suggestions/README.md', '', BASE), '/milimon-docs/sugerencias/');
    assert.equal(rewriteHref('../PLAN.md', 'suggestions', BASE), '/milimon-docs/plan/');
  });

  it('should send other files to GitHub and leave external links alone', () => {
    assert.equal(
      rewriteHref('../TRACKING.md', 'suggestions', BASE),
      'https://github.com/inzumer/milimon/blob/dev/docs/TRACKING.md',
    );
    assert.equal(
      rewriteHref('./adr/0001-astro.md', '', BASE),
      'https://github.com/inzumer/milimon/blob/dev/docs/adr/0001-astro.md',
    );
    assert.equal(
      rewriteHref('https://starlight.astro.build/', '', BASE),
      'https://starlight.astro.build/',
    );
    assert.equal(rewriteHref('#seccion', '', BASE), '#seccion');
  });

  it('should build a page with frontmatter and without the original heading', () => {
    const page = toPage('# 01 · Deploy\n\nVer [plan](../PLAN.md).\n', {
      title: 'Deploy',
      order: 1,
      folder: 'suggestions',
      base: BASE,
    });
    assert.match(page, /^---\ntitle: "Deploy"\nsidebar:\n {2}order: 1\neditUrl: false\n---\n/);
    assert.doesNotMatch(page, /# 01/);
    assert.match(page, /Ver \[plan\]\(\/milimon-docs\/plan\/\)\./);
  });
});
