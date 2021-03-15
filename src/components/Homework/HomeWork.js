import React, { useState } from "react";
import "./HomeWork.css";
import { PieChart, Pie, Cell } from "recharts";

const Subject = (props) => {
  const data = [
    { title: props.name, value: props.percent, color: "#E38627" },
    { title: "", value: 100 - props.percent, color: "#ffffff" },
  ];

  return (
    <div className="Subject">
      <div style={{ marginLeft: "-35px" }}>
        <PieChart width={100} height={100}>
          <text x={50} y={50} textAnchor="middle" dominantBaseline="middle">
            {`${props.percent} %`}
          </text>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="80%"
            outerRadius="100%"
            fill="#CCC"
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            cornerRadius={5}
          >
            <Cell key="test" fill="cyan" />
          </Pie>
        </PieChart>
      </div>
      <div className="timing1">
        <div>
          <h2>{props.name}</h2>
          <br />
          Sep 7, 2021
        </div>
      </div>
    </div>
  );
};

const HomeWork = () => {
  const [subjects] = useState([
    { id: 1, name: "Biology", percent: 70 },
    { id: 2, name: "Physics", percent: 80 },
    { id: 3, name: "Maths", percent: 90 },
  ]);
  return (
    <div className="box1">
      <h1>Homework Progress</h1>
      <div className="subject">
        {subjects.map((subject) => (
          <Subject key={subject.id} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default HomeWork;
