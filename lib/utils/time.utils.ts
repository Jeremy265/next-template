import moment, { Moment } from "moment";
import { toPlural } from "./string.utils";

export const getTextUntilDeadline = (deadline: Date | Moment) => {
    if (moment(deadline).isSame(moment().subtract(1, "day"), "day"))
        return "Hier";
    if (moment(deadline).isSame(moment(), "day")) return "Aujourd'hui";
    if (moment(deadline).isSame(moment().add(1, "day"), "day")) return "Demain";

    const numberOfDaysLeft = moment(deadline).diff(moment(), "days", true);

    return `${numberOfDaysLeft < 0 ? "Il y a" : "Dans"} ${toPlural(
        "jour",
        Math.abs(Math.ceil(numberOfDaysLeft)),
        true
    )}`;
};

export const formatDate = (
    date: Date = new Date(),
    printTime: boolean = false
): string => moment(date).format(`DD/MM/YYYY${printTime ? " à HH:mm:ss" : ""}`);
