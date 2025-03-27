import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function BasicPageSkeleton() {
    return (
        <Grid container>
            <Grid size={{ xs: 12 }}>
                <Grid container>
                    <Grid>
                        <Grid container>
                            <Grid size={{ xs: 12 }}>
                                <Skeleton variant="text" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Skeleton variant="text" height={20} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Skeleton variant="rectangular" height={530} />
            </Grid>
        </Grid>
    );
}
