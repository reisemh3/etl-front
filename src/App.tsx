import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import './App.css';
import ApexCharts from 'react-apexcharts';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

interface Props { }

// interface Product {
//   id: string;
//   catid: number;
//   date: string;
//   fabid: number;
//   prodid: number;
// }

interface ChartData {
  [year: string]: number[];
}

const App: React.FC<Props> = (props) => {

  // const [data, setData] = useState<any>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  const [chartData, setChartData] = useState<ChartData>({});
  const [isLoading, setIsLoading] = useState(true);

  // Options initiales pour le graphique ApexCharts
  const initialChartOptions = {
    options: {
      xaxis: {
        type: "string",
      },
    },
    series: [],
  };

  interface ChartOptions {
    options: {
      xaxis: {
        type: string;
      };
    };
    series: {
      name: string;
      data: number[][];
    }[];
  }

  const [chartOptions, setChartOptions] = useState<any>();

  const fetchData = async () => {
    //----------------------------------------------GET URL------------------------------------------------------//
    try {
      const url =
        'http://127.0.0.1:8080/pointvente/health/fab/109/cat/1/date/2022-05-01/2022-05-31'

      const result = await fetch(url).then(response => response.json())
      console.log(result)
      //
      //
      //
      // ------------------------------------------------SET DATA 1------------------------------------------------//
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      const seriesMonths22 = months.map(
        (val, i) =>
          `01-${(i + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}-2022`
      ).map(val => result[0]["2022"][val] ?? 0)
      console.log(seriesMonths22)

      const seriesMonths23 = months.map(
        (val, i) => `01-${(i + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}-2023`
      ).map(val => result[1]["2023"][val] ?? 0)
      console.log(seriesMonths23)

      const datard = {
        series: [{
          name: '2022',
          data: seriesMonths22
        }, {
          name: '2023',
          data: seriesMonths23
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          // dataLabels: {
          //   enabled: true,
          //   formatter: function (val: any) {
          //     return val + "%";
          //   },
          //   offsetY: -20,
          //   style: {
          //     fontSize: '12px',
          //     colors: ["#304758"]
          //   }
          // },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }
      // Mettez à jour les états locaux avec les données (STYLE INITIAL)
      setChartOptions(datard.options)
      setChartSeries(datard.series)

      // Mettez à jour les états locaux avec les données (SECOND STYLE)
      setChartData({
        '2022': seriesMonths22,
        '2023': seriesMonths23,
      });

      setIsLoading(false);
      // ------------------------------------------------------------------------------------------------------//
      //
      //
      //
      // ------------------------------------------------SET DATA 2------------------------------------------------//
      const years = ["2022", "2023"]

      const seriesYears22 = years.map(
        (val, i) =>
          `01-${(i + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}-2022`
      ).map(val => result[0]["2022"][val] ?? 0)
      console.log(seriesYears22)

      const seriesYears23 = years.map(
        (val, i) => `01-${(i + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}-2023`
      ).map(val => result[1]["2023"][val] ?? 0)
      console.log(seriesYears23)


      const datard2 = {
        series: [
          {
            name: '2022',
            data: seriesYears22
          }, {
            name: '2023',
            data: seriesYears23
          }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          // dataLabels: {
          //   enabled: true,
          //   formatter: function (val: any) {
          //     return val + "%";
          //   },
          //   offsetY: -20,
          //   style: {
          //     fontSize: '12px',
          //     colors: ["#304758"]
          //   }
          // },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }
      // Mettez à jour les états locaux avec les données
      setChartOptions(datard.options)
      setChartSeries(datard.series)
      // ------------------------------------------------------------------------------------------------------//
      //
      //
      //
      // ------------------------------------------------SET DATA 3------------------------------------------------//

      const datard3 = {
        series: [
          {
            name: '2022',
            data: seriesMonths22
          }, {
            name: '2023',
            data: seriesMonths23
          }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          // dataLabels: {
          //   enabled: true,
          //   formatter: function (val: any) {
          //     return val + "%";
          //   },
          //   offsetY: -20,
          //   style: {
          //     fontSize: '12px',
          //     colors: ["#304758"]
          //   }
          // },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }
      // Mettez à jour les états locaux avec les données
      setChartOptions(datard.options)
      setChartSeries(datard.series)
      // ------------------------------------------------------------------------------------------------------//
      //
      //
      //
      // ------------------------------------------------SET DATA 4------------------------------------------------//

      const datard4 = {
        series: [
          {
            name: '2022',
            data: seriesMonths22
          }, {
            name: '2023',
            data: seriesMonths23
          }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          // dataLabels: {
          //   enabled: true,
          //   formatter: function (val: any) {
          //     return val + "%";
          //   },
          //   offsetY: -20,
          //   style: {
          //     fontSize: '12px',
          //     colors: ["#304758"]
          //   }
          // },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }
      // Mettez à jour les états locaux avec les données
      setChartOptions(datard.options)
      setChartSeries(datard.series)
      // ------------------------------------------------------------------------------------------------------//

    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData()
  }, []
  );


  // Structurez les données pour ApexCharts
  // const series = Object.keys(chartData).map((year) => {
  //   return {
  //     name: year,
  //     data: Object.keys(chartData[year]).map((month) => [new Date(month).getTime(), chartData[year][month]]),
  //   };
  // });

  const [chartSeries, setChartSeries] = useState<any>([]);

  // ------------------------------------------------WAIT DATA------------------------------------------------//
  if (!chartOptions || !chartSeries) {
    return <div className="center-div">
      <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>;
  }
  // ------------------------------------------------------------------------------------------------------//

  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Sidebar />
        <main>
          <h1>
            <i className="material-icons">space_dashboard</i> Dashboard
          </h1>
          <div>
            {/* {data.data?.map((item: any) =>
              <div>
                <h1>{item.titre}</h1>
              </div>
            )} */}
          </div>


          {/* Graphique ApexCharts */}
          <h2>Données du magasin</h2>
          {isLoading ? (
            <div>Chargement en cours...</div>
          ) : Object.keys(chartData).length > 0 ? (
            <ApexCharts
              options={{
                chart: {
                  height: 350,
                  type: 'bar',
                },
                // Autres options du graphique
              }}
              series={[
                {
                  name: '2022',
                  data: chartData['2022'],
                },
                {
                  name: '2023',
                  data: chartData['2023'],
                },
              ]}
              type="bar"
              height={350}
            />
          ) : (
            <div>Aucune donnée disponible.</div>
          )}
          {/* -------------------------ApexChart Get Data------------------------- */}

          <h2>Données du magasin</h2>
          {chartOptions && chartSeries && <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={350}
          />}
          {/* --------------------------------------------------------------------------- */}

          {/* -------------------------ApexChart Graphique------------------------- */}
          <div>
            <h2>Total Data</h2>
            {chartOptions && chartSeries && <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={350}
            />}

            <h2>Magasin Data</h2>
            {chartOptions && chartSeries && <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={350}
            />}

            <h2>Fabricant Magasin Data</h2>
            {chartOptions && chartSeries && <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={350}
            />}
          </div>
          {/* --------------------------------------------------------------------------- */}

        </main>
      </div>
      <Footer />
    </div>
  )

}

export default App;