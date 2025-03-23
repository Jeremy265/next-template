import CustomComponent from "@/components/custom-component";
import Aligned from "@/components/generic/aligned";
import { printWithIcon } from "@/lib/utils/icon.utils";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Typography } from "@mui/material";
import Link from "next/link";

export default async function CustomPath() {
    return (
        <Aligned col>
            <Typography variant="h5">
                Play with links and next routing
            </Typography>
            <Link href="/custom-path/1">
                {printWithIcon("1", <OpenInNewIcon />, "right")}
            </Link>
            <Link href="/custom-path/a">
                {printWithIcon("a", <OpenInNewIcon />)}
            </Link>
            <Link href="/custom-path/slug">
                {printWithIcon("slug", <OpenInNewIcon />)}
            </Link>
            <Link href="/does-not-exist">
                {printWithIcon("does-not-exist", <OpenInNewIcon />)}
            </Link>
            <Typography variant="h5">Play with client components</Typography>
            <CustomComponent />
        </Aligned>
    );
}
