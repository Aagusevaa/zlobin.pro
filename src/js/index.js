/* global window, document */

import './vendor/ga.js';
import render from './render';
import '../sass/main.scss';
import dom from './dom';

document.addEventListener('DOMContentLoaded', () => {
  render(dom);
});
