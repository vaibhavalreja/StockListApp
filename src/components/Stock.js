import React from "react";
import Chart from 'react-apexcharts';
import ReactPlaceholder from "react-placeholder/lib";
import useChartData from "../hooks/useChartData";
import REQUEST_STATUS from '../Utils/requestStatus'

function Stock({ id, name, price, change }) {
    const { chartData, requestStatus } = useChartData(id)

    return (
        <div className="row">
            <div className="col bg-primary m-1 text-center text-white">
                {name}
            </div>
            <ReactPlaceholder
                rows={10}
                type="media"
                className="col m-1"
                ready={requestStatus === REQUEST_STATUS.SUCCESS}>
                <div className="col-6">
                    <Chart
                        options={{}}
                        type="candlestick"
                        series={[{
                            data: chartData
                        }]}
                    />
                </div>
            </ReactPlaceholder>
            <div className={"col " + (change >= 0 ? 'bg-success' : 'bg-danger') + " m-1 text-center text-white"}>
                {price}
            </div>

        </div>);
}

export default Stock;