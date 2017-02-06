/* global document */

import Template from './template';
import Locale from './locale';

// Templates.
import menu from '../templates/menu.html';
import navigation from '../templates/navigation.html';
import contacts from '../templates/contacts.html';
import profile from '../templates/profile.html';
import contribution from '../templates/contribution.html';
import nitka from '../templates/nitka.html';
import cmg from '../templates/cmg.html';
import finist from '../templates/finist.html';
import lrw from '../templates/lrw.html';
import newsmedia from '../templates/newsmedia.html';
import kelly from '../templates/kelly.html';
import personal from '../templates/personal.html';
import career from '../templates/career.html';
import education from '../templates/education.html';
import about from '../templates/about.html';
import stack from '../templates/stack.html';
import citizenship from '../templates/citizenship.html';

const html = {
  menu,
  navigation,
  contacts,
  profile,
  contribution,
  nitka,
  cmg,
  finist,
  lrw,
  newsmedia,
  kelly,
  personal,
  career,
  education,
  about,
  stack,
  citizenship
};

const i18n = new Locale();
const byId = document.getElementById.bind(document);

export default function render(callback, locale = 'en', isLoaded = false) {
  i18n.setLocale(locale);

  [
    'menu',
    'navigation',
    'contacts',
    'profile',
    'contribution',
    'nitka',
    'cmg',
    'finist',
    'lrw',
    'newsmedia',
    'kelly',
    'personal',
    'career',
    'education',
    'about',
    'stack',
    'citizenship'
  ].forEach(item =>
    new Template()
      .compile(html[item], i18n.get(item))
      .render(byId(item))
  );

  callback(isLoaded);
}
