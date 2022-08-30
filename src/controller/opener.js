import { getYear, getMounth, getDay, findLastPdf, getYearAp, getDayAp } from "./controller.js";

export const openKbp = async (pathToKbp) => {
  const year = await getYear(pathToKbp);
  const month = await getMounth(year);
  const day = await getDay(month);

  await findLastPdf(day, 'КБП');
}

export const openAp = async (pathToAP) => {
  const year = await getYearAp(pathToAP); 
  const month = await getMounth(year);  
  const day = await getDayAp(month);

  await findLastPdf(day, 'АП');
}

export const openZaman = async (pathToZaman) => {
  const year = await getYear(pathToZaman);
  const month = await getMounth(year);
  const day = await getDay(month);

  await findLastPdf(day, 'Заман');
 
}