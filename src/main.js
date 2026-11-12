import { createSoundtrackPlayer } from './soundtrack-player.js';
import { locales } from './locales.js';
import { event } from './event.mjs';

const controls = document.querySelector('#preferences');
const languagePicker = document.querySelector('#language');
const musicButton = document.querySelector('#musicToggle');
const musicStatus = document.querySelector('#musicStatus');
const musicIcon = musicButton.querySelector('use');
const media = document.querySelector('#engagementMusic');
const player = createSoundtrackPlayer(media);
const paths = {
  en: '/music/english-hindi-loop-v2.mp3',
  hi: '/music/english-hindi-loop-v2.mp3',
  gu: '/music/gujarati-loop-v2.mp3',
  mr: '/music/marathi-loop-v2.mp3',
};
const soundtrack = lang => {
  // The optional offline preview maps the same filenames to embedded audio.
  const preview = document.querySelector('#embedded-soundtracks');
  return preview ? JSON.parse(preview.textContent)[paths[lang]] : paths[lang];
};
const english = {
  language:'Language', music:'Music', play:'Play music', pause:'Pause music',
  loading:'Loading music…', musicError:'Music could not start. Tap again to retry.',
  thanks:'Thank you for sending us a little love!',
};
const translatable = [...document.querySelectorAll('[data-i18n]')].map(el => ({el,html:el.innerHTML}));
const images = [...document.querySelectorAll('[data-alt-key]')].map(el => ({el,alt:el.alt}));
const langTags = { en:'en-IN',hi:'hi-IN',gu:'gu-IN',mr:'mr-IN' };
let lang = 'en', playing = false, action = 0, message = '', hasCelebrated = false;
const t = key => locales[lang]?.[key] || english[key] || '';
const feedback = document.querySelector('#celebrateFeedback');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

function showMusic() {
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', t(playing ? 'pause' : 'play'));
  musicIcon.setAttribute('href', playing ? '#i-pause' : '#i-music');
  musicStatus.textContent = message ? t(message) : '';
}

function applyLanguage(next) {
  lang = Object.hasOwn(langTags, next) ? next : 'en';
  document.documentElement.lang = lang;
  languagePicker.value = lang;
  languagePicker.setAttribute('aria-label', t('language'));
  const fullDate = new Intl.DateTimeFormat(langTags[lang], {dateStyle:'full', timeZone:event.timezone})
    .format(new Date(event.date + 'T12:00:00' + event.offset));
  for (const {el,html} of translatable) {
    const key = el.dataset.i18n;
    if (key === 'date') el.textContent = fullDate;
    else if (locales[lang]?.[key]) el.textContent = locales[lang][key];
    else el.innerHTML = html;
  }
  for (const {el,alt} of images) el.alt = locales[lang]?.[el.dataset.altKey] || alt;
  for (const time of document.querySelectorAll('[data-event-time]')) {
    const date = new Date(time.dateTime);
    time.textContent = new Intl.DateTimeFormat(langTags[lang], {hour:'numeric',minute:'2-digit',hour12:true,timeZone:event.timezone}).format(date);
  }
  if (hasCelebrated) feedback.textContent = t('thanks');
  showMusic();
  try { localStorage.setItem('engagement-language', lang); } catch { /* Private or offline preview. */ }
}

async function play() {
  const request = ++action;
  message = 'loading';
  musicButton.setAttribute('aria-busy','true');
  showMusic();
  playing = false;
  const started = await player.play(soundtrack(lang));
  if (request !== action) return;
  playing = started;
  message = started ? '' : 'musicError';
  musicButton.removeAttribute('aria-busy');
  showMusic();
}

function pause() {
  action++;
  player.pause();
  playing = false;
  message = '';
  musicButton.removeAttribute('aria-busy');
  showMusic();
}

musicButton.addEventListener('click', () => player.active ? pause() : void play());
languagePicker.addEventListener('change', () => {
  const next = languagePicker.value;
  const switchTrack = player.active && paths[lang] !== paths[next];
  if (switchTrack) pause();
  applyLanguage(next);
  if (switchTrack) void play();
});

let previous;
try { previous = localStorage.getItem('engagement-language'); } catch { /* Storage is optional. */ }
applyLanguage(previous || 'en');
controls.hidden = false;

// Let browser navigation handle the hash and history. Put keyboard focus at the
// heading so subsequent Tab and screen-reader navigation start in the section.
document.addEventListener('click', e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  const link = e.target.closest('a[href^="#"]');
  if (!link || !link.hash.slice(1)) return;
  const target = document.getElementById(link.hash.slice(1));
  const focus = target?.id === 'top' ? document.querySelector('.monogram') : target?.querySelector('[tabindex="-1"]') || target;
  if (focus) requestAnimationFrame(() => focus.focus({preventScroll:true}));
});

const celebrate = document.querySelector('#celebrateButton');
celebrate.hidden = false;
celebrate.addEventListener('click', () => {
  hasCelebrated = true;
  feedback.textContent = t('thanks');
  if (reduce.matches || document.querySelector('.petal')) return;
  const frag = document.createDocumentFragment();
  for (let i=0;i<18;i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.setAttribute('aria-hidden','true');
    petal.style.setProperty('--left', (5 + Math.random()*88) + '%');
    petal.style.setProperty('--delay', (Math.random()*.3) + 's');
    petal.style.setProperty('--drift', ((Math.random()-.5)*90) + 'px');
    petal.style.setProperty('--rotation', (150 + Math.random()*360) + 'deg');
    petal.style.setProperty('--color', ['#dca68e','#e7c590','#ad5c78'][i%3]);
    frag.append(petal);
  }
  document.body.append(frag);
  setTimeout(() => document.querySelectorAll('.petal').forEach(el => el.remove()), 2000);
});
