import React, { useState } from 'react';
import { Form , Button ,ButtonGroup, FormGroup, Container, Row ,Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './styles/Professor.css'



const ProfessorPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setName(student.name);
    setEmail(student.email);
    setPassword(student.password);
    setCourse(student.course);
  };

  const handleAddStudent = (event) => {
    event.preventDefault();
    setStudentList([...studentList, { name, email, password, course }]);
    setName('');
    setEmail('');
    setPassword('');
    setCourse('');
  };

  const handleEditStudent = (event) => {
    event.preventDefault();
    const updatedStudentList = studentList.map((student) => {
      if (student === selectedStudent) {
        return { name, email, password, course };
      }
      return student;
    });
    setStudentList(updatedStudentList);
    setSelectedStudent(null);
    setIsEditing(false);
    setName('');
    setEmail('');
    setPassword('');
    setCourse('');
  };

  return (
      
        
    <div className="ProfessorPage " style={{ backgroundColor: "#DDFFE7",height:"75vh" }}>
     
     <Form className="form__students">
     <FormGroup row>
                <h3 className='text-white'>
                  Students List
                </h3>

              </FormGroup>
              <FormGroup className='search__box'>
              <input type="text" placeholder='search . . .' />
              <span><i class="ri-search-line"></i></span>
              </FormGroup>
        <PerfectScrollbar>
          <FormGroup className='students__name' >
          
            {studentList.map((student) => (
              <ListGroup.Item className='list-students'
               Button key={student.email}
                onClick={() => handleSelectStudent(student)}
              >
                <Button className='list-Item'>{student.name}</Button>
              </ListGroup.Item>
            ))}
            
          </FormGroup>
          </PerfectScrollbar>
      </Form>

      
        <Form className="register-form" style={{ backgroundColor: "off-white" }}>
        {isEditing ? (
          <FormGroup>
            <h3 onClick={handleEditStudent}>
              Edit Student Information
            </h3>
            </FormGroup>
          ) : (
            <FormGroup>
            <h3 onClick={handleAddStudent}>
              Add a new student
            </h3>
            </FormGroup>
          )
          }
        <FormGroup controlId="formName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="formCourse">
            <Form.Control
            className='select'
              as="select"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              style={{ backgroundColor: "off-white"}}
            >
              <option value="">Choose a course...</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </Form.Control>
          </FormGroup>
          {isEditing ? (
            <Button className='form-btn' onClick={handleEditStudent}>
              Update
            </Button>
          ) : (
            <Button className='form-btn' onClick={handleAddStudent}>
              Add
            </Button>
          )}
        </Form>
        </div>
        
      
   
  );
};

export default ProfessorPage;




