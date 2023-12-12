/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import GetShortURL from "../components/GetShortURL"
import InactiveAccount from "../components/InactiveAccount"
import AllShortURL from "../components/AllShortURL";
import { API } from "../helpers/API";
import ShortUrlCharts from "../components/ShortUrlCharts";

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
      
      <div className="flex flex-col flex-wrap items-center justify-around w-4/5 px-8 py-4 mx-auto md:flex-row">
        <ShortUrlCharts  
        shortUrlData = {shortUrlData}
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