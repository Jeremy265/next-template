import moment, { Moment } from "moment";

export const formatDate = (
    date: Moment = moment(),
    printTime: boolean = false
): string => date.format(`DD/MM/YYYY${printTime ? " à HH:mm:ss" : ""}`);

export const getDisplayPeriod = (from: Moment, to: Moment) =>
    `${formatDate(from)}-${formatDate(to)}`;
