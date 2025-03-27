import moment, { Moment } from "moment";

export const formatDate = (
    date: Moment = moment(),
    printTime: boolean = false
): string => date.format(`DD/MM/YYYY${printTime ? " à HH:mm:ss" : ""}`);

export const getDisplayPeriod = (from: Moment, to: Moment) =>
    `${formatDate(from)}-${formatDate(to)}`;

export const decomposeDurationInSeconds = (seconds: number) => ({
    minutes: (seconds < 0 ? -1 : 1) * Math.floor(Math.abs(seconds) / 60) || 0,
    seconds: ((seconds < 0 ? -1 : 1) * Math.abs(seconds)) % 60 || 0,
});

const pad0 = (number: number = 0) =>
    `${Math.abs(number) >= 0 && Math.abs(number) < 10 ? "0" : ""}${Math.abs(
        number
    )}`;

export const displayDuration = (
    durationInSeconds: number,
    showSymbol: boolean = false
) => {
    const { minutes, seconds } = decomposeDurationInSeconds(durationInSeconds);
    return `${showSymbol ? (durationInSeconds < 0 ? "-" : "+") : ""}${pad0(
        minutes
    )}:${pad0(seconds)}`;
};
