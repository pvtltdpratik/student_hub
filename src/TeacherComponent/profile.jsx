import { React, useState, useEffect } from 'react'
import '../components/css/student_prof.css'
import { Link } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, AppBar, Toolbar, Typography, Button, Icon } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/header";
import moment from 'moment'

import { getTeacherProfile,getStandards } from "../service/api"

export default function Teacher() {
  const navigate = useNavigate();
  const temp = localStorage.getItem('token');
  const [assign_class, setassignclass] = useState([]);
  const [teacher, setTeacher] = useState([]);

  const { id } = useParams();

  useEffect(() => {

    getSingleTeacher();

  }, [])

  const getSingleTeacher = async () => {
    const response = await getTeacherProfile(id);
    setTeacher(response?.data.data);
    const stdids=response?.data.data[0].Asignclass;
    localStorage.setItem('std_ids',stdids);
    const response2= await getStandards(stdids);
    setassignclass(response2?.data)

  }
  useEffect(() => {
    console.log(temp);
    if (temp === null) {
      navigate('/');
    }
  }, [temp])

//   if (!teacher || teacher.length === 0) {
//     return <div>Loading...</div>; // You can show a loading message or spinner
//   }
  return (
    <Box sx={{ display: 'flex' }} >
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Box>
          <Header title="Home" />
        </Box>
        <div className="container-xl px-3 mt-4">

          {
            teacher.map((teacherdata) => {

              return (

                <div className="row">
                  <div className="col-xl-4">
                    {/* <!-- Profile picture card--> */}
                    <div className="card mb-4 mb-xl-0">
                      <div className="card-header">Profile</div>
                      <div className="card-body text-center">
                        {/* <!-- Profile picture image--> */}
                        <AccountCircleSharpIcon className="img-account-profile rounded-circle mb-2" />
                        {/* <!-- Profile picture help block--> */}
                        <div className="large font-italic mb-2"><b>{teacherdata.name}</b></div>



                        <div className="large font-italic mb-4"  >Assigned To:
                          {assign_class &&
                            assign_class.map((data) => (
                              <span key={data._id}>{data.std} , </span>
                            ))}
                        </div>
                     

                        <div className="large font-italic mb-4">Subjects: 
                        {teacherdata.subjects &&  
                            teacherdata.subjects.map((sub,index) => (
                              <span key={index}> {sub} , </span>
                              ))}
                        </div>
                        <div className="large font-italic mb-4">Admitted On : {moment(teacherdata.createdAt).format('MMMM Do, YYYY')}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8">
                    {/* <!-- Account details card--> */}
                    <div className="card mb-4">
                      <div className="card-header">Account Details</div>
                      <div className="card-body">
                        <form>
                          {/* <!-- Form Group (name)--> */}
                          <div className="mb-3">
                            <label className="small mb-1" for="inputUsername">Name</label>
                            <input className="form-control" id="inputUsername" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.name} type="text" readOnly />
                          </div>
                          {/* <!-- Form Row--> */}
                          <div className="row gx-3 mb-3">
                            {/* <!-- Form Group (DOB)--> */}
                            <div className="col-md-6">
                              <label className="small mb-1" for="DOB">Date of Birth</label>
                              <input className="form-control" id="DOB" type="text" readOnly style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.dob} readonly />
                            </div>
                            {/* <!-- Form Group (gender)--> */}
                            <div className="col-md-6">
                              <label className="small mb-1" for="gender">Gender</label>
                              <input className="form-control" id="gender" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.gen} type="text" readOnly />
                            </div>
                          </div>
                          {/* <!-- Form Row        --> */}
                          <div className="row gx-3 mb-3">
                            {/* <!-- Form Group (contactno)--> */}
                            <div className="col-md-6">
                              <label className="small mb-1" for="contactno">Contact No</label>
                              <input className="form-control" id="contactno" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.ContactNo} type="text" readOnly />
                            </div>
                            {/* <!-- Form Group (alternateno)--> */}
                            <div className="col-md-6">
                              <label className="small mb-1" for="alternateno">Alternate No</label>
                              <input className="form-control" id="alternateno" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Alternateno} type="text" readOnly />
                            </div>
                          </div>
                          {/* <!-- Form Group (address)--> */}
                          <div className="mb-3">
                            <label className="small mb-1" for="Address">Address</label>
                            <input className="form-control" id="Address" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Address} type="text" readOnly />
                          </div>
                          {/* <!-- Form Group (email)--> */}
                          <div className="mb-3">
                            <label className="small mb-1" for="Email">Email</label>
                            <input className="form-control" id="Email" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Email} type="text" readOnly />
                          </div>
                          {/* <!-- Form Row--> */}
                          <div className="row gx-3 mb-3">
                            {/* <!-- Form Group (Experties)--> */}
                            <div className="col-md-6">
                              <label className="small mb-1" for="Experties">Experties</label>
                              <input className="form-control" id="Experties" readOnly style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Experties} type="text" readonly />
                            </div>
                            {/* <!-- Form Group (Experience)--> */}
                            <div className="col-md-6">
                              <label className="small mb-1" for="Experience">Experience</label>
                              <input className="form-control" id="Experience" readOnly style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Experience} type="text" readonly />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Box>
    </Box>
  )
}