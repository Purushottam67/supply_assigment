/* eslint-disable react/prop-types */
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const ShortUrlCharts = ({ shortUrlData }) => {
  function groupByDay(documents) {
    const dayNames = [];

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    // Initialize arrays for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(now - i * oneDay);
      // Craete a array with previous 7 days with valus of 0
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // Get the day of the week
      const tempDayDoc = {};
      tempDayDoc[dayOfWeek] = 0;
      dayNames.unshift(tempDayDoc);
    }

    const len = dayNames.length;
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    // update values for each day
    documents.forEach((doc) => {
      const docDate = new Date(doc.time);
      if (
        docDate.getDate() > oneWeekAgo.getDate() ||
        docDate.getMonth() > oneWeekAgo.getMonth() ||
        docDate.getFullYear > oneWeekAgo.getFullYear()
      ) {
        // create url count for each day
        const dayOfWeek = docDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
        for (let i = 0; i < len; i++) {
          if (dayOfWeek in dayNames[i]) {
            dayNames[i][dayOfWeek]++;
          }
        }
      }
    });

    // Initialize arrays for the last 6 months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currmonthName = now.toLocaleDateString("en-US", { month: "short" });
    // create last 6 mon with value of 0 in array [{Jan:0}]
    let ind = months.indexOf(currmonthName);
    const monthNames = [];
    while (monthNames.length <= 6) {
      if (months[ind]) {
        monthNames.unshift({ [months[ind]]: 0 });
      } else {
        ind = 12;
      }
      ind--;
    }
    // updateing value for each month
    documents.forEach((doc) => {
      const docDate = new Date(doc.time);
      // create url count for each day
      const mon = docDate.toLocaleDateString("en-US", { month: "short" });
      for (let i = 0; i < len; i++) {
        if (mon in monthNames[i]) {
          monthNames[i][mon]++;
        }
      }
    });

    return {
      dayNames,
      monthNames,
    };
  }

  const { dayNames, monthNames } = groupByDay(shortUrlData);

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-around mt-5">
    {/* Daily Bar Chart */}
    <div className="w-full md:w-2/5 bg-slate-400 p-4 rounded-lg">
      <Bar
        data={{
          labels: dayNames.map((val) => Object.keys(val)[0]),
          datasets: [
            {
              label: "URL count Day",
              data: dayNames.map((obj) => Object.values(obj)[0]),
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)", // Red
                "rgba(54, 162, 235, 0.7)", // Blue
                "rgba(255, 206, 86, 0.7)", // Yellow
                "rgba(75, 192, 192, 0.7)", // Green
                "rgba(153, 102, 255, 0.7)", // Purple
                "rgba(255, 159, 64, 0.7)", // Orange
                "rgba(201, 203, 202, 0.7)", // Grey
              ],
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              ticks: {
                fontStyle: "bold",
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                fontStyle: "bold",
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                fontStyle: "bold",
                color: "white",
              },
            },
          },
        }}
      />
    </div>

    {/* Monthly Bar Chart */}
    <div className="w-full md:w-2/5 bg-slate-400 p-4 rounded-lg">
      <Bar
        data={{
          labels: monthNames.map((val) => Object.keys(val)[0]),
          datasets: [
            {
              label: "URL count Month",
              data: monthNames.map((obj) => Object.values(obj)[0]),
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)", // Red
                "rgba(54, 162, 235, 0.7)", // Blue
                "rgba(255, 206, 86, 0.7)", // Yellow
                "rgba(75, 192, 192, 0.7)", // Green
                "rgba(153, 102, 255, 0.7)", // Purple
                "rgba(255, 159, 64, 0.7)", // Orange
                "rgba(201, 203, 202, 0.7)", // Grey
              ],
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              ticks: {
                fontStyle: "bold",
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                fontStyle: "bold",
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                fontStyle: "bold",
                color: "white",
              },
            },
          },
        }}
      />
    </div>
  </div>
  );
};

export default ShortUrlCharts;
