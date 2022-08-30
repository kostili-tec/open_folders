import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import open from 'open';


const onlyNumbers = new RegExp('^[0-9]+$');


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
  const monthsFolderToNumber = monthsFolder.map((el) => Number(el.name.split('-')[0]));  
  const maxMonthIndex = monthsFolderToNumber.indexOf(Math.max(...monthsFolderToNumber));

  const lastMonth = monthsFolder[maxMonthIndex].name;
  
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

export const findLastPdf = async (fullPath) => {  
  const PDFfiles = await readDir(fullPath);
  let openedFile;
  PDFfiles.forEach((pdf) => {
    console.log(pdf.name.split('.')[1]);
    if (pdf.name.split('.')[1] === 'pdf' && pdf.name.indexOf('КБП') != -1) {      
      openedFile = pdf.name;
    }   
  })
  console.log(openedFile);
  const finalPath = path.join(fullPath, openedFile);
  await open(finalPath);
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