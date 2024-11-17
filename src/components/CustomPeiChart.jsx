import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const initialData = [
    { name: "Ready", value: 5 },
    { name: "Open", value: 5 },
    { name: "In Progress", value: 6 },
    { name: "Completed", value: 2 },
    { name: "Closed", value: 1 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042" ,  "green", 'teal', 'tomato', 'darksalmon', 'darkseagreen'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  
  function CustomPeiChart({chartData}) {
    const [data, setData] = useState(initialData);
    const renderCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = outerRadius + 20; // Position slightly outside the slice
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text
          x={x}
          y={y}
          fill="#333"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {data[index].name} ({data[index].value})
          {/* {`${data[index].name}: ${(percent * 100).toFixed(0)}%`} */}
        </text>
      );
    };

    useEffect(() => {
      setData(chartData);
    }, [chartData])
    
  return (
    <div>    <PieChart width={600} height={320}>
      <Pie
        data={data}
        cx={"50%"}
        cy={"50%"}
        labelLine={renderCustomizedLabel2}
        label={renderCustomizedLabel}

        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        nameKey="name"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart></div>
  )
}

export default CustomPeiChart