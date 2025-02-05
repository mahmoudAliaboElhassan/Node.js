import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../utils/useAxiosPrivate";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={fetchData}>click to fetch</button>

      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Dashboard;
