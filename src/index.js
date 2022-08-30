import { openKbp, openAp, openZaman } from './controller/opener.js';

const newspapers = {
  KBP: '//asd/kbp/Сайт',
  AP: '//asd/kbp/AP',
  ZAMAN: '//asd/kbp/Заман'
}

// openKbp(newspapers.KBP);
// openAp(newspapers.AP);
// openZaman(newspapers.ZAMAN);

const run = () => {
  setTimeout(() => {
    console.log('find KBP');
    openKbp(newspapers.KBP);
  }, 500);
  setTimeout(() => {
    console.log('find KBP');
    openAp(newspapers.AP);
  }, 3000);
  setTimeout(() => {
    console.log('find KBP');
    openZaman(newspapers.ZAMAN);
  }, 6000);
  
}

run();