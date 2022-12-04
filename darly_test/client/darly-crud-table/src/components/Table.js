import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { delay } from "../utils/delay";
import { dataLoading, dataLoaded } from "../redux/tableSlice";

import "../custom.css";

const DataTable = () => {
  const dispatch = useDispatch();
  const dataCreatedState = useSelector((state) => state.form.value);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      dispatch(dataLoading());
      const response = await axios.get(
        "http://localhost:3000/developer_details"
      );
      await delay(2000); // emulating a long request
      setData(response.data);
      dispatch(dataLoaded());
    }

    fetchData();
  }, [dataCreatedState, dispatch]);

  return (
    <div>
      <LoadingSpinner />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Favorite Language</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
