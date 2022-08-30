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
  
  const pathWithLastMonth = `${pathKBP}/${lastYear}/${lastMonth}`;

  const daysFolder = await readDir(pathWithLastMonth);

  console.log(daysFolder);

  const daysArr = daysFolder.map((day) => Number(day.name));
  const maxDaysIndex = daysArr.indexOf(Math.max(...daysArr));
  console.log(maxDaysIndex); 
  const lastDay = daysFolder[maxDaysIndex].name;

  const pathWithLastDay = `${pathKBP}/${lastYear}/${lastMonth}/${lastDay}`;

  console.log(pathWithLastDay);  

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

const getLastYear = () => {

};

openKbp();

