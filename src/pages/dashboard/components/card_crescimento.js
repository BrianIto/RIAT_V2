import React, { useEffect } from 'react'
import "../styles/components/card_crescimento.sass"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


const CardCrescimento = (props) => {

    useEffect(() => {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create('chart', am4charts.XYChart);

        let data = [];
        let value = 50;
        for (let i = 0; i < 200; i++) {
            let date = new Date();
            date.setDate(i);
            value -= Math.round((Math.random() <  0.5 ? 1 : -1) * Math.random() * 10);
            data.push({date: date, value: value});
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";

    }, [])

    return (
        <div className={'card_crescimento_container'}>
            <h2>Gráfico de Crescimento</h2>
            <h4>Últimos 30 dias</h4>
            <div id={'chart'} style={{minHeight: '50vh', marginTop: '2%'}} name="chart"/>
        </div>
    )
}

export default CardCrescimento