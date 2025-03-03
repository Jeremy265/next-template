import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

export default function TableSkeleton() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" height={20} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
