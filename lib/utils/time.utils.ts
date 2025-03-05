import moment, { Moment } from "moment";

export const formatDate = (
    date: Date = new Date(),
    printTime: boolean = false
): string => moment(date).format(`DD/MM/YYYY${printTime ? " à HH:mm:ss" : ""}`);

export const getDisplayPeriod = (from: Moment, to: Moment) =>
    `${from.format("DD/MM/YY")}-${to.format("DD/MM/YY")}`;
