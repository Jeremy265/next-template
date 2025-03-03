import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function BasicPageSkeleton() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs zeroMinWidth>
                        <Grid container>
                            <Grid item xs={12}>
                                <Skeleton variant="text" />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="text" height={20} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rectangular" height={530} />
            </Grid>
        </Grid>
    );
}
