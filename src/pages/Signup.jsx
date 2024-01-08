import { useState } from "react";
import FrontComponent from "../components/FrontComponent"
import { API } from "../helpers/API";

const Signup = () => {

  const [response, setResponse] = useState('');
  const URL = `${API}/signup/newuser` ;

  const pgHeading = 'Signup' ;

  async function handleClick(user){
    // check if there is empty data
    if(!user.email || !user.password || !user.first_name || !user.last_name){
      setResponse({error: 'Fields are required'})
      return 
    }
    console.log(user);

    // update the user data in DB
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      if(data.error) setResponse(() => data);
      if(data.message) setResponse({message: data.message});
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D")'}}>
      <FrontComponent
      pgHeading = {pgHeading}
      handleClick = {handleClick}
      response = {response}
      setResponse = {setResponse}
      />
    </div>
  )
}

export default Signup