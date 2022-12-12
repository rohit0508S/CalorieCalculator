import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    console.log("=======", response.data);
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact?")
    ) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{}}>
      <div className="today">
        <Link to="/today">
          <button className="btn btn-contact">Add Today's Plan</button>
        </Link>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>date</th>
            <th style={{ textAlign: "center" }}>name</th>
            <th style={{ textAlign: "center" }}>Intake Calorie</th>
            <th style={{ textAlign: "center" }}>Target Intake Calorie</th>
            <th style={{ textAlign: "center" }}>Achieve Intake Calorie</th>
            <th style={{ textAlign: "center" }}>Burn Calorie</th>
            <th style={{ textAlign: "center" }}>Target Burn Calorie</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.intakecalorie}</td>
                <td>{item.targetincalorie}</td>
                <td>{item.targetincalorie<item.intakecalorie?"true":"false"}</td>
                <td>{item.burncalorie}</td>
                <td>{item.targetburncalorie}</td>
                <td>{item.targetburncalorie<item.burncalorie?"true":"false"}</td>

                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>

                  {/* <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
