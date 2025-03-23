"use client";

import { itemInspectionUtils } from "@/api/inspections/items/item_inspections.utils";
import { InspectionsContext } from "@/lib/contexts/inspections.provider";
import { ItemInspection } from "@/lib/type";
import { Badge } from "@mui/material";
import {
    DateCalendar,
    LocalizationProvider,
    PickersDay,
    PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useContext } from "react";
import CustomButton from "../buttons/button";

type Props = {
    onChange: (date: Date) => void;
    selectedDay: Date;
    pickWeek?: boolean;
};

function ServerDay(
    props: PickersDayProps<Moment> & {
        itemInspections?: ItemInspection[];
        pickWeek: boolean;
        selectedDay: Moment;
    }
) {
    const {
        itemInspections = [],
        pickWeek,
        selectedDay,
        selected,
        day,
        ...other
    } = props;

    const numberOfFullfilledInspection = itemInspections.filter(
        (itemInspection) =>
            itemInspection.fullfilled_on &&
            moment(itemInspection.fullfilled_on).isSame(day, "day")
    ).length;

    const numberOfComingInspection = itemInspections.filter(
        (itemInspection) =>
            !itemInspection.fullfilled_on &&
            itemInspectionUtils.hasInspectionOnDay(itemInspection, day.toDate())
    ).length;

    return (
        <Badge
            overlap="circular"
            badgeContent={
                numberOfFullfilledInspection + numberOfComingInspection
            }
            color={
                numberOfComingInspection
                    ? itemInspectionUtils.getDayColorByDelay(day)
                    : "success"
            }>
            <PickersDay
                {...other}
                selected={
                    pickWeek && moment(day).isSame(selectedDay, "week")
                        ? true
                        : selected
                }
                day={day}
            />
        </Badge>
    );
}

export function Calendar(props: Props) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <CustomButton
                onClick={() => {
                    props.onChange(new Date());
                }}>
                Aujourd&apos;hui
            </CustomButton>
            <DateCalendar
                showDaysOutsideCurrentMonth
                slots={{
                    day: ServerDay as any,
                }}
                slotProps={{
                    day: {
                        itemInspections:
                            useContext(InspectionsContext).itemInspections,
                        pickWeek: props.pickWeek,
                        selectedDay: props.selectedDay,
                    } as any,
                }}
                value={moment(props.selectedDay)}
                onChange={(date: Moment | null) =>
                    date ? props.onChange(date.toDate()) : null
                }
            />
        </LocalizationProvider>
    );
}
