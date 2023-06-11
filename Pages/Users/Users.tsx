'use client'
import { useEffect, useState } from 'react'

function UsersPage() {
  const [users, setUsers] = useState<
    Array<{ user_id: number; name: string; email: string }>
  >([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.user_id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button>Update</button>
        </div>
      ))}

      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const target = e.target as typeof e.target & {
            name: { value: string }
            email: { value: string }
          }
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
              name: target.name.value,
              email: target.email.value
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json()
          setUsers([...users, data])
        }}
      >
        <label> Name: </label>
        <input type="text" name="name" />
        <label> Email: </label>
        <input type="text" name="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default UsersPage
