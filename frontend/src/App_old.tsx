import {
  useState,
  useEffect
} from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState([]);
  const [isModalVisible, setModalVisible] = useState(true);
  const fetchTasks = () => {
    fetch("http://localhost:3000/api/tasks")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTask(data)
      })

  }
  useEffect(() => {
    fetchTasks()

  }, [])
  const form = document.getElementById("myForm");
  const btn = document.getElementById("btn");

  // function saveTask(form){
  // // console.log("hello")

  //   var formData = new FormData(form);
  //   // var data = Object.fromEntries(formData);
  //   console.log(formData)
  // }
  const MyComponent = () => {

    const handleSaveData = () => {
      // Logic to save the data...

      // Once the data is saved, hide the modal
      //   async function getData(form) {

      //   const response= await fetch("http://localhost:3000/api/tasks", {
      //   method: "POST",
      //  body: JSON.stringify(data),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8"
      //   }

      // });
      // const result = await response.json();
      // console.log("Success:", result);
      // }
      try {} catch (error) {
        console.error("Error:", error);
        alert("error.message");

      }

      // console.log(form);
      // if (btn){
      //   form.addEventListener("submit", function (e) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   getData(e.target);
      // e.stopImmediatePropagation();
      // return false;
      // });
      // }
      // setModalVisible(false);
    }
  };
  //delete task

  function deleteTask() {
    let id = (document.getElementById("delete") as HTMLInputElement).value;
    console.log("it works wow ")
    fetch('http://localhost:3000/api/tasks/' + id, {
        method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
  }
  const creatFrom = () => {
      const [formData, setFormData] = useState({
        task: '',
        desc: '',
      });

    const handleSubmit = (event) => {
      // const (task, value) = event.target;
      // setFormData({...formData, [task]: value})
      // console.log(event)
    }
      const handleInputChange = (event) => {
        // const (task, value) = event.target;
        // setFormData({...formData, [task]: value})
        console.log(event)
      }

  return (
    <>
     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id='btn'>
       Launch demo modal
     </button>
     <form id="myForm" onSubmit={handleSubmit}>
       {isModalVisible && (
       <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered no-transform">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title" id="exampleModalLabel">Add New Tasks</h5>
               <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-body">
               <input type="text" id="task" name="task" value={formData.task} onChange={handleInputChange}>
               </input>
               <input type="text" id="desc" name="desc" value={formData.task} onChange={handleInputChange}>
               </input>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn mb-2 btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" onClick={saveTask} className="btn mb-2 btn-primary">Save changes</button>
             </div>
           </div>
         </div>
       </div>
       )}
     </form>

     <table className="table">
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Task</th>
           <th scope="col">Description</th>
           <th scope="col">Status</th>
           <th scope="col">Action</th>
         </tr>
       </thead>
       <tbody>
         {task.map(task => (
         <tr>
           <th scope="row">1</th>
           <td>{task.task}</td>
           <td>{task.desc}</td>
           <td>{task.status}</td>

           <td>
             <form id="deleteForm">
               <button id='delete' onClick={deleteTask} value={task.id}>delete</button>
             </form>
           </td>
         </tr>
         ))}
       </tbody>
     </table>
     </>
     );
     };
    }
export default App
