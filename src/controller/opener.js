import { getYear, getMounth, getDay, findLastPdf } from "./controller.js";

const pathKBP = '//asd/kbp/Сайт'; 

export const openKbp = async (pathToKbp) => {
  const year = await getYear(pathToKbp);
  const month = await getMounth(year);
  const day = await getDay(month);

  await findLastPdf(day);
}