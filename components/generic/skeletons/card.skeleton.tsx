import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function CardSkeleton() {
    return (
        <Grid container direction="column">
            <Grid>
                <Grid container justifyContent="space-between">
                    <Grid>
                        <Skeleton
                            variant="rectangular"
                            width={150}
                            height={40}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                <Skeleton variant="rectangular" sx={{ my: 2 }} height={50} />
            </Grid>
            <Grid>
                <Skeleton variant="rectangular" height={60} />
            </Grid>
        </Grid>
    );
}
