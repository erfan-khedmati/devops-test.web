import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { usersApi, healthCheck } from './services/api'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBakcendStatus] = useState(null)

  useEffect(()=> {
    const checkBakcend =async ()=> {
      try {
        const response = await healthCheck();
        setBakcendStatus("Connected")
      } catch (error) {
        setBakcendStatus("Disconnected")
      } finally {
        setLoading(false);
      }
    }
    checkBakcend();
  }, [])

  const fetchUsers = async ()=> {
    setLoading(true);
    try {
      const response = await usersApi.getUsers();
      setUsers(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      alert("Error fetching")
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fetchUsers}>Fetch</button>
        <p>Bakcend status: {loading ? loading : backendStatus}</p>
        <ul>
          {users.map(user => (<li>{user.name}</li>))}
        </ul>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
