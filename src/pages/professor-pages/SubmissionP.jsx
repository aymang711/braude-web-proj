import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import '../../styles/SubmissionP.css'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAuthContext } from '../../custom-hook/useAuthContext'
import {API_URL} from '../../components/apiUrl';


const SubmissionP = () => {
  const {user} = useAuthContext();


const[assignmentList,setAssignmentList] = useState([]);
const [submissionList,setSubmissionList] = useState([]);
const[searchedItem,setSearchedItem] =useState([]);
const [id,setSubId] = useState('');
const [name,setName] = useState('');
const [date,setDate] = useState('');
const [file,setFile] = useState([]);
const [grade,setGrade] = useState('');
const [text,setText] = useState('');
const [selectedAssign,setSelectedAssign] = useState([])



///////////////////Get Assignments
function getAssignment() {
  
  fetch(`${API_URL}assignment/`,{
    method:'GET',
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  }).then(response => response.json()).then(data => setAssignmentList(data));

}
///////////////////Get Submissions
// function getSubmission() {
//   fetch('https://braude-api.herokuapp.com/api/submission/',{
//     method:'GET',
//     headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
//   }).then(response => response.json()).then(data => setSubmissionList(data));

// }
useEffect(() =>{
getAssignment();


 
 },[]);
////get submissions for one assignment
 const getSubForSAssign =(id)=>{
  

    fetch(`${API_URL}assignment/${id}/grades`,{
      method:'GET',
      headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    })
      .then((response) => response.json())
      .then((data) => setSubmissionList(data.submissions));
   }
 

   ////select sub
const handleSelectSubmission =(submission)=>{
  setSubId(submission._id);
  setName(submission.student.name);
  setDate(submission.parentAssignment.deadLine.split('T')[0]);
  setFile(submission.file);
}

   /////////////////// update submission
const handleEditSubmission =(submission)=>{


  const data= {name,date,grade,file,text};
  fetch(`${API_URL}submission/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    body: JSON.stringify(data),
  
  })
    .then(response => response.json())
    .then(data => {
     
   
      
    })
    .catch(error => {
      console.error(error);
    });
    setName('');
    setDate([]);
    setGrade('');
    setText('');
    setFile('');



}

///////////////////delete submission
const handleDeleteSubmission =(id)=>{
  fetch(`${API_URL}submission/${id}`, {
    method: "DELETE" ,
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  })
    .then(response => response.json())
    .then(data => {
     
      getSubForSAssign();
     
    })
    .catch(error => {
      console.error(error);
    });
    setName('');
    setDate([]);
    setGrade('');
    setText('');
    setFile('');


}
////////file
const handleDownload = () => {
  const link = document.createElement('a');
  link.href = `${API_URL}file/${file}`;
  // link.download = 'fileName.pdf';
  link.target= '_blank';
  link.click();
};









  return (<div className='submissionP__container'>

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
          onClick={()=> getSubForSAssign(assign._id)}
          >{assign.name}</Button>
        ))
      }
      </div>
      </PerfectScrollbar>
      </div>


    <div className="submission-list">
    <h3 className='text-white pt-2 pb-2'>Submission List</h3>
      <div className="search__box">
          <input type="text" placeholder='Search .  .  .'
          onChange={(e) => setSearchedItem(e.target.value)}
          
           />
          <span><i class="ri-search-line"></i></span>
         </div> 
      <PerfectScrollbar className='w-100'>
      <div className='submission-name '>
      {
        
        submissionList.filter((submission)=>(
          submission.parentAssignment.name.toLowerCase().includes(searchedItem)
        ))
        .map((submission)=>(
          <Button
          className='assign-button'
          key ={submission._id}
          onClick={()=> handleSelectSubmission(submission)}
          >{submission.student.name} {"submission"}</Button>
        ))
      }
      </div>
      </PerfectScrollbar>
    </div>



    <div className="submission-info">
      <h3 className='text-white pt-2 pb-2'>Submission Detailes</h3>
      <div className=''>
        <input type='text' placeholder='Student Name'value={name} onChange={(e)=> setName(e.target.value)}></input>
      </div>
      <div className=''>
        <input type='text' placeholder='Submission Date' value={date} onChange={(e)=> setDate(e.target.value)}></input>
      </div>
      <div className='sub-file'>
        <label></label>
        <a href='#' onClick={handleDownload} className='showSub'> Show Submission</a>
      </div>
      <div className=''>
        <input type='text' placeholder='Grade' value={grade} onChange={(e)=> setGrade(e.target.value)}></input>
      </div>
      <div className=''>
        <input type='text' placeholder='Free Text' value={text} onChange={(e)=> setText(e.target.value)}></input>
      </div>
      <div className=''>
      <Button className='form-btn mr-2'
        onClick={() => handleEditSubmission(id)} >
      Save</Button>

      <Button className='form-btn ml-2'
        onClick={() => handleDeleteSubmission(id)} >
      Delete</Button>
      </div>
           





    </div>

  </div>


  
  )
}

export default SubmissionP