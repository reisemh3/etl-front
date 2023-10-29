import { useState } from "react";
import ApexCharts from 'react-apexcharts';

interface ChartData {
    [year: string]: number[];
  }

interface Props { result: any; }

let chartOptions = {};
let chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [];

const fetchData =(result : any) => {
    try {      
      const firstArray = result[2];
      const secondArray = result[3];

      // 1. Fusionner les données
      const data = firstArray.map((firstItem: { numberProd: any; magid: any; }, index: string | number) => {
        const secondItem = secondArray[index];
        const total = firstItem.numberProd;
        const manufacturerX = secondItem.numberProd;
        const percentage = (manufacturerX / total) * 100;
        return {
          magid: firstItem.magid,
          percentage: parseFloat(percentage.toFixed(2)), // Réduire à deux chiffres après la virgule
          total, // Ajouter le nombre total de produits vendus
        };
      });

      // 2. Trier les données en fonction du nombre de produits vendus dans chaque magasin
      const sortedData = data.sort((a: { total: number; }, b: { total: number; }) => b.total - a.total);

      // 3. Créer les séries de données
      const series = [
        {
          name: 'Fabricant X',
          data: sortedData.map((item: { percentage: any; }) => item.percentage),
        },
      ];

      // 4. Configurer les options du graphique
      const options = {
        chart: {
          type: 'bar',
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: sortedData.map((item: { magid: any; }) => `Magasin ${item.magid}`),
        },
        tooltip: {
          y: {
            formatter: (val: any) => `${val}%`,
          },
        },
      };


      // 4. Mettre à jour les états locaux avec les données
        chartSeries = series;
        chartOptions = options;


    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
}

export default function ChartBar({ result }: Props) {
    fetchData(result);
    return (
        <div>
            {<ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
            />}
        </div>
    )
}