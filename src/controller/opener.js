import { getYear, getMounth, getDay, findLastPdf } from "./controller.js";

export const openKbp = async (pathToKbp) => {
  const year = await getYear(pathToKbp);
  const month = await getMounth(year);
  const day = await getDay(month);

  await findLastPdf(day);
}