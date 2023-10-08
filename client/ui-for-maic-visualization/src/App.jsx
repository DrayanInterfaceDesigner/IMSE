import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/UsersTable/Table'


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
  
  useEffect(() => {
    // Fetch users data and update the state when the component mounts
    get_users('http://localhost:5500/api/students')
      .then((data) => {
        setUsers(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array to run the effect only once


  console.log(users)
  return (
    <>
      <div>
        <Table users={users}></Table>
        {/* <p className="read-the-docs">{users.id}</p> */}
      </div>
    </>
  )
}

export default App
