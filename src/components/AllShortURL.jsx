/* eslint-disable react/prop-types */
import { API } from "../helpers/API";
import { useState, useEffect } from "react";

const AllShortURL = ({ shortUrlData }) => {
  const [deletedLinks, setDeletedLinks] = useState([]);

  function formatTime(dateTime) {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options).replace(',', '');
  }

  function calculateRemainingTime(time) {
    const expirationTime = new Date(time);
    expirationTime.setHours(expirationTime.getHours() + 48);
    const currentTime = new Date();
    const remainingTime = expirationTime - currentTime;

    // Convert remaining time to hours, minutes, and seconds
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function handleDeleteLink(id) {
    // Implement your delete logic here, for example, making an API call to delete the link
    // After deletion, update the state to reflect the change
    setDeletedLinks([...deletedLinks, id]);
  }

  useEffect(() => {
    // You can perform any cleanup or additional actions when the component updates
  }, [deletedLinks]);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-white rtl:text-right dark:text-white">
        <thead className="text-xs text-white uppercase bg-slate-500">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Short URL
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Count
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Full URL
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Created at
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Valid Until
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        {shortUrlData?.length < 1 ? (
          <tbody>
            <tr className="border-b odd:bg-gray-700 even:bg-gray-500 dark:border-gray-700">
              <td colSpan="6" className="text-center">
                No Data Found
              </td>
            </tr>
          </tbody>
        ) : (
          shortUrlData.map((val) => {
            const isLinkDeleted = deletedLinks.includes(val._id);

            return (
              <tbody key={val._id} className={isLinkDeleted ? 'opacity-50' : ''}>
                <tr className="border-b odd:bg-gray-700 even:bg-gray-500 dark:border-gray-700">
                  <td className="px-6 py-4 text-center">
                    <a href={`${API}/s/${val.shortURL}`} target="_blank" rel="noreferrer">
                      {`${API}/s/${val.shortURL}`}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">{val.count}</td>
                  <td className="max-w-xs px-6 py-4 overflow-x-hidden text-center scrollbar-hide hover:overflow-x-auto focus:overflow-x-auto">
                    {val.fullURL}
                  </td>
                  <td className="px-6 py-4 text-center">{formatTime(val.time)}</td>
                  <td className="px-6 py-4 text-center">{calculateRemainingTime(val.time)}</td>
                  <td className="px-6 py-4 text-center">
                    {!isLinkDeleted && (
                      <button
                        onClick={() => handleDeleteLink(val._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>
    </div>
  );
};

export default AllShortURL;