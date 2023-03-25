import ReactApexChart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Chart() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const   colors=['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const chartData = {
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories.map((category) => category.category),
      },
      yaxis: {
        title: {
          text: "총 권수",
        },
      },
      title: {
        text: "카테고리",
        align: "center",
      },
      colors: colors,
    },
    series: categories.map((category, index) => {
      return {
        name: category.category,
        data: [category.percentage],
        color: colors[index],
      };
    }),
  };

  return (
    <div id="chart">
      {categories.length ? (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width="400"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Chart;