import errorImage from "@/public/error.gif";
import { Box, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import Back from "./back";

type Props = {
    title?: string;
    subtitle: string;
    image?: StaticImageData;
};

export default function ErrorComponent(props: Props) {
    return (
        <>
            <Back />
            <Typography variant="h5">
                {props.title ?? "Oops ! Une erreur est survenue"}
            </Typography>
            <Typography>{props.subtitle}</Typography>
            <Box textAlign="center" width="100%">
                <Image
                    src={props.image ?? errorImage}
                    alt="Erreur"
                    unoptimized
                />
            </Box>
        </>
    );
}
