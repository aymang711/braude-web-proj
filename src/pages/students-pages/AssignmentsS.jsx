import React ,{useState,useEffect} from 'react'
import '../../styles/assignmentsS.css'
import { useAuthContext } from '../../custom-hook/useAuthContext'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Button} from 'reactstrap';
import {API_URL} from '../../components/apiUrl';


const AssignmentsS = () => {
  const {user} = useAuthContext();
  const[student,setUserId]=useState(user.id);
  const[searchedItem,setSearchedItem] = useState([]);
  const[assignmentList,setAssignmentList] = useState([]);
  const [fileData, setFileData] = useState({});
  const [error, setError] = useState(null);
  const[assignName,setAssignName] = useState('')
  const [name,setCourseName] =useState('')
    //
    const [filef, setFile] = useState(null);
    const [file,setSubFileId] = useState('');
    const [parentAssignment,setAssignId] = useState('');
    const [assignFile,setAssignFile] = useState('')
    const [submissionDate,setDate] = useState()
    const[selectedAssign,setSelectedAssign]=useState([])
    const [status,setStatus] = useState('');
    //



 // get Assignments
 function getAssignment() {
 
  
  fetch(`${API_URL}students/${user.id}/assignments`,{
    method:'GET',
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  }).then(response => response.json()).then(data => setAssignmentList(data));
  


}


//get file
const handleSelectAssign = (assign) => {
  // setAssignFileId(assign._id);
  const id ='63d7b8c4f20482ee3e714b47';
  fetch(`${API_URL}assignment/${assign._id}`,{
    method:'GET',
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
  })
    .then((response) => response.json())
    .then((data) => setSelectedAssign(data));
    setCourseName(selectedAssign.parentCourse.name);
    
    setAssignName(selectedAssign.name);
    setDate(selectedAssign.deadLine.split('T')[0]);
    setStatus(selectedAssign.assignmentStatus);
    setAssignId(selectedAssign._id);
   
    setAssignFile(selectedAssign.assignmentfile)  

}

//download file

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${API_URL}file/${assignFile}`;
    link.target= '_blank';
    link.click();
  };

//upload file 
const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append("file", filef);

  const response = await fetch(`${API_URL}file/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  setSubFileId(data)
  
  
}


useEffect(() =>{
  getAssignment();

  },[])


 //add-a-submission 
 const handleAddSubmission =(event) => {
  event.preventDefault();
  const formData = {parentAssignment, file, student};

  fetch(`${API_URL}submission/add-a-submission/`, {
    method: "POST",
    headers: {"Content-Type": "application/json","authorization":`Bearer ${user.token}`,'role':user.role},
    body: JSON.stringify(formData),
  }).then((result) => {
    console.warn("result", result);
    result.json().then((response) => {
      console.warn(response);
    });
  });
  setCourseName('');
  setAssignName('');
  setDate([]);
  setStatus('');
  setSubFileId('');
  setAssignFile('');
  setFile('');
 }



  return (
    <div className='assignmentS__container'>
      <div className='assignment-list'>
        <h3 className='pt-2 pb-2'>Assignments List</h3>
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
          
          >{assign.name}</Button>
        ))
      }
      </div>
      </PerfectScrollbar>
      </div>

      <div className="assignment-info">
        <h3 className=''> Assignment Details </h3>
        <div className='assignment-content'>
        <div className='assign-info'>

        <div className=''>
        <input type='text' placeholder='Course Name' value={name} onChange={(e)=>setCourseName(e.target.value)}></input>
        </div>

        <div className=''>
        <input type='text' placeholder='Assignment Name' value={assignName} onChange={(e)=>setAssignName(e.target.value)}></input>
        </div>

        <div className=''>
        <input type='text' placeholder='Assignment Status' value={status} onChange={(e)=>setStatus(e.target.value)}></input>
        </div>

        <div className=''>
        <input type='text' placeholder='Assignment deadLine' value={submissionDate} onChange={(e)=>setDate(e.target.value)}></input>
        </div>

        </div>

         <div  className='assign-info'>
        

        <div className='info w-100'>
        <label>Show Assignment</label>
        <a href='#' onClick={handleDownload} className='text-white showAssign'> Show</a>

        </div>
        <div className='info w-100'>
          <label className=''>Upload Submission</label>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className='upload-btn' onClick={handleSubmit}>Upload</button>
        </div>


        </div>
        </div>
       <button className='form-btn'  onClick={handleAddSubmission}> Submit </button>

      </div>



    </div>
  )
}

export default AssignmentsS