import axios from 'axios';

export default async function Home() {
  let allUsers;
  try {
    
    const response = await axios.get('http://localhost:3001/allUsers')
     allUsers = response?.data?.allUsers
  } catch (error) {
    allUsers=[]
  }
  
  return <div>
    {
      allUsers.map((user:any)=>
        <p key={user.id}>
          <span>{user.id} : {user.username} </span>
        </p>
      )
    }
  </div>
}
