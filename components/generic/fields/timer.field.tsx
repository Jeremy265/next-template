import { editIcon, errorIcon, successIcon } from "@/lib/utils/icon.utils";

import { formatUrl } from "@/lib/utils/string.utils";
import {
    decomposeDurationInSeconds,
    displayDuration,
} from "@/lib/utils/time.utils";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import { InputAdornment } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import Aligned from "../aligned";
import CustomButton from "../button";
import Progress from "../progress";
import { FieldProps } from "./field";

type Props = {
    defaultValueSeconds?: number;
    hideControl?: boolean;
    hideFields?: boolean;
    isConform?: boolean;
} & FieldProps;

const getExpireInDate = (expireInSeconds: number | null): Date =>
    moment().add(expireInSeconds, "seconds").toDate();

const beep = new Audio(formatUrl("beep.mp3"));

function TimerField(props: Props) {
    const [expireInSeconds, setExpireInSeconds] = useState(
        props.defaultValueSeconds ?? null
    );
    const [alarm, setAlarm] = useState(false);

    useEffect(() => {
        setExpireInSeconds(props.defaultValueSeconds ?? null);
    }, [props.defaultValueSeconds]);

    useEffect(() => {
        if (alarm) {
            beep.play();
        } else {
            beep.pause();
            beep.currentTime = 0;
        }
    }, [alarm]);

    const { totalSeconds, restart, pause, isRunning } = useTimer({
        expiryTimestamp: getExpireInDate(expireInSeconds),
        autoStart: false,
        onExpire: () => setAlarm(true),
    });

    const showFields = !props.hideFields && !isRunning;
    const timerSet = Boolean(expireInSeconds);
    const showProgress = timerSet && (isRunning || alarm);
    const showControl = timerSet && !props.hideControl;

    return (
        <Aligned space={2} noWrap>
            {showFields && (
                <>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                            label={props.label}
                            format="mm:ss"
                            views={["minutes", "seconds"]}
                            timeSteps={{
                                seconds: 1,
                                minutes: 1,
                            }}
                            value={
                                expireInSeconds
                                    ? moment()
                                          .minutes(
                                              decomposeDurationInSeconds(
                                                  expireInSeconds
                                              ).minutes
                                          )
                                          .seconds(
                                              decomposeDurationInSeconds(
                                                  expireInSeconds
                                              ).seconds
                                          )
                                    : null
                            }
                            onChange={(value: Moment | null) => {
                                const newExpireInSeconds = value
                                    ? value.minutes() * 60 + value.seconds()
                                    : null;
                                setExpireInSeconds(newExpireInSeconds);
                                props.onChange &&
                                    props.onChange(newExpireInSeconds);
                            }}
                            disabled={props.disabled}
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                    error: props.error,
                                    helperText: props.helperText,
                                    InputProps: {
                                        startAdornment:
                                            props.isConform !== undefined ? (
                                                <InputAdornment position="start">
                                                    {props.defaultValueSeconds ===
                                                        undefined ||
                                                    props.defaultValueSeconds ===
                                                        null
                                                        ? editIcon
                                                        : props.isConform
                                                        ? successIcon
                                                        : errorIcon}
                                                </InputAdornment>
                                            ) : undefined,
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </>
            )}
            {showProgress && expireInSeconds && (
                <Progress
                    progress={100 - (totalSeconds / expireInSeconds) * 100}
                    text={displayDuration(totalSeconds)}
                    blink={totalSeconds <= 10}
                />
            )}
            {showControl && expireInSeconds && (
                <CustomButton
                    className={
                        isRunning ? "warning" : alarm ? "danger blink" : "info"
                    }
                    icon={isRunning || alarm ? <TimerOffIcon /> : <TimerIcon />}
                    onClick={() =>
                        isRunning
                            ? pause()
                            : alarm
                            ? setAlarm(false)
                            : restart(getExpireInDate(expireInSeconds))
                    }>
                    {isRunning || alarm ? "Stop" : "Démarrer"}
                </CustomButton>
            )}
        </Aligned>
    );
}

export default TimerField;
