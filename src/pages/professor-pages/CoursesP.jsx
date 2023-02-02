import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../../styles/Courses.css";
import { useAuthContext } from '../../custom-hook/useAuthContext'
import {API_URL} from '../../components/apiUrl';



/// material ui
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 200,
      borderRadius: 30,
      background: "",
      color: "gray",
      outline: 0,
    },
  },
};

const names = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuresday",
  "Friday",
];

const CoursesP = () => {
  const {user} = useAuthContext();

  const [selectedCourse, setSelectedCourse] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [name, setName] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  // mui
  const [days, setDays] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentsId, setStudentsId] = useState([]);

  ///selected course
  const[id,setCourseId] = useState('')

  ////checked
  const [checked, setChecked] = React.useState(false);
  const [checkedStudent, setCheckedStudent] = useState([]);

  const handleChangeCheckbox = (event) => {
   if( event.target.checked){
       setCheckedStudent([...checkedStudent, event.target.value])
   } else{
     const temp = [...checkedStudent]
      temp.splice(event.target.value, 1)
      setCheckedStudent(temp);
    }
  };
  useEffect(()=>{

  },[checkedStudent])


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  /////////////////Get courses
  function getCourses() {
    
    fetch(`${API_URL}courses/`,{
      
    method: "GET",
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  }).then((response) => response.json()).then((data) => setCourseList(data));
  }
//////////Get students
  function getStudents() {
    
    fetch(`${API_URL}students/`,{
      
    method: "GET",
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  }).then((response) => response.json()).then((data) => setStudentList(data));
  }

  useEffect(() => {
    getCourses();
    getStudents();
  }, []);

  ///////////// create a course
  const handleAddCourse = (event) => {
   
    const students =checkedStudent;
    event.preventDefault();
    const formData = { name, days, students};
    

    fetch(`${API_URL}courses/add-a-course/`, {
      method: "POST",

      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
      body: JSON.stringify(formData),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((response) => {
        getCourses();
        console.warn(response);
      });
    });
    setName('')
    setDays([])
    setStudents([])
    getCourses();
  };
  ///////////////////////////

  const handleChangeStudents = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleStudentId = (id) => {
    setStudentsId(typeof id === "string" ? id.split(",") : id);
  };

 
////////////// select a course
  const  handleSelectCourse = (course) => {
    setCourseId(course._id)
    setSelectedCourse(course);
    setIsEditing(true);
    setName(course.name);
    setDays(course.days);
    const specificField = course.students.map(student => student.name);

    setStudents(specificField);

   
   
  };


  ///////////////update course//////////////
  const handleEditCourse = (id) => {
   
    const data ={name ,days};
    fetch(`${API_URL}courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    })
      .then(response => response.json())
      .then(data => {
        getCourses();
        
      
        
      })
      .catch(error => {
        console.error(error);
      });
      setIsEditing(false);
      setName('');
      setDays([]);
      setStudents([]);
  }

  ////////delete course/////////////////
  const handleDeleteCourse = (id) => {
   
    const data ={name ,days};
    fetch(`${API_URL}courses/${id}`, {
      method: "DELETE" ,
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    })
      .then(response => response.json())
      .then(data => {
      
        getCourses();
       
      })
      .catch(error => {
        console.error(error);
      });
      setIsEditing(false);
      setName('');
      setDays([]);
      setStudents([]);

  }

  return (
    <div className="courses__container">
      <Form className="courses-list p-4">
        <FormGroup row>
          <h3 className="text-white pt-2 pb-2">Courses List</h3>
        </FormGroup>
        <FormGroup className="search__box">
          <input
            className="w-50 ml-3"
            type="text"
            placeholder="search . . ."
            onChange={(e) => setSearchedItem(e.target.value)}
          />
          <span>
            <i class="ri-search-line"></i>
          </span>
        </FormGroup>
        <PerfectScrollbar className="w-100">
          <div 
          // style={{ width: 450, paddingLeft: 15 }}
           className="form-list">
            {courseList
              .filter((course) =>
                course.name.toLowerCase().includes(searchedItem)
              )
              .map((course) => (
                <Button
                  className="student-button"
                  key={course._id}
                  onClick={() => handleSelectCourse(course)}
                >
                  {course.name}
                </Button>
              ))}
          </div>
        </PerfectScrollbar>
      </Form>

      <Form className="register-form">
        <div>
          {isEditing ? (
            <FormGroup>
              <h3 className="text-white pt-2 pb-2"
              //  onClick={handleEditStudent}
               >
                Edit Course Information
              </h3>
            </FormGroup>
          ) : (
            <FormGroup>
              <h3 className="text-white pt-3 pb-2">
                Add a new Course
              </h3>
            </FormGroup>
          )}
        </div>
        <div className="form-inputs">
          <FormGroup controlId="formName">
            <Form.Control
              style={{
                background: "whitesmoke",
                width: 300,
                height: 55,
                borderRadius: 30,
                textAlign: "center",
                paddingBottom: 12,
              }}
              type="text"
              placeholder="Enter Course Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormGroup>

          <FormControl
            sx={{
              m: 1,
              width: 300,
              borderRadius: 8,
              border: 0,
              outline: 0,
              color: "gray",
            }}
            style={{ background: "whitesmoke", color: "gray" }}
          >
            <InputLabel
              id="demo-multiple-checkbox-label"
              sx={{
                border: 0,
                outline: 0,
                textAlign: "center",
                paddingLeft: 8,
              }}
            >
              select a days
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              sx={{ borderRadius: 8, border: 0, outline: 0 }}
              className="form-select"
              multiple
              value={days}
              onChange={handleChange}
              input={<OutlinedInput sx={{ border: 0 }} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              // onFocus={{ border: 0, outline: 0 }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} sx={{ borderRadius: 20 }}>
                  <Checkbox checked={days.indexOf(name) > -1} />
                  <ListItemText sx={{ background: "" }} primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            sx={{ m: 1, width: 300, borderRadius: 8, border: 0, outline: 0 }}
            style={{ background: "whitesmoke" }}
            className=""
          >
            <InputLabel
              id="demo-multiple-checkbox-label"
              sx={{
                border: 0,
                outline: 0,
                textAlign: "center",
                paddingLeft: 8,
              }}
            >
              select a students
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              sx={{ borderRadius: 8, border: 0, outline: 0 }}
              className="form-select"
              multiple
              value={students}
              onChange={handleChangeStudents}
              input={<OutlinedInput sx={{ border: 0 }} />}
              renderValue={(selected) => selected.join(",")}
              MenuProps={MenuProps}
            >
              {studentList.map((student) => (
                <MenuItem
                  key={student._id}
                  value={student.name}
                  sx={{ borderRadius: 20 }}
                >
                  <Checkbox
                    checked={students.indexOf(student.name) > -1}
                    value={student._id}
                    style={{ color: "gray" }}
                    onChange={handleChangeCheckbox}
                  />
                  <ListItemText
                    sx={{ background: "" }}
                    primary={student.name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {isEditing ? (<div className="d-flex align-items-center justify-content-center">
          <Button className="form-btn mr-1" 
          onClick={() => handleEditCourse(id)}
          >
            Update
          </Button>
             <Button className="form-btn ml-1" 
             onClick={() => handleDeleteCourse(id)}
             >
              Delete
             </Button>
             </div>
        ) : (
          <Button className="form-btn" onClick={handleAddCourse}>
            Add
          </Button>
        )}
      </Form>
      {/* </div> */}
    </div>
  );
};

export default CoursesP;
