import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import open from 'open';


const onlyNumbers = new RegExp('^[0-9]+$');

let flag1 = process.argv[2];

export const getYear = async (mainPath) => {
  const arrDirectory = [];
  const yearsFolder = await readDir(mainPath);
  yearsFolder.forEach((file) => {
    if (file.isDirectory()) {
      arrDirectory.push(file.name);
    }
  })
  const filteredArr = arrDirectory.filter((el) => el.match(onlyNumbers));
  const numberArr = filteredArr.map((el) => Number(el));
  const lastYear = Math.max(...numberArr).toString();

  return path.join(mainPath, lastYear);
}

export const getMounth = async (pathWithYear) => {
  const monthsFolder = await readDir(pathWithYear);

  const onlyFolders = monthsFolder.filter((file) => file.isDirectory()); 
  const monthsFolderToNumber = onlyFolders.map((el) => Number(el.name.split('-')[0]));  
  const maxMonthIndex = monthsFolderToNumber.indexOf(Math.max(...monthsFolderToNumber));
 
  const lastMonth = onlyFolders[maxMonthIndex].name;
  
  const pathWithLastMonth = path.join(pathWithYear, lastMonth);

  return pathWithLastMonth;
}

export const getDay = async (pathWithMonth) => {
  const daysFolder = await readDir(pathWithMonth);

  const daysArr = daysFolder.map((day) => Number(day.name));
  const maxDaysIndex = daysArr.indexOf(Math.max(...daysArr));
  
  const lastDay = daysFolder[maxDaysIndex].name;

  const pathWithLastDay = path.join(pathWithMonth, lastDay);

  return pathWithLastDay;
}

export const findLastPdf = async (fullPath, fileName) => {  
  const PDFfiles = await readDir(fullPath);
  let openedFile;
  PDFfiles.forEach((pdf) => {
    // console.log(pdf.name.split('.')[1]);
    if (pdf.name.split('.')[1] === 'pdf' && pdf.name.indexOf(fileName) != -1) {      
      openedFile = pdf.name;
    }   
  })
  console.log(openedFile);
  const finalPath = path.join(fullPath, openedFile);
  if (flag1 === 'folders') {
    await open(fullPath)
  } else {
    await open(finalPath);
  }
}

//////////////////////// AP ////////////////////

export const getYearAp = async (mainPath) => {
  const arrDirectory = [];
  const yearsFolder = await readDir(mainPath);
  yearsFolder.forEach((file) => {
    if (file.isDirectory()) {
      arrDirectory.push(file.name);
    }   
  })
  const filteredArr = arrDirectory.filter((el) => el.indexOf('АП') !== -1);
  const nameFolder = filteredArr[0].split(' - ')[0];
  const numberArr = filteredArr.map((el) => Number(el.split(' - ')[1]));

  const lastYear = Math.max(...numberArr).toString();
  const lastYearFolder = `${nameFolder} - ${lastYear}`;  

  return path.join(mainPath, lastYearFolder);
}

export const getDayAp = async (pathWithMonth) => {
  const daysFolder = await readDir(pathWithMonth);
  const onlyFolders = [];
  let maxVal = 0;
  let maxStr;
  daysFolder.forEach((file) => {
    if (file.isDirectory()) {
      onlyFolders.push(file.name);
    } 
  })
  onlyFolders.forEach((el => {
    const numberDay = Number(el.split('.')[0]);
    if (numberDay > maxVal){
      maxVal = numberDay;
      maxStr = el;
    }
  }))
  return path.join(pathWithMonth, maxStr);
}

const readDir = async (path) => {
  let files;
  try {
    files = await fs.readdir(path, {withFileTypes: true});
  } catch (err) {
    console.log(err);
  }
  return files;
}