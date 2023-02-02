import React from 'react'
import '../../styles/AssignmentP.css'
import {useState, useEffect} from 'react';
import {Button} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAuthContext } from '../../custom-hook/useAuthContext'
import {API_URL} from '../../components/apiUrl';


/// material ui
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';






const AssignmentP = () => {

  const {user} = useAuthContext();

  const[assignmentList,setAssignmentList] = useState([])
  const[isEditing,setIsEditing]= useState(false)
  const[name,setName] = useState('')
  const[coursesList,setCoursesList]= useState([])
  //
  const [file, setFile] = useState(null);
  const [assignmentfile,setFileId] = useState('');
  const [fileUrl, setFileUrl] = useState("");
  //
  const[deadLine,setDate]= useState(Date())
  const[assignmentStatus,setStatus]=useState('OnHold')
  const[searchedItem,setSearchedItem] = useState([])
  const[courses,setCourses]=useState('')
  const[parentCourse,setSelectCourse]=useState('')
  const[id,setAssignId]=useState('')
  const[selectedAssign,setSelectedAssign] =useState([])
  const [courseId,setcourseId] = useState('')
 

  const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 200, borderRadius: 30,background :''
    },
  },
};

////

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setCourses(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

///////////////////Get Assignments
function getAssignment() {
  fetch(`${API_URL}assignment/`,{
    method:'GET',
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  }).then(response => response.json()).then(data => setAssignmentList(data));

}
/////////////////Get courses
function getCourses() {
    fetch(`${API_URL}courses/`,{
      method:'GET',
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    })
      .then((response) => response.json())
      .then((data) => setCoursesList(data));
  }
  useEffect(() =>{
    getAssignment();
   getCourses();
   
    },[])
  
//////////// add assignment
const handleAddAssignment = (event) => {

  
  event.preventDefault();
  const formData = {name, deadLine, parentCourse, assignmentStatus, assignmentfile};
 
  

  fetch(`${API_URL}assignment/add-a-assignment/`, {
    method: "POST",
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    body: JSON.stringify(formData),
  }).then((result) => {
    console.warn("result", result);
    result.json().then((response) => {
      getAssignment();
      console.warn(response);
    });
  });

  setName('')
  setDate([])
  setCourses([])
  setStatus('OnHold')
};



////select assignment
const handleSelectAssign = (assign) =>{
  setAssignId(assign._id);
   
    fetch(`${API_URL}assignment/${assign._id}`,{
      method:'GET',
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      setSelectedAssign(data)
      setIsEditing(true);
      setName(data.name);
      setSelectCourse(data.parentCourse)
      setCourses(data.parentCourse.name);
      setDate(data.deadLine.split('T')[0]);
      setStatus(assign.assignmentStatus);
      setFileId(data.assignmentfile);
      setcourseId(data.parentCourse._id);
    });
      
     
     
   }
  

/////////////////// update Assignment
const handleEditAssignment =(id)=>{

 
  const data= {name, deadLine, parentCourse, assignmentStatus, assignmentfile};
  fetch(`${API_URL}assignment/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    body: JSON.stringify(data),
  
  })
    .then(response => response.json())
    .then(data => {
      getAssignment();
    
      
    })
    .catch(error => {
      console.error(error);
    });
    setIsEditing(false)
    setName('')
    setSelectCourse([])
    setDate([])
    setStatus('')
    setCourses([])


}

///////////////////delete Assignment
const handleDeleteAssignment =(id)=>{
  fetch(`${API_URL}assignment/${id}`, {
    method: "DELETE" ,
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  })
    .then(response => response.json())
    .then(data => {
     
      getAssignment();
     
    })
    .catch(error => {
      console.error(error);
    });
    setIsEditing(false)
    setName('')
    setSelectCourse([])
    setDate([])
    setStatus('')
    setCourses([])

}
///////////////file
const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}file/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  setFileId(data)
  setFileUrl(data.fileUrl);
}




  

  return (
    <div className='assignmentP__container'>
      <div className='assignment-list'>
        <h3 className='text-white pt-2 pb-2'>Assignments List</h3>
      <div className="search__box">
          <input type="text" placeholder='Search . . .'
          onChange={(e) => setSearchedItem(e.target.value)}
           />
          <span><i class="ri-search-line"></i></span>
         </div> 
      <PerfectScrollbar className='w-100'>
      <div className='assignment-name'>
      
      {
        assignmentList.filter((assign)=>(
          assign.name.toLowerCase().includes(searchedItem)
        ))
        .map((assign)=>(
          <Button
          className='assign-button'
          key ={assign._id}
          onClick={()=> handleSelectAssign(assign)}
          // onClick{()=> handleSelectAssign()}
          >{assign.name}</Button>
        ))
      }
      </div>
      </PerfectScrollbar>
      </div>

      
      <div className="assignment-info">
       {isEditing ?(
         <h3 className='text-white pt-2 pb-2'>Edit an Assignments</h3>
       ):(
        <h3 className='text-white pt-2 pb-2'>ِAdd an Assignments</h3>
       )

       }
      <div className="assignment-name">
      <input type='text' placeholder='Enter Assignment Name'
      value={name}
      onChange={(e)=>setName(e.target.value)}/>
     
      </div>
   
       <div className="courses-name">
       <FormControl sx={{ m: 1, width: 300 , borderRadius: 8 ,border:0 ,outline: 0 }} style={{background:'white'}} className=''>
        <InputLabel id="demo-multiple-checkbox-label" sx={{border:0 , outline :0 ,textAlign:'center',paddingLeft:8}}>select a course</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          sx={{borderRadius:8 ,border:0 ,outline:0}}
          className='form-select'
          // multiple
          value={courses}
          
          onChange={(e)=> setCourses(e.target.value)}
          input={<OutlinedInput sx={{border:0}} />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          
        >
          {coursesList.map((course) => (
            <MenuItem key={course._id} value={course.name} sx={{borderRadius:20,color:'gray' ,textAlign:'center'}}  >
              <Checkbox checked={courses.indexOf(course._id) > -1}
             
               value={course._id}
               style={{color:'gray'}}
               onChange={(e)=>setSelectCourse(e.target.value)}
               />
              <ListItemText sx={{background:''}} primary={course.name} value={course.name} />
            </MenuItem>
          ))}
        </Select>
       
      </FormControl>
       </div>
   
       <div className='fileUpload' style={{width:300,background:'white',borderRadius:30,height:50}}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" onClick={handleSubmit}>Upload</button>
         {fileUrl && <img src={fileUrl} alt={file.name} />}
        </div>
       

       <div className="assignment-date b-0" style={{width:300,background:'white',borderRadius:30,height:55}}>
        <label type='text'className='text-secondary pr-5'>DeadLine : </label>
       <Stack component="form" sx={{border:0,outline:0}} style={{borderRadius:30,border:0,background:'red',outline:0,height:40,width:150}}>
      <TextField
        id="date"
        type="date"
        value={deadLine}
        onChange={(e)=>setDate(e.target.value)}
        defaultValue="yyyy-mm-dd"
        required
        sx={{ width: 150, borderRadius:30 ,height:55,"& .MuiOutlinedInput-root": {
          "& > fieldset": {
            border: "none"
          }
           }
           }}
        InputLabelProps={{
          shrink: true,
          border:0,
          
        }}
      
      />
    </Stack>
    </div>

       <div className="assignment-status" style={{width:300,background:'white',borderRadius:30}}>
        <label type='text' className='text-secondary pr-5'>Status  :</label>
       <Form.Select
      aria-label="select example" 
      value={assignmentStatus}
      style={{width:140,height:40,borderRadius:20,paddingLeft:10,outlineColor:'#167d7f',color:'gray'}}
       onChange={(e)=>{setStatus(e.target.value)}}>
      <option value='OnHold'>OnHold</option>
      <option value='Active'>Active</option>
      <option value='Canceled'>Canceled</option>
      <option value='Finished'>Finished</option>
      </Form.Select>
       </div>

       <div>
        {isEditing ? (<div className='d-flex align-items-center justify-content-around'>
        <button className='form-btn mr-1' onClick={()=>handleEditAssignment(id)} >Update</button>
        <button className='form-btn ml-1' onClick={()=>handleDeleteAssignment(id)} >Delete</button>
        </div>
       ):( 
       <button className='form-btn' onClick={handleAddAssignment}>Add</button>)
        }
       
       </div>

        
     
       </div> 
    </div>
  )
}

export default AssignmentP