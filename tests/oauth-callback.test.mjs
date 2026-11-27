import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../public/oauth-callback.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function runCallback(search) {
  const elements = {
    heading: { textContent: '' },
    message: { textContent: '' },
    'open-app': { hidden: true },
  };
  const window = {
    location: { search, pathname: '/oauth-callback.html', href: '' },
    history: { replaceState(_state, _title, path) { this.path = path; } },
  };
  runInNewContext(script, { window, document: { getElementById: id => elements[id] }, URL, URLSearchParams });
  return { window, elements };
}

test('forwards the code and state safely to the app and clears the browser URL', () => {
  const { window, elements } = runCallback('?code=a%2Bb%26c&state=x%2Fy');
  const target = new URL(window.location.href);
  assert.equal(target.protocol, 'outboxdownloader:');
  assert.equal(target.host, 'oauth');
  assert.equal(target.pathname, '/callback');
  assert.equal(target.searchParams.get('code'), 'a+b&c');
  assert.equal(target.searchParams.get('state'), 'x/y');
  assert.equal(elements['open-app'].href, window.location.href);
  assert.equal(elements['open-app'].hidden, false);
  assert.equal(window.history.path, '/oauth-callback.html');
});

test('does not open the app when authorization failed or parameters are missing', () => {
  for (const search of ['?error=access_denied&state=abc', '?code=abc', '?state=abc', '?code=abc&state=def&error=access_denied']) {
    const { window, elements } = runCallback(search);
    assert.equal(window.location.href, '');
    assert.equal(elements['open-app'].hidden, true);
    assert.equal(elements.heading.textContent, 'Could not connect Dropbox');
    assert.equal(window.history.path, '/oauth-callback.html');
  }
});
