/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-themed-syntax',

  options: {
    nodeAssets: {
      'highlightjs': {
        srcDir: '',
        import: ['highlight.pack.min.js']
      },
      'code-highlight-linenums': {
        srcDir: '',
        import: ['code-highlight-linenums.js']
      },
      'hljs-themes': {
        srcDir: 'themes/dist',
        import: ['github-gist.min.css', 'hybrid.min.css', 'line-numbers.min.css']
      }
    }
  },

  init(/* app */) {
    this._super.init && this._super.init.apply(this, arguments);

    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.plugins = this.options.babel.plugins || [];

    if (this.options.babel.plugins.indexOf('transform-decorators-legacy') === -1) {
      this.options.babel.plugins.push('transform-decorators-legacy');
    }

    if (this.options.babel.plugins.indexOf('transform-class-properties') === -1) {
      this.options.babel.plugins.push('transform-class-properties');
    }
  },

  included(app, parentAddon) {
    // See: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app;
    }

    this._super.included.apply(this, arguments);

    var target = parentAddon || app;

    // Vendor shims
    target.import('vendor/shims/code-highlight-linenums.js');
    target.import('vendor/shims/highlight.js');

    // TODO: make each theme optional
    // var options = target.options.emberThemedSyntax || {};
  }
};
