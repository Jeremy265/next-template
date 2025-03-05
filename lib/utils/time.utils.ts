import moment, { Moment } from "moment";

export const formatDate = (
    date: Moment = moment(),
    printTime: boolean = false
): string => date.format(`DD/MM/YYYY${printTime ? " à HH:mm:ss" : ""}`);

export const getDisplayPeriod = (from: Moment, to: Moment) =>
    `${from.format("DD/MM/YY")}-${to.format("DD/MM/YY")}`;
