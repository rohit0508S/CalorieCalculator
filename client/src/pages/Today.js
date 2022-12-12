import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./today.css";

const Today = () => {
  const [fooditem, setFooditem] = useState([]);
  const [energyburn, setEnergyburn] = useState([]);


  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [mainData, setMainData] = useState({
    date: "",
    name: "",
    intakecalorie: 0,
    targetincalorie: 0,
    burncalorie: 0,
    targetburncalorie: 0,
  });
  const [check, setCheck] = useState({
    name: false,
    setIntakeCalorie: false,
    setBurnCalorie: false,
  });
  useEffect(() => {
    getFoodItem();
    getEnergyBurn();
    getDate();
  }, []);

  const getFoodItem = () => {
    axios
      .get("http://localhost:5000/fooditem/get")
      .then((res) => {
        setFooditem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEnergyBurn = () => {
    axios
      .get("http://localhost:5000/energyburn/get")
      .then((res) => {
        console.log(res);
        setEnergyburn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let dropdown = fooditem.map((val) => {
    return <option value={val.food}>{val.food}</option>;
  });

  let dropdown1 = energyburn.map((val) => {
    return <option value={val.activity}>{val.activity}</option>;
  });

  const intake = (value) => {
    fooditem.map((val) => {
      if (value == val.food) {
        let obj = {
          food: val.food,
          energy: val.calories,
        };
        setData1([...data1, obj]);
        setMainData({
          ...mainData,
          intakecalorie: mainData.intakecalorie + val.calories,
        });
        return;
      }
    });
  };

  const burn = (value) => {
    energyburn.map((val) => {
      if (value == val.activity) {
        console.log("valll", val);
        let obj = {
          activity: val.activity,
          energy: val.calorieburn,
        };
        setData2([...data2, obj]);
        setMainData({
          ...mainData,
          burncalorie: mainData.burncalorie + val.calorieburn,
        });
        return;
      }
    });
  };

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "-" + dd + "-" + yyyy;
    console.log(today);
    setMainData({ ...mainData, date: today });
  };

  const saveDate = () => {
    axios
      .post("http://localhost:5000/api/post", mainData)
      .then((res) => {
        console.log("res---", res);
        setCheck({ ...check, loading: false });
        clearData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearData = () => {
    let obj = {
      date: "",
      name: "",
      intakecalorie: 0,
      targetincalorie: 0,
      burncalorie: 0,
      targetburncalorie: 0,
    };
    setMainData(obj);
    let obj1 = {
      name: false,
      setIntakeCalorie: false,
      setBurnCalorie: false,
    };
    setCheck(obj1);
    setData1([]);
    setData2([]);
    console.log("clear data");
  };

  return (
    <>
      <div className="main-div">
        <div className="title">
          <h2>Calculate Today's Energy</h2>
        </div>
        {check.name ? (
          <div className="name">
            <h2>Hello {mainData.name}..</h2>
          </div>
        ) : (
          <div className="name">
            <h3>Enter Your Name..</h3>
            <input
              type="text"
              id="inp"
              value={mainData.name}
              onChange={(e) =>
                setMainData({ ...mainData, name: e.target.value })
              }
            />
            <button
              className="button"
              onClick={(e) => setCheck({ ...check, name: true })}
            >
              save
            </button>
          </div>
        )}
        <div className="energy">
          <div className="outer-energy">
            <div className="inner-energy">
              <h3>Set Today's Target Energy Intake</h3>
              {check.setIntakeCalorie ? (
                <h1>{mainData.targetincalorie}</h1>
              ) : (
                <div>
                  <input
                    type="text"
                    value={mainData.targetincalorie}
                    onChange={(e) =>
                      setMainData({
                        ...mainData,
                        targetincalorie: e.target.value,
                      })
                    }
                  />
                  <button
                    className="button"
                    onClick={(e) =>
                      setCheck({ ...check, setIntakeCalorie: true })
                    }
                  >
                    set
                  </button>{" "}
                </div>
              )}
            </div>
            <div className="inner-energy">
              <h3>Today's Energy Intake</h3>
              <h1>{mainData.intakecalorie}</h1>
            </div>
          </div>
          <div className="outer-energy">
            <div className="inner-energy">
              <h3>Set Today's Target Energy Burn</h3>
              {check.setBurnCalorie ? (
                <h1>{mainData.targetburncalorie}</h1>
              ) : (
                <div>
                  <input
                    type="text"
                    value={mainData.targetburncalorie}
                    onChange={(e) =>
                      setMainData({
                        ...mainData,
                        targetburncalorie: e.target.value,
                      })
                    }
                  />
                  <button
                    className="button"
                    onClick={(e) =>
                      setCheck({ ...check, setBurnCalorie: true })
                    }
                  >
                    set
                  </button>{" "}
                </div>
              )}
            </div>
            <div className="inner-energy">
              <h3>Today's Energy Burn</h3>
              <h1>{mainData.burncalorie}</h1>
            </div>
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown1">
            <div>
              <select
                name="cars"
                id="cars"
                onChange={(e) => intake(e.target.value)}
              >
                <option value="Select item">select item</option>
                {dropdown}
              </select>
            </div>
            <div>
              {data1.length > 0 ? (
                data1.map((val, i) => {
                  return (
                    <div className="show">
                      <h3>{val.food}</h3>
                      <h3>{val.energy}</h3>
                    </div>
                  );
                })
              ) : (
                <h3>No EnergyTaken Today</h3>
              )}
            </div>
          </div>

          <div className="dropdown2">
            <div>
              <select
                name="cars"
                id="cars"
                onChange={(e) => burn(e.target.value)}
              >
                <option value="Select item">select item</option>
                {dropdown1}
              </select>
            </div>

            <div>
              {data2.length > 0 ? (
                data2.map((val, i) => {
                  return (
                    <div className="show">
                      <h3>{val.activity}</h3>
                      <h3>{val.energy}</h3>
                    </div>
                  );
                })
              ) : (
                <h3>No EnergyBurn Today</h3>
              )}
            </div>
          </div>
        </div>

        <div className="butn">
          <button
            className="button"
            onClick={(e) => {
              saveDate();
              setCheck({ ...check, loading: true });
            }}
          >
            {check.loading ? "Loading..." : "Save For Future"}
          </button>
        </div>
      </div>


      <Link to="/">
<input type="button" value="Go back"/>
</Link>
    </>
  );
};
export default Today;
