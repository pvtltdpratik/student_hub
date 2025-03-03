
import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { GetDataForFees,getPreviousYearData } from '../service/api.js';
import { FormControl, Input, InputLabel, NativeSelect, Button } from '@mui/material'
import { AiFillEye } from 'react-icons/ai';
import Feesdetails from './feesdetails.jsx';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

let totalFees

function getTotalFees(fees) {
    totalFees = fees;
}

export default function Feeshistory() {

    const navigate = useNavigate();
    const temp = localStorage.getItem('token');
    const [sname, setSname] = useState("");
    const [type, setType] = useState("1");
    const [students, setStudent] = useState([]);



    const getAllStudentDataForFees = async () => {
        let response = await GetDataForFees();
        setStudent(response?.data.data);
    }
    const getPreviousData =  async(e) => {
        console.log(e.target.value);
       const response= await getPreviousYearData({'year':e.target.value});
       setStudent(response?.data.data);
    }


    const filter = (e) => {
        setSname(e.target.value);
    };

    function redcolor(id) {

        var rowid = document.getElementById(id)
        rowid.style.backgroundColor = 'red';
    }

    useEffect(() => {
        console.log(temp);
        if (temp === null) {
            navigate('/');
        }
    }, [temp])

    useEffect(() => {
        getAllStudentDataForFees();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>


            <Sidenav />
            <Box component='main' className='table-responsive' sx={{ flexGrow: 1, p: 3 }}>

                <AppBar position="static" style={{ backgroundColor: '#002147' }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Fees Details
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e) => filter(e)}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>

                <div className="card comman-shadow mt-5">
                    <div className="row align-items-center mt-3">

                        <div className='col-xl-4 col-md-4 d-flex  ms-3 form-group local-forms '>
                            <FormControl className='col-sm-10 w-75' >
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    Filter
                                </InputLabel>
                                <NativeSelect
                                    onChange={(e) => setType(e.target.value)}
                                    className='form-control select'
                                    defaultValue={1}
                                    inputProps={{
                                        name: 'fees_type',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={1}>Paid</option>
                                    <option value={2}>Zero</option>
                                    <option value={0}>UnPaid</option>

                                </NativeSelect>
                            </FormControl>

                            {/* <FormControl className='col-sm-10 w-75 ms-3' >
                                <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                    Select year
                                </InputLabel>
                                <NativeSelect
                                    onChange={(e) => getPreviousData(e)}
                                    className='form-control select'
                                    defaultValue={1}
                                    inputProps={{
                                        name: 'fees_type',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={"2022-23"}>2022-23</option>
                                    <option value={"2023-24"}>2023-24</option>

            

                                </NativeSelect>
                            </FormControl> */}
                        </div>


                    </div>
                    <div className="card-body ">

                        <div className=' mt-2 table-responsive '>
                            <table className=" table table-bordered" id='paid'>
                                <thead  className='table-dark'>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Standard</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Contact No</th>
                                        <th scope="col"></th>
                                    </tr>

                                </thead>
                                <tbody id='paid'>
                                    {students
                                        .filter((user) => {
                                            const lowerCaseName = user.name.toLowerCase();
                                            const lowerCaseSearch = sname.toLowerCase();
                                        
                                            if (type === "1") {
                                                return (
                                                    lowerCaseName.includes(lowerCaseSearch) &&
                                                    user.feesPaid === user.stdfeesinfo.total_fees
                                                );
                                            } else if (type === "0") {
                                                return (
                                                    lowerCaseName.includes(lowerCaseSearch) &&
                                                    user.feesPaid !== user.stdfeesinfo.total_fees &&user.feesPaid > 0
                                                );
                                            }else if (type === "2") {
                                                return (
                                                    lowerCaseName.includes(lowerCaseSearch) &&
                                                    user.feesPaid == 0
                                                );
                                            }
                                        
                                            return false; // Optional: Handle the default case if needed
                                        })
                                        .map((user) => {
                                            return (
                                                user.feesPaid === 0 ? (
                                                    <tr className='table-danger'>
                                                        <th scope="row">{user.name}</th>
                                                        <td>{user.stdfeesinfo.std}</td>
                                                        <td>{user.gen}</td>
                                                        <td>{user.contact}</td>
                                                        <td>
                                                            <Button startIcon={<CancelIcon style={{ color: 'red' }} />} />
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr>
                                                        <th scope="row">{user.name}</th>
                                                        <td>{user.stdfeesinfo.std} </td>
                                                        <td>{user.gen}</td>
                                                        <td>{user.contact}</td>
                                                        <td>
                                                            <Link to={`history/${user._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                                <Button className="btn " href="#data" startIcon={<AiFillEye />} />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            );
                                        })}
                                      
                                </tbody>


                            </table>

                        </div>
                    </div>
                </div>








            </Box>
        </Box>
    )
}


