import Back from "@/components/generic/back";
import { Typography } from "@mui/material";

export default async function CustomPathId(props: {
    params: Promise<{ id: string }>;
}) {
    return (
        <>
            <Back />
            <Typography variant="h6" component="h2" gutterBottom>
                {(await props.params).id}
            </Typography>
        </>
    );
}
