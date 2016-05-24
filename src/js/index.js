import './vendor/ga.js';
import { skills } from './skills';

import '../sass/main.scss';

const carreerFrom = 2008;
const dateOfBirth = '03-02-1988';
const lastJob = '07-16-2012';
const today = new Date();
const byId = document.getElementById.bind(document);

const elCover = byId('cover');
const elMain = byId('main');
const elCV = byId('cv');
const elContacts = byId('contacts');
const elLinkCV = byId('link-cv');
const elLinkContacts = byId('link-contacts');
const elCareerExpirience = byId('career-expirience');
const elTags = byId('tags');
const elAge = byId('age');
const elCurrentJob = byId('job-nitka');
const elMoreInfoNodeList = document.querySelectorAll('.about-project');

function nodeEach(list, callback, scope) {
  for (let i = 0; i < list.length; i++) {
    callback.call(scope, i, list[i]);
  }
}

function toggleMain(type) {
  elMain.classList[type !== 'show' ? 'remove' : 'add']('floated');
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

function getAge(birthDate) {
  return `${Math.floor(dateDiff(birthDate, today, 'months') / 12)}`;
}

function getJobPeriod(jobDate) {
  return `${(dateDiff(jobDate, today, 'months') / 12).toFixed(1)}`;
}

function isHidden(el) {
  return el.offsetParent === null;
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

  elCareerExpirience.innerText = new Date().getFullYear() - carreerFrom;
  elAge.innerText = getAge(dateOfBirth);
  elCurrentJob.innerText = getJobPeriod(lastJob);

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

  // Go to Contacts.
  elLinkContacts.addEventListener('click', event =>
    toggleContent(elLinkContacts, elContacts, elLinkCV, elCV, event)
  );

  nodeEach(elMoreInfoNodeList, (index, el) =>
    el.addEventListener('click', event => {
      const sibling = event.target.nextElementSibling;

      event.preventDefault();
      sibling.style.display = isHidden(sibling) ? 'block' : 'none';
    })
  );
});
