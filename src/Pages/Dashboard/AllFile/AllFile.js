import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

import { styled } from '@mui/material/styles';
import tableCellClasses from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const AllFile = () => {
    const [allFiles, setAllFiles] = useState([]);
    const [search, setSearch] = useState('');
    const { receptionist } = useAuth();

    useEffect(() => {
        fetch('https://shrouded-spire-42050.herokuapp.com/files/user')
            .then(res => res.json())
            .then(data => setAllFiles(data))
    }, []);

    // Delete a product 
    const handleDelete = id => {
        const confirm = window.confirm('Are You Sure To Delete This File...?');
        if (confirm) {
            fetch(`https://shrouded-spire-42050.herokuapp.com/files/user/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log('this is data', data);
                    const remaining = allFiles.filter(file => file._id !== id);
                    setAllFiles(remaining);
                })
        }

    }

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Total File : {allFiles.length}</h3>

            {/* search input  */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 5 }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                <TextField
                    id="filled-search"
                    label="Search..."
                    type="search"
                    onChange={(e) => { setSearch(e.target.value) }}
                    variant="standard" />
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">File Name</StyledTableCell>
                            <StyledTableCell align="center">Company Name</StyledTableCell>
                            <StyledTableCell align="center">Person Name</StyledTableCell>
                            <StyledTableCell align="center">Department</StyledTableCell>

                            {
                                receptionist && <StyledTableCell align="center">Action</StyledTableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allFiles.filter(val => {
                            if (search === '') {
                                return val;
                            }
                            else if (val.fileName.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return val
                            }
                            else if (val.company.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return val
                            }


                        }).map((row) => (
                            <StyledTableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{row.fileName}</StyledTableCell>
                                <StyledTableCell align="center">{row.company}</StyledTableCell>
                                <StyledTableCell align="center">{row.personName}</StyledTableCell>
                                <StyledTableCell align="center">{row.department}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        receptionist && <StyledTableCell align="center">


                                            <Select>
                                                <MenuItem>
                                                    <NavLink
                                                        style={{ textDecoration: 'none', color: 'white', }}

                                                        to={`/dashboard/update/${row._id}`}>

                                                        <Button variant="contained" style={{ backgroundColor: 'green' }}>
                                                            Update
                                                        </Button>
                                                    </NavLink>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Button variant="contained"
                                                        onClick={() => handleDelete(row._id)}
                                                        style={{ backgroundColor: 'red' }}>
                                                        Delete
                                                    </Button>
                                                </MenuItem>
                                            </Select>

                                        </StyledTableCell>
                                    }

                                </StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllFile;