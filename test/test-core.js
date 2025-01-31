// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: @ssimicro/postmodern-syslog
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var fmt = require('util').format;
var syslog = require('../');
var tap = require('tap');

tap.test('core properties exist', function(t) {
  t.ok(syslog.core);
  t.ok(syslog.core.openlog);
  t.ok(syslog.core.syslog);
  t.ok(syslog.core.setlogmask);
  t.ok(syslog.core.closelog);
  t.ok(syslog.core.option.LOG_PID);
  t.ok(syslog.core.facility.LOG_LOCAL0);
  t.ok(syslog.core.level.LOG_DEBUG);
  t.end();
});

tap.test('low-level helpers', function(t) {
  t.equal(syslog.toFacility(0), 0, 'toFacility preserves numbers');
  t.equal(syslog.toLevel(0), 0, 'toLevel preserves numbers');
  t.equal(syslog.toFacility('LOG_LOCAL0'), syslog.facility.LOG_LOCAL0,
          'toFacility preserves numbers');
  t.equal(syslog.toLevel('LOG_EMERG'), syslog.level.LOG_EMERG,
          'toLevel preserves numbers');
  t.end();
});

function accept(m) {
  tap.test(fmt('core syslog accepts %j', m), function(t) {
    t.plan(1);
    syslog.core.syslog(syslog.core.level.LOG_DEBUG, m, function() {
      t.ok(true, 'called back');
    });
  });
}

accept('string');
accept(Buffer.from('buffer'));
accept(undefined);
accept(null);
accept({some: 5});
accept(function fn() {});
