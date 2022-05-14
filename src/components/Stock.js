import React from "react";
import Chart from 'react-apexcharts';
import useChartData from "../hooks/useChartData";

function Stock({ id, name, price, change }) {
    const { chartData } = useChartData(id)

    return (
        <div className="row">
            <div className="col bg-primary m-1 text-center text-white">
                {name}
            </div>
            <div className="col-6">
                <Chart
                    options={{}}
                    type="candlestick"
                    series={[{
                        data: chartData
                    }]}
                />
            </div>
            <div className={"col " + (change >= 0 ? 'bg-success' : 'bg-danger') + " m-1 text-center text-white"}>
                {price}
            </div>

        </div>);
}

export default Stock;