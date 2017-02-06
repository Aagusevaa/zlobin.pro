// @link http://tympanus.net/Development/ImageTiltEffect/
/* global window, document */

const body = document.body;
const element = document.documentElement;
const options = {
  extraImages: 3, // 2
  opacity: 0.4, // 0.7
  movement: {
    perspective: 700, // 1000
    translateX: -2, // -10
    translateY: -2, // -10
    translateZ: 4, // 20
    rotateX: 2, // 2
    rotateY: 4, // 2
    rotateZ: 0 // 0
  }
};

const wrapper = document.createElement('div');
let images = [];
let el;

function mousePosition(event = window.event) {
  let x = 0;
  let y = 0;

  if (event.pageX || event.pageY) {
    x = event.pageX;
    y = event.pageY;
  } else if (event.clientX || event.clientY) {
    x = event.clientX + body.scrollLeft
      + element.scrollLeft;
    y = event.clientY + body.scrollTop
      + element.scrollTop;
  }

  return { x, y };
}


const applyDOM = () => {
  const background = document.createElement('div');

  images = [];

  if (wrapper.classList.contains('effect')) {
    wrapper.innerHTML = '';
  }

  wrapper.className = 'effect';

  background.className = 'background';
  background.style.backgroundImage = `url(${el.src})`;
  wrapper.appendChild(background);

  for (let i = 0; i < options.extraImages; ++i) {
    const img = document.createElement('div');

    img.className = 'front';
    img.style.backgroundImage = `url(${el.src})`;
    img.style.opacity = options.opacity;

    wrapper.appendChild(img);
    images.push(img);
  }

  el.parentNode.insertBefore(wrapper, el);
  el.parentNode.removeChild(el);
};

const view = () => ({
  width: wrapper.offsetWidth,
  height: wrapper.offsetHeight
});

const initEvents = () => {
  const {
    perspective,
    rotateX,
    rotateY,
    rotateZ,
    translateX,
    translateY,
    translateZ
  } = options.movement;
  const extraImages = options.extraImages;

  wrapper
    .addEventListener('mousemove', event => {
      let i = 0;
      const { x, y } = mousePosition(event);
      const docScrolls = {
        left: body.scrollLeft + element.scrollLeft,
        top: body.scrollTop + element.scrollTop
      };
      const { left, top } = wrapper.getBoundingClientRect();
      const mouse = {
        x: x - left - docScrolls.left,
        y: y - top - docScrolls.top
      };
      const calculate = (position, index, hw, coord) =>
        (2 * ((index + 1) * position / extraImages) /
        view()[hw] * mouse[coord] -
        ((index + 1) * position / extraImages)).toFixed(4);

      wrapper.classList.add('gray');

      images.forEach(img => {
        const rotX = rotateX ? calculate(rotateX, i, 'height', 'y') : 0;
        const rotY = rotateY ? calculate(rotateY, i, 'width', 'x') : 0;
        const rotZ = rotateZ ? calculate(rotateZ, i, 'width', 'x') : 0;
        const transX = translateX ? calculate(translateX, i, 'width', 'x') : 0;
        const transY = translateY ? calculate(translateY, i, 'height', 'y') : 0;
        const transZ = translateZ ? calculate(translateZ, i, 'height', 'y') : 0;
        const transform = `perspective(${perspective}px) ` +
          `translate3d(${transX}px, ${transY}px, ${transZ}px) ` +
          `rotate3d(1, 0, 0, ${rotX}deg) ` +
          `rotate3d(0, 1, 0, ${rotY}deg) ` +
          `rotate3d(0, 0, 1, ${rotZ}deg)`;

        img.style.transform = transform;
        i++;
      });
    });

  // Reset all when mouse leaves the main wrapper.
  wrapper
    .addEventListener('mouseleave', () =>
      setTimeout(() =>
        images.forEach(img =>
          (img.style.transform = `perspective(${perspective}px) ` +
            'translate3d(0, 0, 0) rotate3d(1, 1, 1, 0deg)')
        ), 60)
      && wrapper.classList.remove('gray')
    );
};

export default function animateImage(imgEl) {
  el = imgEl;
  applyDOM();
  initEvents();
}
