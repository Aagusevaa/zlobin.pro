import './vendor/ga.js';
import { skills } from './skills';

import '../sass/main.scss';

const carreerFrom = 2008;
const dateOfBirth = '1988/03/02';
const dateOfLastJob = '2012/07/16';
const today = new Date();
const byId = document.getElementById.bind(document);

const elCover = byId('cover');
const elMain = byId('main');
const elCV = byId('cv');
const elContacts = byId('contacts');
const elLinkCV = byId('link-cv');
const elLinkContacts = byId('link-contacts');
const elHamburgerLinkCV = byId('hamburger-link-cv');
const elHamburgerLinkContacts = byId('hamburger-link-contacts');
const elCareerExperience = byId('career-expirience');
const elTags = byId('tags');
const elAge = byId('age');
const elQR = byId('qr');
const elCurrentJob = byId('job-nitka');
const elMoreInfoNodeList = document.querySelectorAll('.about-project');
const elHamburger = byId('hamburger');
const elNavigation = byId('navigation');

function nodeEach(list, callback, scope) {
  for (let i = 0; i < list.length; i++) {
    callback.call(scope, i, list[i]);
  }
}

function toggleMain(type) {
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

function toggleContent(link, content, linkToHide, contentToHide, event) {
  event.preventDefault();

  if (link.classList.contains('active')) {
    toggleMain('hide');
    content.classList.add('hidden');
    link.classList.remove('active');
  } else {
    toggleMain('show');
    content.classList.remove('hidden');
    link.classList.add('active');
  }

  linkToHide.classList.remove('active');
  contentToHide.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => (elCover.style.display = 'flex'), 1500);

  elCareerExperience.innerText = today.getFullYear() - carreerFrom;
  elAge.innerText = Math.floor(dateDiff(dateOfBirth, today, 'months') / 12);
  elCurrentJob.innerText = (dateDiff(dateOfLastJob, today, 'months') / 12).toFixed(1);

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

  // Go to CV.
  elLinkCV.addEventListener('click', event =>
    toggleContent(elLinkCV, elCV, elLinkContacts, elContacts, event)
  );
  elHamburgerLinkCV.addEventListener('click', event =>
    toggleContent(elLinkCV, elCV, elLinkContacts, elContacts, event)
  );

  // Go to Contacts.
  elLinkContacts.addEventListener('click', event =>
    toggleContent(elLinkContacts, elContacts, elLinkCV, elCV, event)
  );
  elHamburgerLinkContacts.addEventListener('click', event =>
    toggleContent(elLinkContacts, elContacts, elLinkCV, elCV, event)
  );

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
});
