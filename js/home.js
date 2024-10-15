import {insertHeader} from './functions.js';

const header_placeholder = window.header_placeholder;

window.addEventListener('load', insertHeader(header_placeholder));