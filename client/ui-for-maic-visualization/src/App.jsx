import { useState, useEffect } from 'react'
import './App.css'
import Table from './components/UsersTable/Table'
import './styles/Basic.scss'
import StructureGrid2x2 from './components/Structure/StructureGrid2x2/StructureGrid2x2'
import StudentId from './components/Student/StudentId/StudentId'
import MachineStatus from './components/Machine/MachineStatus/MachineStatus'


const get_users = async (endpoint) => {
  const req = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }

  try {
    const res = await fetch(endpoint, req)
    if(!res.ok) {
      console.error(`Request failed with status: ${response.status}`)
    }
    const data = await res.json()
    return data

  } catch(e) {console.error(e)}
}

function App() {
  const [users, setUsers] = useState([])
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await get_users('http://localhost:5500/api/students');
  //       setUsers(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  
  //   // Poll every 5 seconds (adjust the interval as needed)
  //   const pollInterval = setInterval(fetchData, 1000)
  
  //   // Cleanup on unmount
  //   return () => {
  //     clearInterval(pollInterval)
  //   }
  
  // }, [])
  


  console.log(users)
  return (
    <>
      <div>
        {/* <Table users={users}></Table> */}
        {/* <p className="read-the-docs">{users.id}</p> */}
        <StructureGrid2x2>
          <StudentId props={{sID: 1}}></StudentId>
          <MachineStatus props={{currentStatus: 'running'}}></MachineStatus>
        </StructureGrid2x2>
      </div>
    </>
  )
}

export default App
