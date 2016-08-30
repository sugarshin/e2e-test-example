require('mocha-generators').install();

const Nightmare = require('nightmare');
const assert = require('power-assert');

describe('Comuque-app login', () => {
  let nightmare;

  beforeEach(() => {
    nightmare = Nightmare({
      show: true,
      waitTimeout: 30000,
      gotoTimeout: 30000
    });
  });

  afterEach(function* () {
    yield nightmare.end();
  });

  it('Team name', function* () {
    this.timeout(30000);

    const teamName = yield nightmare
      .goto('http://localhost:8019/')
      .type('input[name="email"]', 'shingo.sato+user1@oneteam.co.jp')
      .type('input[name="password"]', 'password1')
      .click('[type=submit]')
      .wait('#comuque-app')
      .wait('#team-name')
      .evaluate(() => document.querySelector('#team-name').textContent)

    assert(teamName === 'SSATO1');
  })
});
