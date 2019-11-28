import React, { useEffect } from "react"
import "../styles/card_left.sass"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment/min/moment-with-locales";
import {connect} from "react-redux";

const somaTodos = arrayInst => {
    let arraySomado = new Array(12).fill(0);
    arrayInst.forEach(instituicao => {
        instituicao.lucro.forEach((saldoMes, index) => {
            arraySomado[index] += saldoMes;
        })
    });
    return arraySomado;
}

const CardLeft = (props) => {

    useEffect(() => {

        am4core.useTheme(am4themes_animated);

        console.log(props.saidas);

        let chart = am4core.create('chart_vendas', am4charts.XYChart);
        // LINHA (verde claro) Entradas
        // LINHA (vermelho claro) Saídas

        //Linha da Subtração entre entrada e Saída
        let data = [];
        for (let i = 0; i < 12; i++) {
            let currentMonth = moment().subtract(i-2, 'month');
            let date = currentMonth.locale('pt-BR').format(' MMMM ');
            let somador = 0;

            props.saidas.forEach(saida => {
                if (saida.mes_ano === currentMonth.format('MM / YYYY')) {
                    somador += Number(saida.valor);
                }
            });
            let saida = somador;
            let entrada = somaTodos(props.instituicoesComSessoes)[currentMonth.month()]
            data.push({date: date, saida: saida, entrada: entrada, lucro: entrada-saida});
        }

        chart.data = data.reverse();

        chart.colors.list = [
            am4core.color("rgba(255,32,32,0.3)"),
            am4core.color("rgba(32,255,32,0.3)"),
            am4core.color("rgba(0,212,80,1)"),
        ];

        let dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        dateAxis.dataFields.category = 'date';
        dateAxis.renderer.minGridDistance = 30;
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.LineSeries());
        let series2 = chart.series.push(new am4charts.LineSeries());
        let series3 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "entrada";
        series2.dataFields.categoryX = "date";
        series3.dataFields.valueY = "lucro";
        series3.dataFields.categoryX = "date";
        series.dataFields.valueY = "saida";
        series.dataFields.categoryX = "date";

    }, []);

    return (
        <div className={'card_left_financeiro'}>
            <h2>Gráfico de Progressão de Resultados</h2>
            <div style={{minHeight: 290}} className={'chart_vendas'} />
        </div>
    )
}

const mapStateToProps = state => ({
    saidas: state.financeiro.saidas,
    instituicoesComSessoes: state.financeiro.instituicoesComSessoes
});

export default connect(mapStateToProps)(CardLeft)