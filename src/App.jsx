import { useEffect, useState } from 'react'
import './App.css'

const KEY = 'faculty_v1'

export default function App() {
  const [faculties, setFaculties] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) setFaculties(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(faculties))
  }, [faculties])

  function add(e) {
    e.preventDefault()
    if (!id || !name || !phone) return
    if (faculties.some((f) => f.id === id)) return
    setFaculties([...faculties, { id, name, gender, phone }])
    setId('')
    setName('')
    setPhone('')
  }

  return (
    <div id="root">
      <h1>Faculty Manager</h1>

      <form onSubmit={add} style={{ maxWidth: 760, margin: '0 auto 1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'left' }}>
        <h2>All Faculties</h2>
        {faculties.length === 0 ? (
          <div style={{ color: '#666' }}>No records</div>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((f) => (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>{f.name}</td>
                    <td>{f.gender}</td>
                    <td>{f.phone}</td>
                    <td>
                      <button onClick={() => setFaculties(faculties.filter(x => x.id !== f.id))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => setFaculties([])} style={{ background: '#c33', color: 'white' }}>Clear All</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
