import { useState } from "react";
import ApexCharts from 'react-apexcharts';

interface ChartData {
    [year: string]: number[];
  }

interface Props { result: any; }

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let chartOptions = {
    xaxis: {
      categories: months,
    },    
    tooltip: {
        y: {
            formatter: (val: number) => `${val.toFixed(2)}%`,
        },
    },
};
let chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [];

const fetchData =(result : any) => {
    try {
      const dataX = result[0];
      const dataTotal = result[1];

      const seriesMonths22 = months.map(
        (val, i) => {
          const monthYear = `01-${(i + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}-2022`;
          const salesX = dataTotal["2022"] ? dataX["2022"][monthYear] ?? 0 : 0;
          const totalSales = dataTotal["2022"] ? dataTotal["2022"][monthYear] ?? 0 : 0;
          const percentage = totalSales > 0 ? parseFloat(((salesX / totalSales) * 100).toFixed(2)) : 0;
          return percentage;
        }
      );
      console.log(seriesMonths22);

      const seriesMonths23 = months.map(
        (val, i) => {
          const monthYear = `01-${(i + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}-2023`;
          const salesX = dataX["2023"] ? dataX["2023"][monthYear] ?? 0 : 0;
          const totalSales = dataX["2023"] ? dataTotal["2023"][monthYear] ?? 0 : 0;
          const percentage = totalSales > 0 ? parseFloat(((salesX / totalSales) * 100).toFixed(2)) : 0;
          return percentage;
        }
      );
      console.log(seriesMonths23);

      chartSeries = [
        {
          name: '2022',
          data: seriesMonths22,
        },
        {
          name: '2023',
          data: seriesMonths23,
        },
      ];
      console.log(chartSeries)
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
}

export default function ChartArea({ result }: Props) {
    fetchData(result);
    console.log(chartSeries);
    return (
        <div>
            {<ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={350}
            />}
        </div>
    )
}
