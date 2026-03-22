import axios from 'axios';

export default async function Home() {
  const response = await axios.get('http://localhost:3001/allUsers')
  const allUsers = response?.data?.allUsers
  
  
  return <div>
    {
      allUsers.map((user)=>
        <p key={user.id}>
          <span>{user.id} : {user.username} </span>
        </p>
      )
    }
  </div>
}
