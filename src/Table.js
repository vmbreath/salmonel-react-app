import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useSelector, useDispatch} from "react-redux";
import {selectData, selectQueryFilter, setNewData, updateNewData} from "./searchReducer";

const columns = [
    {id: 'allgroups', label: 'Группа', minWidth: 60},
    {id: 'serovar', label: 'Серовар', minWidth: 60},
    {id: 'o_antigen', label: 'Соматические О антигены', minWidth: 40},
    {
        id: 'h_antigen1',
        label: 'Соматические H антигены (Фаза 1)',
        minWidth: 40,

    },
    {
        id: 'h_antigen2',
        label: 'Соматические H антигены (Фаза 2)',
        minWidth: 40,

    },
];

const useStyles = makeStyles({
    root: {
        maxWidth: 690,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        maxHeight: '70vh',
    },
});

export default function StickyHeadTable() {
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    let queryFilter = useSelector(selectQueryFilter);
    useEffect(() => {
        if (data[0] === 'first-load') {
            allData().then((res) => {
                dispatch(setNewData(res));
            });
        }
    }, []);

    useEffect(async () => {
        const url = new URL('https://salmonel-heroku.herokuapp.com/filter')
        const params = [['filter', JSON.stringify(queryFilter)]]
        url.search = new URLSearchParams(params).toString();
        let response = await fetch(url);
        let commits = await response.json();
        dispatch(updateNewData(commits));
        setPage(0);
    }, [queryFilter])

    const allData = async () => {
        let url = 'https://salmonel-heroku.herokuapp.com/test';
        let response = await fetch(url);
        let commits = await response.json();
        return await commits;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        //setFilteredData(data.slice(0,rowsPerPage));
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table size={'small'} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow style={{height: 33}}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        let value = row[column.id];
                                        if (Array.isArray(value))
                                            value = value.join(', ')
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
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
                rowsPerPageOptions={[15, 50, 100, 500]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}