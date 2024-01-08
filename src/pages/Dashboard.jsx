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
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D")' }}
    >
      {/* Short URL Input Section */}
      <div className="mb-8">
        <GetShortURL setInac={setInac} setShortUrlData={setShortUrlData} />
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row items-center justify-around w-full p-4">
        <ShortUrlCharts shortUrlData={shortUrlData} />
      </div>

      {/* All Short URLs Section */}
      <div className="mb-8">
        <AllShortURL shortUrlData={shortUrlData} />
      </div>

      {/* Inactive Account Modal */}
      {inac && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-blue bg-opacity-50">
          <InactiveAccount setInac={setInac} />
        </div>
      )}

      {/* Your content goes here */}
      


      <br />
      <br />
      <h1 className="text-2xl text-blue-500 absolute bottom-4">
        Created by Purushottam Mishra 🧑‍💻🧑‍💻🧑‍💻🧑‍💻
      </h1>
    </div>
   
  )
}

export default Dashboard