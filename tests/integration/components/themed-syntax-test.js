import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('themed-syntax', 'Integration | Component | themed syntax', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{themed-syntax}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#themed-syntax}}
      template block text
    {{/themed-syntax}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it applies the "dark" parameter', function(assert) {
  this.render(hbs`{{themed-syntax theme="dark"}}`);
  assert.ok(Ember.$(this.$().find('.themed-syntax')[0]).hasClass('hybrid'), 'The default dark theme was applied');
  assert.ok(Ember.$(this.$().find('.code')[0]).hasClass('dark'), 'The default dark theme was applied to line numbers');
});

test('it applies the "light" parameter', function(assert) {
  this.render(hbs`{{themed-syntax}}`);
  assert.ok(Ember.$(this.$().find('.themed-syntax')[0]).hasClass('github-gist'), 'The default light theme was applied');
});

test('it applies the "transparent" parameter', function(assert) {
  this.render(hbs`{{themed-syntax transparent="true"}}`);
  assert.ok(Ember.$(this.$().find('.themed-syntax')[0]).hasClass('transparent'), 'The transparent class was added');
});

test('it applies the "withBuffers" parameter', function(assert) {
  this.render(hbs`
    {{#themed-syntax withBuffers=false lang="htmlbars"}}
      foo
      bar
    {{/themed-syntax}}
  `);
  assert.ok(`${Ember.$(this.$().find('.line').first()).text()}${Ember.$(this.$().find('.line').last()).text()}` !== '', 'The buffers were left off');
});

test('it binds code', function(assert) {
  this.set('code', 'first round');
  this.render(hbs`{{themed-syntax code=code}}`);
  assert.equal(this.$('pre').text().trim(), 'first round', 'initial render ok');

  this.set('code', 'second round');
  assert.equal(this.$('pre').text().trim(), 'second round', 'code is bound');
});
