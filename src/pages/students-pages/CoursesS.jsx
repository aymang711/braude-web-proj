import React,{useEffect, useState} from 'react'
import '../../styles/coursesS.css'
import { Table } from 'react-bootstrap'

import { useAuthContext } from '../../custom-hook/useAuthContext';
import {API_URL} from '../../components/apiUrl';

const CoursesS = () => {
  const {user} = useAuthContext();
  const [courseList,setCourseList] = useState([])

  // get 
  function getCourses(){
    fetch(`${API_URL}students/${user.id}/assignments`,{
      method:'GET',
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    }).then(response => response.json()).then(data => setCourseList(data));
    
  
  }
  
  
useEffect(() =>{
  getCourses();

  },[])


  return (
    <div className='courseS__container'>
      <h2 className=''>My Courses</h2>
      <div className='table_course'>
        <h3 className='pb-3'>You are enrolled in the following courses :</h3>
<div className='w-50'>
<Table borderless>
  <thead>
    <tr>
      <th>
        Course Name
      </th>
      <th>
        Course Time
      </th>
      <th>
        Active Assignments
      </th>
    </tr>
  </thead>
  <tbody>
    {courseList.map((item) =>(

   
    <tr>
      <td>
       {item.parentCourse.name}
      </td>
      <td>
      {item.parentCourse.days}
      </td>
      <td>
      {item.name.split('T')[0]}
      </td>
    </tr>
     ))} 
  </tbody>
</Table>
</div>

</div>
    </div>
  )
}

export default CoursesS