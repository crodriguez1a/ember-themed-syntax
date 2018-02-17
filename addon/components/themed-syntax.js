import layout from '../templates/components/themed-syntax';
import trimRight from 'ember-themed-syntax/-private/trim-right';
import { equal } from 'ember-decorators/object/computed';
import codeHighlightLinenums from 'code-highlight-linenums';
import hljs from 'highlight';
import { get, set, computed } from '@ember/object';
import Component from '@ember/component';

/**
  A styled code highlighting component

  @class ThemedSyntax
  @extends Ember Component
  @public
*/
export default Component.extend({
  layout,

  tagName: 'pre',
  classNames: ['themed-syntax'],
  classNameBindings: ['_theme', 'transparent:transparent'],

  /**
    Binding code input

    @property code
    @type {String}
    @default
    @public
  */
  code: '',

  /**
    Define CSS scope

    @property theme
    @type {String}
    @default light
    @public
  */
  theme: 'light',

  /**
    Compute class name from theme option provided

    @property _theme
    @type {String}
    @private
  */
  _theme: computed('theme', function() {
    const theme = get(this, 'theme');
    let defaults = {
      dark: 'hybrid',
      light: 'github-gist'
    };
    return defaults.hasOwnProperty(theme) ? defaults[theme] : theme;
  }),

  /**
    Signal if theme is set to dark,
    bound to dark class (so that line numbers will be styled accordingly)

    @property dark
    @type {Boolean}
    @default false
    @private
  */
  @equal('theme', 'dark') isDark: false,

  /**
   Compute highlighted code

   @property code
   @type {String}
   @private
   */
  highlightedCode: computed('code', function() {
    const code = get(this, 'code');
    return this._highlight(code);
  }),

  /**
    Signal if the container should be transparent (background color set to none)

    @property transparent
    @type {Bool}
    @default false
    @public
  */
  transparent: false,

  /**
    Syntax language

    @property lang
    @type {String}
    @default html
    @public
  */
  lang: 'html',

  /**
   Signal if line numbers should be excluded

   @property withLineNumbers
   @type {Boolean}
   @default true
   @public
  */
  withLineNumbers: true,

  /**
    Adds a line break to beginning and end of each block

    @property withBuffers
    @type {Boolean}
    @default true
    @public
  */
  withBuffers: true,

  /**
    Convert raw block to highlighted block using HighlightJS

    @method _highlight
    @returns {String}
    @private
  */
  _highlight(code) {
    // Get syntax language
    let lang = get(this, 'lang');

    // Get the trimmed/buffered raw text
    let raw = trimRight(code);
    if (get(this, 'withBuffers')) {
      raw = `\n${raw}\n`;
    }

    // Two valid line number states
    //    0: do not show line numbers
    //    1: show line numbers starting at Line 1
    let start = get(this, 'withLineNumbers') | 0;

    // Syntax instance
    // Credit: @OverZealous - https://github.com/OverZealous/code-highlight-linenums
    let syntax = codeHighlightLinenums(raw, {
      hljs,
      lang,
      start
    });
    return syntax;
  },

  didInsertElement() {
    this._super(...arguments);

    if (!get(this, 'code')) {
      set(this, 'code', this.$().find('.code').text());
    }
  }
});
