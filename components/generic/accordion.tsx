import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { ReactElement } from "react";

type Props = {
    title: string | ReactElement;
    defaultExpanded?: boolean;
    children: ReactElement | ReactElement[];
    paper?: boolean;
};

export default function Expandable(props: Props) {
    return (
        <Accordion
            defaultExpanded={props.defaultExpanded}
            disableGutters
            elevation={props.paper ? 1 : 0}
            sx={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {typeof props.title === "string" ? (
                    <Typography fontWeight="bold">{props.title}</Typography>
                ) : (
                    props.title
                )}
            </AccordionSummary>
            <AccordionDetails>{props.children}</AccordionDetails>
        </Accordion>
    );
}
