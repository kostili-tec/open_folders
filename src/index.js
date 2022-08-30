const fs = require('fs');
const path = require('path');
const open = require('open');

const pathKBP = '//asd/kbp/Сайт'; 

let lastYearFolder, lastMonthFoler;

const onlyNumbers = new RegExp('^[0-9]+$');


const openKbp = async () => {

  const arr = [];

  const yearsKBP = await readDir(pathKBP);
  yearsKBP.forEach(file => {   
    if (file.isDirectory()) {
      arr.push(file.name);
    }
  })
  const filteredArr = arr.filter((el) => el.match(onlyNumbers));
  const numberArr = filteredArr.map((el) => Number(el));
  const lastYear = Math.max(...numberArr).toString();
  const pathWithLastYear = `${pathKBP}/${lastYear}`;
  lastYearFolder = pathWithLastYear;
  console.log('arr', arr);
  console.log('arr', numberArr);
  console.log(pathWithLastYear);
  console.log('lastYearFolder', lastYearFolder);

  const monthsFolder = await readDir(pathWithLastYear);
  // console.log(readDir(pathWithLastYear));
  // console.log('monthsFolder', monthsFolder);
  const monthsFolderToNumber = monthsFolder.map((el) => Number(el.name.split('-')[0]));  
  const maxMonthIndex = monthsFolderToNumber.indexOf(Math.max(...monthsFolderToNumber));

  const lastMonth = monthsFolder[maxMonthIndex].name;
  
  const pathWithLastMonth = path.join(pathKBP, lastYear, lastMonth);
  const daysFolder = await readDir(pathWithLastMonth);

  const daysArr = daysFolder.map((day) => Number(day.name));
  const maxDaysIndex = daysArr.indexOf(Math.max(...daysArr));
  
  const lastDay = daysFolder[maxDaysIndex].name;

  const pathWithLastDay = path.join(pathKBP, lastYear, lastMonth, lastDay);

  const PDFfiles = await readDir(pathWithLastDay);
  console.log('PDFfiles', PDFfiles);
  let openedFile = '';
  // const arrNames = PDFfiles.map((file) => file.name);
  const arrNames = [];

  const onlyPDF = [];

  PDFfiles.forEach((pdf) => {
    console.log(pdf.name.split('.')[1]);
    if (pdf.name.split('.')[1] === 'pdf' && pdf.name.indexOf('КБП') != -1) {      
      openedFile = pdf.name;
    }
   
  })
  console.log('openedFile', openedFile);
  
  const finalPath = path.join(pathKBP, lastYear, lastMonth, lastDay, openedFile);
  console.log(finalPath);

  console.log(`${pathWithLastDay}/${openedFile}`);
  // await open(`${pathWithLastDay}/${openedFile}`, {wait: true} );
  await open(finalPath);
}

const readDir = async (path) => {
  let files;
  try {
    files = await fs.promises.readdir(path, {withFileTypes: true});
  } catch (err) {
    console.log(err);
  }
  return files;
}


openKbp();

