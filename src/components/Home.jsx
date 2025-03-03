import React, { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "./css/homepage.css";
import "@fontsource/roboto/700.css";
import Sidenav from "./sidebar.tsx";
import Avatar from "@mui/material/Avatar";
import itsme from "./assets/itsMe.jpg";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { FaUsers } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { TextField, FormControlLabel, Input, Switch } from "@mui/material";
import {
  getTotalCount,
  setMessageData,
  teacherCount,
  totalFeesPaid,
  SendMessageData,
} from "../service/api";
import { useForm } from "react-hook-form";
import { setFees } from "../service/api";
import SendIcon from "@mui/icons-material/Send";
import { GetFees } from "../service/api";
import { addpayFees,changeYear } from "../service/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "./Loading.jsx";
import "../components/css/loading.css";
import Header from "./header";
const pages = [];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
let count;
let five;
let six;
let seven;
let eight;
let nine;
let ten;
let stdinfo;
var total_fees = "";
let remaining;
let totalStudent;
let teacherCounting;
let feesPaidTotal;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Homepage() {
  const navigate = useNavigate();
  const [students, setStudent] = useState([]);
  const [sname2, setSname2] = useState("");
  const temp = localStorage.getItem("token");
  const [total, setTotal] = useState("");

  let Student = [];
  const totalcount = async () => {
    count = await getTotalCount();
    console.log( count?.data.data)
    totalStudent = count?.data.data[0].total;
    five = count?.data.data[0].fifth;
    six = count?.data.data[0].six;
    seven = count?.data.data[0].seven;
    eight = count?.data.data[0].eight;
    nine = count?.data.data[0].nine;
    ten = count?.data.data[0].ten;
    Student = count?.data.data[0].student;
    setStudent(Student);
  };

  // number counter js

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register3,
    formState: { errors: error3 },
    handleSubmit: handlesubmit3,
  } = useForm();
  const {
    register: register2,
    formState: { errors: errors2 },
    setValue,
    handleSubmit: handleSubmit2,
  } = useForm();

  const [Std2, setStd2] = useState("");
  const [StdMsg, setStdMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [checkbox, setCheckbox] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Search bar
  const [nest, setnext] = useState([]);

  const onSubmit = async (data) => {
    if (data.total_fees < 0) {
      Swal.fire({
        title: "Error",
        text: "Invalid Fees",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      try {
        const response = await setFees(data);
        if (response.status == 200) {
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
        } else if (response.status == 500) {
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "something went wrong !",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleChangestd = (event) => {
    setStd2(event.target.value);
  };

  const handleChangestd2 = (event) => {
    setStdMsg(event.target.value);
    setMessage({ ...message, std_id: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const [payFees, setPayFees] = useState([]);
  const [feesdata, setFeesdata] = useState([]);
  const [feesstd, setfeesStd] = useState([]);
  const [message, setMessage] = useState({});
  const [year, setYear] = useState({});


  const onSearch = async (value, id) => {
    setSname2(value);
    // let response = await getData(id);
    // const isfound = Student.includes(id)
    let indexno;
    for (let index = 0; index < students.length; index++) {
      if (students[index]._id === id) {
        setFeesdata([]);
        indexno = index;
        setFeesdata(students[index]);
      }
    }
    stdinfo = students[indexno].stdfeesinfo.std;
    total_fees = students[indexno].stdfeesinfo.total_fees;
    remaining = total_fees - students[indexno].feesPaid;
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      setCheckbox(...checkbox, [event.target.value]);
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
  };

  const sendData = async () => {
    try {
      const response = await setMessageData(message);
      if (response?.status == 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
              window.location.reload();
          }
      });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "something went wrong !",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onsubmit2 = async (data) => {
    console.log(data.Amount);

    if (data.Amount > remaining || data.Amount < 0) {
      Swal.fire({
        title: "Failed",
        text: "Enter the valid Amount",
        icon: "failed",
        confirmButtonText: "OK",
      });
    } else {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "Do You won't to Pay fees !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Pay it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let response = await addpayFees(data);
            if (response?.status == 200) {
              Swal.fire({
                title: "Success",
                text: "Fees paid Successful",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/admin/recipt");
                } else if (result.isDenied) {
                  Swal.fire("Fees not paid");
                }
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          }
        });

      } catch (error) {
        Swal.fire({
          title: "Error !",
          text: error,
          icon: "error",
        });
      }
    }
  };

  function checkAmount(event) {
    console.log(event.target.value);

    if (event.target.value > remaining || event.target.value < 0) {
      Swal.fire({
        title: "Failed",
        text: "Enter the valid Amount",
        icon: "Failed",
        confirmButtonText: "OK",
      });
    }
  }
  const fees = async () => {
    try {
      const response = await GetFees();
      if (response.status === 200) {
        let list = response?.data;
        if (list && list.length) {
          list = list.map((item) => {
            return {
              key: item._id,
              text: item.std,
              value: item._id,
            };
          });
        }
        setfeesStd(list);
      } else setfeesStd([]);
    } catch (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  };

  const coutingteacherDocument = async () => {
    try {
      const response = await teacherCount();
      teacherCounting = response?.data.data;
    } catch (error) { }
  };

  const totalFeesAddiion = async () => {
    const response = await totalFeesPaid();
    feesPaidTotal = response.data.data;
    // const smsResponse= await SendMessageData();
    // console.log(smsResponse?.data.data)
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (temp === null) {
      navigate("/");
    }
  }, [temp]);

  useEffect(() => {
    setTimeout(() => {
      // Replace this with your actual API call
      totalcount();
      fees();
      coutingteacherDocument();
      totalFeesAddiion();
      setIsLoading(false);
    }, 2000);
  }, []);

  const t2 = 28;

  const changeYearButton= async()=>{
    console.log(year);
    const res= await changeYear(year);
    console.log(res); 
  }

  const changeYear2=async()=>{
    
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Header title="Home" />

            <div className="d-flex row p-3">
              <div className="col-md-10 ">
                <div className="row ">
                  <div className="col-xl-4 col-lg-6">
                    <div
                      className="card l-bg-blue-dark"
                      style={{ backgroundColor: "#0079ff" }}
                    >
                      <div className="card-statistic-3 p-4">
                        <div
                          className="card-icon card-icon-large me-5"
                          style={{ color: "black" }}
                        >
                          <FaUsers size={100} />
                        </div>
                        <div className="mb-4">
                          <h5 className="card-title mb-0">Student</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                          <div className="col-8">
                            <h2 className="d-flex align-items-center mb-0">
                              {totalStudent-25}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6">
                    <div
                      className="card l-bg-blue-dark"
                      style={{ backgroundColor: "#00DFA2" }}
                    >
                      <div className="card-statistic-3 p-4">
                        <div
                          className="card-icon card-icon-large me-5"
                          style={{ color: "black" }}
                        >
                          <FaUsers size={100} />
                        </div>
                        <div className="mb-4">
                          <h5 className="card-title mb-0">Teachers</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                          <div className="col-8">
                            <h2 className="d-flex align-items-center mb-0">
                              {teacherCounting}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6">
                    <div
                      className="card l-bg-green-dark"
                      style={{ backgroundColor: "#FF0060" }}
                    >
                      <div className="card-statistic-3 p-4">
                        <div className="card-icon card-icon-large me-5">
                          <FaRupeeSign size={100} />
                        </div>
                        <div className="mb-4">
                          <h5 className="card-title mb-0">Revenue</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                          <div className="col-8">
                            <h2 className="d-flex align-items-center mb-0">
                              <span className="num" data-val="300">
                                {feesPaidTotal}
                              </span>
                              {/* <span>/</span>
                                <span className="num" data-val='300'>000</span> */}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 mt-5">
                <form onSubmit={handlesubmit3(onSubmit)}>
                  <div
                    className="card mb-4 text-light"
                    style={{ backgroundColor: "#002147" }}
                  >
                    <div className="card-body">
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Choose standard
                        </label>
                        <FormControl
                          fullWidth
                          className="mt-3 bg-light"
                          style={{ borderRadius: "10px" }}
                        >
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={Std2}
                            label="Std"
                            {...register3("std_id", { required: true })}
                            onChange={handleChangestd}
                          >
                            {feesstd.map((user) => (
                              <MenuItem value={user.value}>
                                {user.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <p className="text-danger">
                          {error3.std_id?.type === "required" &&
                            "Standard is required"}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">
                          Set fees
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="form-control bg-light"
                          id="exampleInputPassword1"
                          style={{ borderRadius: "10px" }}
                          {...register3("total_fees", { required: true })}
                        />
                        <p className="text-danger">
                          {error3.total_fees?.type === "required" &&
                            "fees is required"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn text-light w-75"
                          style={{ backgroundColor: "#0079FF" }}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="card mb-4 mb-lg-0">
                  <div className="card-body p-0">



                    {/* <div className="card-body">

                      <TextField
                        label="Academic year"
                        fullWidth
                        focused
                        placeholder="Enter the academic year"
                        required
                        inputMode="number"
                        onChange={(e)=>setYear({ ...year, year: e.target.value })}

                      />
                      <div className="d-flex justify-content-center mt-3">
                        <input
                        onClick={()=>changeYearButton()}
                          type="submit"
                          value="Change academic year"
                          className="btn text-light w-75"
                          style={{ backgroundColor: "#0079FF" }}
                        />
                      </div>
                    </div> */}

                  </div>
                </div>
              </div>
              <div className="col mt-5 p-3 shadow bg-white">
                <strong>
                  <span style={{ fontSize: "2rem" }}>Student Data</span>
                </strong>
                {/* <div className="progress mt-1 mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${first}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>1st | {first} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${second}%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>2nd | {second} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${third}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>3rth | {third} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${four}%` }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>4th | {four} </b>
                  </div>
                </div> */}
                <div className="progress mt-3 mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${five}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>5th | {five} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${six}%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>6th | {six} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${seven}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>7th | {seven} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${eight}%` }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>8th | {eight} </b>
                  </div>
                </div>
                <div className="progress mt-3 mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${nine}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>9th | {nine} </b>
                  </div>
                </div>
                <div className="progress mb-4" style={{ height: "1.5rem" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${ten}%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <b>10th | {ten} </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              {/* <div className='col-lg-6'>
                  <div className='container-fluid shadow p-3 bg-white mb-4' style={{borderTop:'5px solid #002147',borderBottom:'5px solid #002147'}}>
                    <p className='h3'>Announcement</p>
                    <div className='row'>
                      <div>
                        
                    <label className="check">
                      <input type="checkbox" id="myCheck" name='10th' value={10} onChange={handleChange} />
                      <span>10th</span>
                    </label>
                        <FormControl fullWidth className='mt-3 bg-white'>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open2}
                            onClose={handleClose2}
                            onOpen={handleOpen2}
                            value={StdMsg}
                            label="Std"
                            {...register("std_id", { required: true })}
                            onChange={handleChangestd2}
                          >

                            {feesstd.map((user) => (

                              <MenuItem value={user.value}>{user.text}</MenuItem>

                            ))}

                          </Select>

                        </FormControl>
                        <p className='text-danger'>
                          {errors.std_id?.type === "required" && "Standard is required"}
                        </p>
                      </div>
                    </div>
                    <div className='row px-3'>
                      <TextField id="outlined-basic" placeholder='Message' focused multiline minRows={8} variant="outlined"
                        onChange={(e) => { setMessage({ ...message, msg: e.target.value }) }}
                      />
                      <Button variant="contained" onClick={() => sendData()} endIcon={<SendIcon />} className='w-25 m-3' style={{ backgroundColor: '#0079FF' }}>
                        Send
                      </Button>
                    </div>
                  </div>
                </div> */}

              <div
                className="col-lg-6 p-2 shadow mb-3"
                style={{ backgroundColor: "white" }}
              >
                <p className="h3 mt-1">Announcement</p>
                <header className="bg-light px-3 py-2 pu d-flex ">
                  <span className="mt-2">To: </span>
                  <FormControl className="d-block mt-1 mb-1 ms-2" size="small">
                    <Select
                      value={StdMsg}
                      {...register("std_id", { required: true })}
                      onChange={handleChangestd2}
                    >
                      {feesstd.map((user) => (
                        <MenuItem value={user.value}>{user.text}</MenuItem>
                      ))}
                    </Select>
                    <p className="text-danger">
                      {errors.std_id?.type === "required" &&
                        "Standard is required"}
                    </p>
                  </FormControl>
                
                </header>
                <div className="mt-2">
                  <TextField
                    fullWidth
                    focused
                    multiline
                    minRows={11}
                    placeholder="Enter messege here.."
                    onChange={(e) => {
                      setMessage({ ...message, msg: e.target.value });
                    }}
                  ></TextField>
                </div>
                <footer className="mt-2 bg-light py-2 d-flex justify-content-end">
                  <Button
                    className="me-3 bg-primary text-white"
                    onClick={() => sendData()}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </footer>
              </div>

              <div className="col-lg-6 mb-3">
                <div className=" shadow bg-white">
                  <div className="row p-3">
                    <div className="col-lg-4 ">
                      <p className="h3 me-3">Payment</p>
                    </div>
                    <div className="col w-50 ">
                      <Search
                        fullWidth
                        className=" text-light bg-primary text-white"
                      >
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          value={sname2}
                          onChange={(e) => setSname2(e.target.value)}
                          placeholder="Search…"
                          inputProps={{ "aria-label": "search" }}
                        />
                      </Search>
                    </div>
                  </div>

                  <div>
                    {students
                      .filter((item) => {
                        const searchTerm = sname2.toLowerCase();
                        const name = item.name.toLowerCase();

                        return (
                          searchTerm &&
                          name.startsWith(searchTerm) &&
                          name !== searchTerm
                        );
                      })
                      .map((item) => (
                        <>
                          <button
                            type="button"
                            onClick={() => onSearch(item.name, item._id)}
                            className="  list-group-item list-group-item-action w-50 p-3 "
                          >
                            <b>Name: </b>
                            {item.name} <b className="ms-5">Std: </b>{" "}
                            {item.stdfeesinfo.std}
                          </button>
                        </>
                      ))}
                  </div>
                  <form onSubmit={handleSubmit2(onsubmit2)}>
                    <div className="row px-3 ">
                      <div className="col-lg-5 col-md-10 col-sm-10 mb-4 ">
                        <TextField
                          label="ID"
                          fullWidth
                          name="feesId"
                          value={feesdata._id}
                          focused
                          {...register2("feesId", { required: true })}
                        />
                      </div>
                      <div className="col-lg-6 col-md-10 col-sm-10  mb-4">
                        <TextField
                          label="Fees Paid "
                          fullWidth
                          name="feesPaid"
                          value={feesdata.feesPaid}
                          focused
                          {...register2("feesPaid", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="row px-3  ">
                      <div className="col-lg-11 col-md-10 col-sm-10 mb-4">
                        <TextField
                          label="Name"
                          name="name"
                          value={feesdata.name}
                          focused
                          fullWidth
                          {...register2("name", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="row px-3 ">
                      <div className="col-lg-5 col-md-10 col-sm-10 mb-4">
                        <TextField
                          label="STD"
                          fullWidth
                          name="std"
                          value={stdinfo}
                          focused
                          {...register2("std", { required: true })}
                        >
                          {" "}
                          {stdinfo}
                        </TextField>
                      </div>
                      <div className="col-lg-6  col-md-10 col-sm-10 mb-4">
                        <TextField
                          label="CONTACT NO"
                          fullWidth
                          value={feesdata.contact}
                          focused
                          placeholder="Enter no"
                          required
                          {...register2("contact", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="row px-3 ">
                      <div className="col-lg-5 col-md-10 col-sm-10">
                        <TextField
                          label={"Total fees: "+total_fees}
                          placeholder="Remaining fees"
                          value={remaining}
                          type="numeric"
                          focused
                          className="mb-3"
                        />
                      </div>
                      <div className="col-lg-5 col-md-10 col-sm-10 mb-4">
                        <TextField
                          label="Amount"
                          placeholder="Enter Amount"
                          type="numeric"
                          focused
                          required
                          className="mb-3"
                          {...register2("Amount", { required: true })}
                          onChange={(event) => {
                            if (event.target.value > remaining || event.target.value < 0) {
                              Swal.fire({
                                title: "Failed",
                                text: "Enter the valid Amount",
                                icon: "Failed",
                                confirmButtonText: "OK",
                              }).then((res) => {

                                if (res.isConfirmed) {
                                  event.target.value = ''
                                }
                                else {

                                }
                              });
                            }
                          }}
                        />
                        <FaRupeeSign
                          size={35}
                          className="  mt-2"
                          style={{ opacity: "30%" }}
                        />
                      </div>
                    </div>
                    <div className="row px-4">
                      <Button
                        type="submit"
                        className="w-25 d-block btn btn-primary  mb-5 "
                        style={{ backgroundColor: "#0079FF", color: "white" }}
                      // data-bs-toggle="modal" href="#data"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </Box>
    </Box>
  );
}
