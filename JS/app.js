import { valida } from './validação.js';

const inputs = document.querySeletorAll('input');

inputs.forEach(input => {
  input.addEventListener('blur', (evento) => {
    valida(evento.target);
  })
})