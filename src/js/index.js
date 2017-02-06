/* global window, document */

import './vendor/ga';
import render from './render';
import '../sass/main.scss';
import dom from './dom';

document.addEventListener('DOMContentLoaded', () => {
  render(dom);
});
