/* global window, document */

import skills from './skills';
import animateImage from './effect';
import { RU, EN } from './locale';
import render from './render';

function nodeEach(list, callback, scope) {
  for (let i = 0; i < list.length; i++) {
    callback.call(scope, i, list[i]);
  }
}

function toggleMain(type, elMain, elCover) {
  const method = type !== 'show' ? 'remove' : 'add';

  elMain.classList[method]('floated');
  elCover.classList[method]('floated');
}

function dateDiff(date1, date2, interval) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const monthInYear = 12;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const timeDiff = firstDate - secondDate;

  if (isNaN(timeDiff)) {
    return NaN;
  }

  switch (interval) {
    case 'years':
      return secondDate.getFullYear() - firstDate.getFullYear();
    case 'months':
      return ((secondDate.getFullYear() * monthInYear + secondDate.getMonth()) -
      (firstDate.getFullYear() * monthInYear + firstDate.getMonth()));
    case 'weeks':
      return Math.floor(timeDiff / week);
    case 'days':
      return Math.floor(timeDiff / day);
    case 'hours':
      return Math.floor(timeDiff / hour);
    case 'minutes':
      return Math.floor(timeDiff / minute);
    case 'seconds':
      return Math.floor(timeDiff / second);
    default:
      return null;
  }
}

function isHidden(el) {
  return el.offsetParent === null;
}

function isMobile() {
  return window.orientation !== void 0;
}

function toggleContent(link, content, linkToHide, contentToHide, elMain, elCover, event) {
  event.preventDefault();

  if (link.classList.contains('active')) {
    toggleMain('hide', elMain, elCover);
    content.classList.add('hidden');
    link.classList.remove('active');
  } else {
    toggleMain('show', elMain, elCover);
    content.classList.remove('hidden');
    link.classList.add('active');
  }

  linkToHide.classList.remove('active');
  contentToHide.classList.add('hidden');
}

export default function dom(isLoaded) {
  const careerFrom = 2008;
  const dateOfBirth = '1988/03/02';
  const dateOfLastJob = '2012/07/16';
  const today = new Date();
  const byId = document.getElementById.bind(document);

  const elCover = byId('cover');
  const elMain = byId('main');
  const elCV = byId('cv');
  const elPhoto = byId('photo');
  const elContacts = byId('contacts');
  const elLinkCV = byId('link-cv');
  const elLinkContacts = byId('link-contacts');
  const elHamburgerLinkCV = byId('hamburger-link-cv');
  const elHamburgerLinkContacts = byId('hamburger-link-contacts');
  const elCareerExperience = byId('career-experience');
  const elTags = byId('tags');
  const elAge = byId('age');
  const elQR = byId('qr');
  const elCurrentJob = byId('job-nitka');
  const elMoreInfoNodeList = document.querySelectorAll('.about-project');
  const elHamburger = byId('hamburger');
  const elNavigation = byId('navigation');
  const elPreloader = byId('preloader');
  const elRu = byId('ru');
  const elEn = byId('en');

  if (!isLoaded) {
    setTimeout(() => {
      elCover.style.display = 'flex';
      elPreloader.remove();
    }, 1500);

    if (isMobile()) {
      elQR.remove();
    }

    Object
      .keys(skills)
      .forEach(key =>
        skills[key].forEach(tag => {
          const elTag = document.createElement('span');

          elTag.innerHTML = tag;
          elTag.classList.add(key);
          elTags.appendChild(elTag);
        })
      );
  }

  animateImage(elPhoto);

  elCareerExperience.innerText = today.getFullYear() - careerFrom;
  elAge.innerText = Math.floor(dateDiff(dateOfBirth, today, 'months') / 12);
  elCurrentJob.innerText = (dateDiff(dateOfLastJob, today, 'months') / 12).toFixed(1);

  // Go to CV.
  elLinkCV.addEventListener('click', event =>
    toggleContent(elLinkCV, elCV, elLinkContacts, elContacts, elMain, elCover, event)
  );
  elHamburgerLinkCV.addEventListener('click', event =>
    toggleContent(elLinkCV, elCV, elLinkContacts, elContacts, elMain, elCover, event)
  );

  // Go to Contacts.
  elLinkContacts.addEventListener('click', event =>
    toggleContent(elLinkContacts, elContacts, elLinkCV, elCV, elMain, elCover, event)
  );
  elHamburgerLinkContacts.addEventListener('click', event =>
    toggleContent(elLinkContacts, elContacts, elLinkCV, elCV, elMain, elCover, event)
  );

  // Change language.
  elRu.addEventListener('click', () => render(dom, RU, true));
  elEn.addEventListener('click', () => render(dom, EN, true));

  elHamburger.addEventListener('click', event => {
    event.preventDefault();

    elHamburger.classList.toggle('is-active');
    elNavigation.classList.toggle('hidden');
    elCV.classList.toggle('left');
    elContacts.classList.toggle('left');
  });

  nodeEach(elMoreInfoNodeList, (index, el) =>
    el.addEventListener('click', event => {
      const sibling = event.target.nextElementSibling;

      event.preventDefault();
      sibling.style.display = isHidden(sibling) ? 'block' : 'none';
    })
  );
}
