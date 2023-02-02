import React ,{useState,useEffect} from 'react'
import '../../styles/Grades.css'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from 'reactstrap';
import { useAuthContext } from '../../custom-hook/useAuthContext';
import {API_URL} from '../../components/apiUrl';


const GradesP = () => {
    const {user} = useAuthContext();

const[assignmentList,setAssignmentList]=useState([]);
const[searchedItem,setSearchedItem] = useState([])
const [assignGrade,setAssignGrade] = useState([]);
const [AvgGrade,setAvgGrade] = useState('');
   





///////////////////Get Assignments
function getAssignment() {
   
    fetch(`${API_URL}assignment/`,{
      method:'GET',
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    }).then(response => response.json()).then(data => setAssignmentList(data));
  
  }
  /////////////////get assignment grade
const getAssignmentGrade = (assign)=>{
  fetch(`${API_URL}assignment/${assign._id}/grades`,{
    method:'GET',
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  }).then(response => response.json()).then(data => setAssignGrade(data.submissions));
 

}
 



  
useEffect(() =>{
    getAssignment();
   
   
},[])

const calculateAverage = () => {
  let sum = 0;
  assignGrade.forEach((grade) => {
    sum += grade.grade;
  });
  return sum / assignGrade.length;
};

  return (
  <div className='gradesP__container'>
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
         onClick={()=> getAssignmentGrade(assign)}
          >{assign.name}</Button>
        ))
      }
      </div>
      </PerfectScrollbar>
    </div>


    <div className="grades-info">
    <PerfectScrollbar style={{width:330}}>
        
    <table className='table mt-5'>
            <thead>
              <tr>
              <th>Student Name</th>
              <th>Grade</th>
              </tr>

            </thead>
          
            <tbody>
             {assignGrade.map((student) =>(

            
                <tr>
                    <td>{student.student.name}</td>
                    <td>{student.grade}</td>
                </tr>
              
            ))}
            {/* <tr>{calculateAverage()}</tr> */}
            </tbody>
            </table>
            </PerfectScrollbar>
           
    <table className='table avgTable mt-5'>
    <thead>
    <tr>
    <th>Average </th>
    </tr>

    </thead>
    <tbody>
        <tr>
            <td>
             {calculateAverage()}
            </td>
        </tr>

    </tbody>

    </table>
    </div>
  
  </div>
  )
}

export default GradesP