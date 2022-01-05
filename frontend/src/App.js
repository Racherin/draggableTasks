import {useState} from 'react';
import './App.css';
import Nav from './components/Nav.jsx';
import LoginModal from './components/modals/LoginModal.jsx';
import RegisterModal from './components/modals/RegisterModal.jsx';
import GroupModal from './components/modals/GroupModal.jsx';
import TodoModal from './components/modals/TodoModal.jsx';
import DragArea from './components/DragArea.jsx';


function App() {

  const [loginStatus, setLoginStatus]  = useState(localStorage.getItem('token') ? true : false)
  const [user, setUser] = useState('')
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [openGroupModal, setOpenGroupModal] = useState(false)
  const [openTodoModal, setOpenTodoModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(0)


  const [data, setData] = useState(
    {
      tasks: {
        'task-1': { id: 'task-1', content: 'a' },
       
      },
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To do',
          taskIds: ['task-1'],
        },
        
      },
      columnOrder: [ 'column-1']

    }
    );
  



  const tokenCheck = () => {
      if (loginStatus) {
        fetch('http://localhost:8000/auth/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            
            if(json.detail === 'Signature has expired.') {
              setLoginStatus(false);
            }
            else {
              setUser(json.username);
            }
            
          });
      }
  }

  const handleLogin = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if(json.user.username){
          localStorage.setItem('token', json.token);
          setLoginStatus(true);
          setUser(json.user.username);
          setOpenLoginModal(false);
        }
        
      });
  };

  const handleRegister = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLoginStatus(true);
        setUser(json.username);
        setOpenRegisterModal(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoginStatus(false);
    setUser('');
  };



  const fetchData = async () => {

    let data = {}

    Promise.all([
      fetch("http://127.0.0.1:8000/tasks/groups/").then(value => value.json()),
      fetch("http://127.0.0.1:8000/tasks/todos/").then(value => value.json())
      ])
      .then((value) => {
        data["tasks"] = {}
        data["columnOrder"] = []
        data["columns"] = {}



        value[1].forEach((task) => {
          data["tasks"][`task-${task.id}`] = { id: `task-${task.id}`, content: `${task.name}`,  dueDate: `${task.due_date.split("T")[0]}`, dueTime : `${task.due_date.split("T")[1].split(".")[0]}` }
        })
        value[0].forEach((column) => {
          
          let taskids = []
          column.order.order.forEach((taskid)=> {
            taskids.push(`task-${taskid}`)
          })

          data["columns"][`column-${column.id}`] = {
            id: `column-${column.id}`,
            title: `${column.name}`,
            taskIds: taskids
          }

          data["columnOrder"].push(`column-${column.id}`)
        })


        setData(data);


      })
      .catch((err) => {
          console.log(err);
      });



    }


  const handleGroupDelete = async (id) => {
      await fetch(`http://127.0.0.1:8000/tasks/groups/${id}`, {
        method: 'DELETE',
        })
        
        fetchData();
  }




  useState(()=>{
    tokenCheck()
    fetchData()
  },[])



  return (
    <div className="App">
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} handleLogin={handleLogin} />
      <RegisterModal open={openRegisterModal} setOpen={setOpenRegisterModal} handleRegister={handleRegister} />
      <GroupModal open={openGroupModal} setOpen={setOpenGroupModal} fetchGroups={fetchData} />
      <TodoModal open={openTodoModal} setOpen={setOpenTodoModal} selectedGroup={selectedGroup} fetchGroups={fetchData} />

      <Nav 
      setOpenLoginModal={setOpenLoginModal} 
      setOpenRegisterModal={setOpenRegisterModal}
      setOpenGroupModal={setOpenGroupModal}
      loginStatus={loginStatus} 
      username={user} 
      handleLogout={handleLogout} />
      
      { loginStatus ? 
        (<DragArea fetchGroups={fetchData} data={data} setData={setData} handleGroupDelete={handleGroupDelete} setOpenTodoModal={setOpenTodoModal}
          setSelectedGroup={setSelectedGroup}
          />) :
        (<></>)
      }
      
      
    </div>
  );
}

export default App;
