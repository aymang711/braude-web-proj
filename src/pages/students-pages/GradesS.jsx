import React,{useState,useEffect} from 'react'
import '../../styles/gradesS.css'
import { Table } from 'react-bootstrap'
import { useAuthContext } from '../../custom-hook/useAuthContext'
import {API_URL} from '../../components/apiUrl';

const GradesS = () => {
  const {user} = useAuthContext();
  const [gradeList,setGrade] = useState([])

  // get 
  function getGrades(){
    fetch(`${API_URL}students/${user.id}/grades`,{
      method:'GET',
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    }).then(response => response.json()).then(data => setGrade(data));
    
 
  }
  
  
useEffect(() =>{
  getGrades();

  },[])






  return (
    <div className='gradesS__container'>
     <h2 className='pb-5'>My Grades</h2>
<div className='w-70'>
<Table borderless>
  <thead>
    <tr>
      <th>
        Course Name
      </th>
      <th>
        Assignment Name
      </th>
      <th>
        Assignment Grade
      </th>
    
    </tr>
  </thead>
  <tbody>
    {gradeList.map((item) => (

    
    <tr>
      <td>
        {item.parentAssignment.parentCourse.name}
      </td>
      <td>
       {item.parentAssignment.name}
      </td>
      <td>
      {item.grade}
      </td>
     
    </tr> 
    ))}
  </tbody>
</Table>
</div>

    </div>
  )
}

export default GradesS