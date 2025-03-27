import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
    progress: number;
    text?: string;
    blink?: boolean;
};

const getcolorByProgress = (progress: number) =>
    progress > 50 ? (progress > 75 ? "error" : "warning") : "success";

export default function Progress(props: Props) {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                size="55px"
                variant="determinate"
                value={props.progress}
                color={getcolorByProgress(props.progress)}
                className={props.blink ? "blink" : ""}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Typography className={props.blink ? "blink" : ""}>
                    {props.text ?? `${Math.round(props.progress)}%`}
                </Typography>
            </Box>
        </Box>
    );
}
