import { event } from 'jquery';
import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-dt';
import { AiTwotoneDelete, AiFillCheckCircle } from "react-icons/ai";
import { table } from 'console';
import dayjs from "dayjs";
import { getTasks } from './api';
// import getTask from 'index.ts'
console.log()
const Modal = () => {
const [task, setTask] = useState([]);
const [isModalVisible, setModalVisible] = useState(true);
useEffect(() =>{
fetchTasks();

},[]);
const fetchTasks = () => {
    fetch("http://localhost:3000/api/tasks")
      .then(async response => {
        const abc = await response.json()
        setTask(abc);
      })
      .then(data => {
        // tasks=data;
        console.log(data);
        
      })
};
  const [formData, setFormData] = useState({
    task: '',
    desc: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let InputData = {
      "task": formData.task,
      "desc": formData.desc
    }; 
          const response= await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
       body: JSON.stringify(InputData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

   })
   if (response.status == 201){
    console.log(response.status)
    window.location.reload();
  }
  if (response.status == 400){
    const jsonResponse = await response.json();
  
    alert(jsonResponse.message)
  }
      }
  
  return (
    
    <div>
      <br />
    <section className="main-header grid">
      <h1>Tasks</h1>
      <button type="button" className="button" data-toggle="modal" data-target="#exampleModal" id='btn'>
       New Task
     </button>
     </section>
    <form onSubmit={handleSubmit}>
    {isModalVisible && (
       <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered no-transform">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title" id="exampleModalLabel">Add New Tasks</h5>
               <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-body">
              <label htmlFor="Task" style={{ margin: "0 0.5rem"}}>Name of the Task:</label>
              <br />
               <input type="text" id="task" name="task" value={formData.task} onChange={handleInputChange} style={{width: "50%"}} required maxLength={15}>
               </input>
               <br />
               <br />
               <label htmlFor="Task" style={{ margin: "0 0.5rem"}}>Description of the Task:</label>
               <br />
               <textarea id="desc" name="desc" value={formData.desc} onChange={handleInputChange}  style={{ margin: "0 0.5rem", border: "1px solid var(--color-neutral)"}} rows="4" cols="45" required>
               </textarea>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn mb-2 btn-secondary" data-dismiss="modal">Close</button>
               <button type="submit" className="btn mb-2 btn-primary">Save changes</button>
             </div>
           </div>
         </div>
       </div>
       )}
   
    </form>
    </div>
  );
};

export default Modal;
