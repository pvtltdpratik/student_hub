import "../components/css/StudentMessages.css";
import { React, useEffect, useState } from "react";
import MessageIcon from "@mui/icons-material/Message";
import { Button, IconButton } from "@mui/material";
import { Storm } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidenav from "../StudentComponents/studentSidebar.tsx";
import { getMessageData } from "../service/api";
import moment from "moment-timezone";
function Message() {
  const [messageData, setMessageData] = useState([]);
  const navigate = useNavigate();
  const temp = localStorage.getItem("token");

  const user_id = {
    id: localStorage.getItem("user_id"),
  };
  const getStudentData = async () => {
    const response = await getMessageData(user_id);
    console.log(response?.data.data);
    setMessageData(response?.data.data);
  };

  useEffect(() => {
    if (temp === null) {
      navigate("/");
    }
  }, [temp]);

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box
        component="main"
        className="table-responsive"
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* <div className='container ' style={{backgroundColor:'white'}}>
                    <div className='row bg-dark' style={{ borderTop: '5px solid yellow' }}>
                        <div className='col'>
                            <p className='text-white h5 mt-3 ms-0'>You</p>
                        </div>
                    </div>
                    <div style={{ height: '80vh', borderBottom: '5px solid yellow' }}>

                            {
                                messageData.map((data)=>{
                                    return(
                                        <>

                        <div className='row'>
                            <div className='col-2 col-sm-1 mt-3 ms-2'>
                                <p>Exousia Academy</p>
                            </div>
                            <div className='col-9 mt-3'>
                                <div className='d-flex justify-content-end'>

                                    <p>{ moment(data.stdfeesinfo.createdAt).format('MMMM Do, YYYY')}</p>

                                </div>
                            </div>
                        </div>
                        <div className='row'>

                                        
                                       
                            <div className='col-10 ms-2'>

                                <MessageIcon style={{ display: 'inline-flex', fontSize: '2rem' }} color='primary' className='me-3' />

                                <div id='msgbox' className='p-3 text-white text-uppercase ' style={{ backgroundColor: '#999999', height: '15vh', width: '20vw', borderRadius: '10px', display: 'inline-flex' }}>
                                    {data.stdfeesinfo.message}
                                </div>
                            </div>

                        </div>
                            </>
                                    )
                                })
                            }
                    </div>
                </div> */}
        <div
          className="bg-white shadow container-fluid mt-5 pt-3 pb-3"
          style={{
            borderTop: "5px solid blue",
            borderBottom: "5px solid blue",
            height: "80vh",
          }}
        >
          <p className="h4 mb-3">From: Adhyayan Coaching Classes</p>
          <ul className="list-group">
            {messageData.map((data, index) => {
              return (
                <>
                  {data.stdfeesinfo.message.map((data, index) => {
                    return (
                      <>
                        <li className="list-group-item">
                          <div className="card col-xl-6">
                            <div className="card-body">
                              <h5 className="card-title">12/4/2024</h5>
                              <p className="card-text text-left">{data}</p>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </>
              );
            })}
          </ul>
        </div>
      </Box>
    </Box>
  );
}

export default Message;
