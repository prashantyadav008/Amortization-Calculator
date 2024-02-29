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
  const [eachTotalInterest, setEachTotalInterest] = useState();
  const [eachTotalPrincipal, setEachTotalPrincipal] = useState();
  const [remainingAmount, setRemainingAmount] = useState();

  const chartOptions = {
    chart: {
      type: "pie",
      margin: 0, // Remove default margin
      spacing: [0, 0, 0, 0], // Remove default spacing
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: 294,
    },
    title: {
      text: "Break-up of Total Payment",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
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
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Share",
        colorByPoint: true,
        data: [
          {
            name: "Principal Loan Amount",
            y: 46.3,
            color: "#88A825",
          },
          {
            name: "Total Interest",
            y: 53.7,
            color: "#ED8C2B",
          },
        ],
      },
    ],
  };

  // Render the chart after component mount
  useEffect(() => {
    Highcharts.chart("emipiechart", chartOptions);
  }, []);

  useEffect(() => {
    setAllValues();
  }, [props]);

  const setAllValues = async () => {
    let emiDetail = await props.emiDetail;
    let years =
      props.interest.unit == "year"
        ? props.interest.value * 12
        : props.interest.value;

    let totalPrincipal = emiDetail.emi * years;
    let totalInterest = totalPrincipal - props.principal;

    setEMIMonth(emiDetail.emi);
    setTotalInterest(totalInterest);
    setPrincipalInterest(totalPrincipal);

    setEachTotalInterest(emiDetail.monthPrincipal);
    setEachTotalPrincipal(emiDetail.monthInterest);
    setRemainingAmount(emiDetail.remaining);
  };

  return (
    <>
      <div className="row gutter-left gutter-right">
        <div
          id="emipaymentsummary"
          className="col-sm-5 col-md-6 no-gutter-left no-gutter-right">
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
          class="no-gutter-left no-gutter-right col-sm-7 col-md-6 highcharts-container"
          data-highcharts-chart="0"
          style={{ overflow: "hidden" }}></div>
      </div>
    </>
  );
};
