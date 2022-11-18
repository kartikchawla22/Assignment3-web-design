import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import * as firebaseConfig from '../../firebase'
import { UserType } from "../../utils/types";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './index.module.scss';

// Interface for the table column settings.

interface Column {
    id: 'name' | 'email';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


const UserListPage = () => {
    // Getting the Db object from firestore.
    const db = getFirestore(firebaseConfig.app);
    // Setting and getting the rows that needs to be shown in the table.
    const [rows, setRows] = useState<Array<UserType>>([])
    // Setting and getting the current page number for pagination.
    const [page, setPage] = useState<number>(0);
    // Setting and getting the max number of rows that needs to be shown on 1 page.
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    // This hook is fired everytime this page loads.
    // We are getting the list of all the users from firestore.
    useEffect(() => {
        const getUsers = async () => {
            let data: Array<UserType> = []
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                data.push(doc.data() as UserType)
                setRows(data)
            });
        }
        getUsers()
    }, [])


    // Defining the columns that we need to show in the table.
    const columns: readonly Column[] = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 }
    ];


    // Handling page change using pagination.
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Handling the change in max number of rows.
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default UserListPage