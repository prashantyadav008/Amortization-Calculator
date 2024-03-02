import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

export const EMIGraph = (props) => {
  const [emiMonth, setEMIMonth] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [principalInterest, setPrincipalInterest] = useState();

  useEffect(() => {
    setAllValues();
  }, [props]);

  const setAllValues = async () => {
    let monthlyEMI = props.monthlyEMI;
    let years =
      props.interest.unit == "year"
        ? props.interest.value * 12
        : props.interest.value;

    let totalPrincipal = monthlyEMI * years;
    let totalInterest = totalPrincipal - props.principal;

    let graphInterest = (totalInterest / totalPrincipal) * 100;
    let graphPrinicpal = 100 - graphInterest;

    setEMIMonth(monthlyEMI.toLocaleString("en-IN"));
    setTotalInterest(totalInterest.toLocaleString("en-IN"));
    setPrincipalInterest(totalPrincipal.toLocaleString("en-IN"));

    const chartOptions = {
      chart: {
        type: "pie",
        margin: 40,
        spacing: [0, 0, 0, 0],
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        width: 255,
        height: 290,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
      title: {
        text: "Break-up of Total Payment",
        style: {
          font: "bold 12px Lato, Helvetica Neue, Helvetica, Arial, sans-serif",
        },
        y: 30, // Move the title downwards
      },
      tooltip: {
        pointFormat: "{point.y}%",
      },
      accessibility: {
        enabled: false,
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "{point.percentage:.1f} %", // Show percentage in data labels
            distance: -30, // Move data labels towards the center of the pie
          },
          showInLegend: true, // Show data labels in legend
          center: ["50%", "50%"], // Center the pie chart within its container
        },
      },
      series: [
        {
          colorByPoint: true,
          data: [
            {
              name: "Principal Loan Amount",
              y: graphPrinicpal,
              // y: 55,
              color: "#88A825",
            },
            {
              name: "Total Interest",
              y: graphInterest,
              // y: 45,
              color: "#ED8C2B",
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      legend: {
        enabled: true,
      },
    };

    Highcharts.chart("emipiechart", chartOptions);
  };

  return (
    <>
      <div className="row gutter-left gutter-right">
        <div
          id="emipaymentsummary"
          className="col-sm-5 col-md-6 no-gutter-left no-gutter-right">
          {" "}
          <div id="emiamount">
            <h4>Loan EMI</h4>
            <p>
              $<span>{emiMonth}</span>
            </p>
          </div>
          <div id="emitotalinterest">
            <h4>Total Interest Payable</h4>
            <p>
              $<span>{totalInterest}</span>
            </p>
          </div>
          <div id="emitotalamount" className="column-last">
            <h4>
              Total Payment
              <br />
              (Principal + Interest)
            </h4>
            <p>
              $<span>{principalInterest}</span>
            </p>
          </div>
        </div>

        <div
          id="emipiechart"
          className="no-gutter-left no-gutter-right col-sm-7 col-md-6 highcharts-container"
          data-highcharts-chart="0"></div>
      </div>
    </>
  );
};
