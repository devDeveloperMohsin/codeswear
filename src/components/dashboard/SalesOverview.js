import React from "react";
import dynamic from "next/dynamic";
import BaseCard from "../baseCard/BaseCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = ({ monthlySales, monthlyOrders }) => {
  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: ["#fb9678", "#03c9d7"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriestotalrevenue = [
    {
      name: "Total Revenue",
      data: monthlySales,
    },
  ];

  const seriesmonthlysales = [
    {
      name: "Total Orders",
      data: monthlyOrders,
    },
  ];
  return (
    <>
      <BaseCard title="Sales Revenue">
        <Chart
          options={optionssalesoverview}
          series={seriestotalrevenue}
          type="bar"
          height="295px"
        />
      </BaseCard>

      <BaseCard title="Total Sales">
        <Chart
          options={optionssalesoverview}
          series={seriesmonthlysales}
          type="bar"
          height="295px"
        />
      </BaseCard>
    </>
  );
};

export default SalesOverview;
