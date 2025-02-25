// import * as React from 'react';
import 'bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Admission from './components/admission.jsx';
import Classes from "./components/classes.jsx"
import Student from "./components/student.jsx"
import Teacher from './components/teacher.jsx';
import Std from "./components/std.jsx"
import UpdatStudent from "./components/updateStudent.jsx"
import UpdateTeacher from "./components/teacher_update.jsx"
import SudentAdmission from "./components/student_admission.jsx"
import TeacherAdmission from "./components/teacher_admission.jsx"
import TeacherProfile from "./components/teacherProfile.jsx"
import StudentProfile from "./components/studentprofile.jsx"
import Feeshistory from './components/feeshistory.jsx';
import Feesdetails from './components/feesdetails.jsx';
import Recipt from "./components/recipt.jsx"
import Login from './components/Login.jsx';
import SHome from './StudentComponents/Home.jsx'
import StudyMaterial from './StudentComponents/studyMaterial.jsx';
import TimeTable from './StudentComponents/Timetable.jsx';
import Feesdata from './StudentComponents/Fees.jsx';
import Assesment from './StudentComponents/Assesment.jsx';
import TeacherHome from "./TeacherComponent/TeacherHome.jsx"
import Exams from './TeacherComponent/Exams.jsx';
import Uploadmaterial from './TeacherComponent/uploadmaterial.jsx';
import TeacherTimeTable from "./TeacherComponent/TeacherTimetable.jsx"
import AdminProfile from './components/AdminProfile.jsx';
import AdminEdit   from "./components/AdminEdit.jsx";
import Message from './StudentComponents/Message.jsx';
import Cancle from './components/cancle.jsx';
import Viewmark from './TeacherComponent/viewmark.jsx'
import Attendence from './TeacherComponent/Attendence.jsx';
import StudentAttendence from './StudentComponents/StudentAttendence.jsx'
import ViewAttendence from './TeacherComponent/ViewAttendence.jsx'
import AttendanceHistory from './TeacherComponent/AttendanceHistory.jsx'
export default function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />}  ></Route>
          <Route path="admin" exact element={<Home />}  ></Route>
          <Route path="/admin/profile/:id?" exact element={<AdminProfile />}  ></Route>
          <Route path="/admin/profile/edit/:id?" exact element={<AdminEdit />}  ></Route>
          <Route path="admin/student" element={<Student />}></Route>
          <Route path="/admin/student/view/:id?" element={<StudentProfile />}></Route>
          <Route path="admin/teacher" element={<Teacher />}>  </Route>
          <Route path="admin/classes" element={<Classes />}>  </Route>
          <Route path="admin/admission" element={<Admission />}>  </Route>
          <Route path="admin/classes/std/:std?" element={<Std />}> </Route>
          <Route path="admin/classes/std/edit/:id?" element={<UpdatStudent />}>  </Route>
          <Route path="admin/teacher/view/edit/:id?" element={<UpdateTeacher />}>  </Route>
          <Route path="admin/student/admission" element={<SudentAdmission />}>  </Route>
          <Route path="admin/teacher/admission" element={<TeacherAdmission />}>  </Route>
          <Route path="admin/teacher/view/:id?" element={<TeacherProfile />}>  </Route>
          <Route path="admin/feesdetails" element={<Feeshistory />}>  </Route>
          <Route path="admin/feesdetails/history/:id?" element={<Feesdetails />}></Route>
          <Route path="/admin/recipt" element={<Recipt />}> </Route>
          <Route path="/admin/cancle" element={<Cancle />}> </Route>

          <Route path="/login" element={<Recipt />}> </Route>
          


          {/* student route start */}
          <Route path="student/:id?" element={<SHome />}> </Route>
          <Route path="/student/StudyMaterial" element={<StudyMaterial />}> </Route>
          <Route path="/student/Timetable" element={<TimeTable />}> </Route>
          <Route path="/student/feesdetails/:id?" element={<Feesdata />}> </Route>
          <Route path="/student/Assessment/:id?" element={<Assesment />}> </Route>
          <Route path="/student/messages" element={< Message/>}> </Route>
          <Route path="/student/attendence" element={< StudentAttendence/>}> </Route>

          {/* Teacher dashboard route start */}
          <Route path="/teacher/:id?" element={<TeacherHome />}> </Route>
          <Route path="/teacher/exams" element={<Exams />}> </Route>
          <Route path="/teacher/viewmark" element={<Viewmark />}> </Route>

          <Route path="/teacher/uploadmaterial" element={<Uploadmaterial />}> </Route>
          <Route path="/teacher/Timetable" element={<TeacherTimeTable />}> </Route>
          <Route path="/teacher/attendence" element={<Attendence/>}> </Route>
          <Route path="/teacher/attendence/view" element={<ViewAttendence/>}> </Route>
          <Route exact path="/teacher/attendence/view/student/:id?" element={<AttendanceHistory/>}> </Route>





        </Routes>
      </BrowserRouter>

    </>
  );
}

