import { utils, writeFile } from "xlsx";
import { getTimedTitle } from "./string.utils";

export const exportToExcel = async (title: string, data: any[]) => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    const columns = Object.keys(data[0]);
    if (data[0])
        worksheet["!autofilter"] = {
            ref: `A1:${getExcelColonneByIndex(columns.length)}1`,
        };
    worksheet["!cols"] = columns.map(() => ({ width: 20 }));
    utils.book_append_sheet(workbook, worksheet, title.slice(0, 15));
    writeFile(workbook, `${getTimedTitle(title)}.xlsx`);
};

const getExcelColonneByIndex = (index: number): string =>
    index === 0
        ? ""
        : getExcelColonneByIndex(Math.floor((index - 1) / 26)) +
          String.fromCharCode(65 + ((index - 1) % 26));
