/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import GetShortURL from "../components/GetShortURL"
import InactiveAccount from "../components/InactiveAccount"
import AllShortURL from "../components/AllShortURL";
import { API } from "../helpers/API";

const Dashboard = () => {
  const [inac, setInac] = useState(false);
  const [shortUrlData, setShortUrlData] = useState([]);

  const URLShort = `${API}/s/all`
  const sessionToken = localStorage.getItem('user_token');

  useEffect(() => {
    fetch(URLShort, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionToken
      })
    })
    .then((data) => data.json())
    .then((data) => {
        if(data.acknowledged){
          setShortUrlData(data.data.reverse());
        }
    })
    .catch((err) => console.log(err))

  },[]);

  return (
    <div className="relative">
      <div>
        <GetShortURL 
        setInac = {setInac}
        setShortUrlData = {setShortUrlData}
        />
      </div>
      
      <div className="mt-8">
        <AllShortURL 
        shortUrlData = {shortUrlData}
        />
      </div>

      {
        inac ? 
        (
          <div className="fixed flex justify-center w-screen bg-transparent top-5">
            <InactiveAccount 
            setInac = {setInac}
            />
          </div>
        ) :
        ''
      }
    </div>
  )
}

export default Dashboard