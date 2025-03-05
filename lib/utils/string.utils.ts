import moment from "moment";

export const formatPathname = (url: string): string =>
    process.env.NEXT_PUBLIC_BASE_PATH
        ? url.replace(`/${process.env.NEXT_PUBLIC_BASE_PATH}`, "")
        : url;

export const formatUrl = (url: string): string =>
    `/${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${
        process.env.NEXT_PUBLIC_BASE_PATH ? "/" : ""
    }${url}`;

export const stringToBoolean = (value: string): boolean => /true/i.test(value);

export const formatString = (value: string): string =>
    value
        ? value
              .toLowerCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
        : "";

export const toPlural = (
    str: string,
    nb: number,
    printNb: boolean = false
): string =>
    `${printNb ? toFixedIfDecimal(nb) : ""} ${str}${
        Math.abs(nb) > 1 ? "s" : ""
    }`;

export const toFixedIfDecimal = (value: number, precision?: number): string =>
    value?.toFixed(precision || !Number.isInteger(value) ? precision ?? 1 : 0);

export const getTimedTitle = (title: string): string => {
    const date = moment().format("YYYYMMDD-HHmmss");
    return `${title}-${date}`;
};
