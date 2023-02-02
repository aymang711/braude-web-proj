import React, { useEffect, useState } from 'react';
import { Form , Button , FormGroup} from 'react-bootstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';
import '../../styles/Students.css'

import { useAuthContext } from '../../custom-hook/useAuthContext'
import {API_URL} from '../../components/apiUrl';




const ProfessorPage = () => {
  const {user,dispatch} = useAuthContext();
   
  const [promiseState , setPromisState]= useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchedItem,setSearchedItem] = useState([]);
  const [singleStudent,setSingleStudent] = useState([])
  const [id,setId]=useState('');


  ////////Get data/////////////
  function getStudents () {
    
   
  
    fetch(`${API_URL}students/`,{
      
        method: "GET",
        headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    }).then(response => response.json()).then(data => setPromisState(data));
  }



  
  useEffect(() =>{
  getStudents();
  },[])

  useEffect(() =>{

  
   
  },[user])


////////select student
   const handleSelectStudent = (student) => {
  
     setSelectedStudent(student);
     setIsEditing(true);
     setId(student._id)
     setName(student.name);
     setEmail(student.email);
     setPassword(student.password);
     setCourse(student.course);
   };


////add student
const handleAddStudent =  () =>{

const formData = {
name,email,password

}

fetch(`${API_URL}students/add-a-student/`,{

        method: 'POST',
        headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
       
         body:JSON.stringify(formData)}).then((result)=>{
          console.warn("result",result)
          result.json().then((response)=>{
            getStudents();
            console.warn(response)
          }
          )
         })
         setName('')
         setEmail('')
         setPassword('')
        }
        

//////////Update Student
  const handleEditStudent = (id) => {
    
  
      const data = { name, email,password };
      
      
      fetch(`${API_URL}students/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
      })
        .then(response => response.json())
        .then(data => {
          getStudents();
          
          
        })
        .catch(error => {
          console.error(error);
        });
        setSelectedStudent([]);
        setIsEditing(false);
        setId('')
        setName('');
        setEmail('');
        setPassword('');
        setCourse('');
        
    };

    ///////////////////delete student
    const handleDeleteStudent = (id) => {
      
      const data={name,email,password};
      fetch(`${API_URL}students/${id}`, {
        method: "DELETE" ,
        headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
      })
        .then(response => response.json())
        .then(data => {
          
          getStudents();
         
        })
        .catch(error => {
          console.error(error);
        });
   
    }

  return (
  <div className='students__container'>
      <div className="students-list">
         <FormGroup row>
          <h3 className='text-white pt-2 pb-2'>Students List</h3>
          </FormGroup>
          <FormGroup className='search__box'>
              <input type="text" placeholder='search . . .' onChange={(e) => setSearchedItem(e.target.value)} />
              <span><i class="ri-search-line"></i></span>
          </FormGroup>

        <PerfectScrollbar className='w-100'>
        <div className='students__name' >
          {
       promiseState.filter((item)=>
       item.name.toLowerCase().includes(searchedItem)).map((item)=>(
        
        <Button className='student-button' key={item._id}
          onClick={() => handleSelectStudent(item)}

           >{item.name}</Button>
       ))

      }
        </div>
      </PerfectScrollbar>
    </div>

     
        <Form className="register-form">
        {isEditing ? (
          <FormGroup>
            <h3 className='text-white pt-2 pb-2'>
              Edit Student Information
            </h3>
            </FormGroup>
          ) : (
            <FormGroup>
            <h3 className='text-white pt-2 pb-2'>
             
              Add a new student
            </h3>
            </FormGroup>
          )
          }
  
          <div className='form-inputs w-100'>
        <div className='w-50' >
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              className="text-center"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='w-50'>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              className="text-center"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='w-50'>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              className="text-center"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        
          </div> 
          {isEditing ? (<div className="d-flex align-items-center justify-content-center">
            <Button className='form-btn mr-1'
             onClick={() => handleEditStudent(id)} >Update</Button>
            <Button className='form-btn ml-1' 
             onClick={() => handleDeleteStudent(id)}
             >
            Delete
           </Button>
           
             </div>
          ) : (
            <Button className='form-btn' onClick={handleAddStudent}>
              Add
            </Button>
         
           
          )}
        </Form>
        {/* </div> */}
       
      
        </div>
       
      
        
      
   
  );

};

export default ProfessorPage





