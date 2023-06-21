import { event } from 'jquery';
import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-dt';
import { AiTwotoneDelete, AiFillCheckCircle } from "react-icons/ai";
import { table } from 'console';
import dayjs from "dayjs";
import { getTasks } from './api';
// import getTask from 'index.ts'
console.log()
const Table = () => {
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
       function deleteTask(taskId: number)  {
        let id = taskId;

        console.log("it works wow ")
        fetch('http://localhost:3000/api/tasks/' + id, {
            method: 'DELETE',
          })
          .then(async res =>{ // or res.json()
          if (res.status == 200){
            console.log(res.status)
            window.location.reload();
          }
          if (res.status == 400){
            const jsonResponse = await res.json();
  
            alert(jsonResponse.message)
          }
        })
      }
      function completeTask(taskId: number) {
        // let id = (document.getElementById('complete') as HTMLInputElement).value;
        // let compButton = (document.querySelector('.complete') as HTMLInputElement);
        let id = taskId
        console.log(taskId);
        // let status = (document.getElementById("taskStatus") as HTMLInputElement).value;
        // console.log(status)
        fetch ('http://localhost:3000/api/tasks/' + id, {
          method: 'PATCH',
       body: JSON.stringify(
        {status: 1,}
        ),
       headers: {
        "Content-Type": "application/json; charset=UTF-8"
        },
          })
          .then(async res =>{ // or res.json()
            if (res.status == 200){
              console.log(res.status)
              window.location.reload();
            }
            if (res.status == 400){
              const jsonResponse = await res.json();
  
              alert(jsonResponse.message)
            }
          })
          
      }
      const listTable = document.getElementById('taskList');
      if(listTable)
      if (!$.fn.DataTable.isDataTable("#taskList")) {
      $(function () {
        // console.log(task.status);
      const dataTable = $('#taskList').DataTable( {
        order: [[4, 'dasc']],
        "columnDefs": [
          {
              "targets": [3],
              "visible": true,
              
          },
          { "width": "10px", "targets": 2 }
      ],
          retrieve: true,
        "lengthChange": false
          
        } );
        $('.status-dropdown').on('change', function(e){
          var status = $(this).val();
          $('.status-dropdown').val(status)
          console.log(status)
          // dataTable.column(3).search('\\s' + status + '\\s', true, false, true).draw();
          dataTable.column(3).search(status).draw();
        })
    });
  };
  
  return (
    
    <div>
    <div className="col-4">
						<div className="btn-group submitter-group float-right">
							<div className="input-group-prepend">
								<div className="input-group-text">Status</div>
							</div>
							<select className="form-control status-dropdown">
								<option value="">All</option>
								<option value="Ongoing">Ongoing</option>
								<option value="Completed">Completed</option>
							</select>
						</div>
					</div>
           <table id="taskList" className="table table-striped">
            
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Task</th>
           <th scope="col">Description</th>
           <th scope="col">Status</th>
           <th scope="col">Date</th>
           <th scope="col">Action</th>
         </tr>
       </thead>
       <tbody>
         {task.map((task, index) => (
         <tr key={index}>
           <th scope="row" >{index+1}</th>
           <td key={task.task_index}>{task.task}</td>
           <td key={task.desc_index}>{task.desc}</td>
           <td key={task.status_index}>
            {task.status == 0 && 
            'Ongoing'
            }
                {task.status == 1 && 
            'Completed'
            }
            </td>
           <td key={task.createdAt_index}>{dayjs(task.createdAt).format('YYYY-MM-DD:hh:MM')}</td>
           <td id={task.id} >
           {task.status == 0 && 
            <div>
             <input type="hidden" id= "taskStatus"  value={task.status} />
               <button id='delete' onClick={() =>deleteTask(task.id)} value={task.id} style={{border:"none", color:"red", background: "none", font: '15rem' }}> <AiTwotoneDelete /></button>
             {/* <input type="hidden" id='complete' value={task.id} /> */}
             
               <button id= {task.id} onClick={() =>completeTask(task.id)} className='complete' style={{border:"none", color:"green", background: "none" }} ><AiFillCheckCircle />
               </button>
               </div>
                 }
           </td>
         </tr>
         ))}
       </tbody>
     </table>
    </div>
  );
};

export default Table;