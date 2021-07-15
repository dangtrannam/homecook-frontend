import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from "../../api";
import { Table } from "reactstrap";
//Line chart

export default function LineChart() {
    let [orders, setorders] = useState([]);
    const getOrders = async () => {
        await api.getSevenOrder().then((response) => {
            setorders(response);
        })
    };
    useEffect(() => {
        getOrders();
    })
    // let total=[];
    const Linedata = {
        labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: '# of Orders',
                data: [],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    // console.log(total);
    var count =0;
    return (
        <div className="chart">
            <div className="featuredItem">
                <Table dark striped>
                    <thead style={{ fontWeight: "bold" }}>
                        <tr style={{ fontSize: "10px" }}>
                            <th>#</th>
                            {/* <th style={{fontSize:"15px"}}>Receiver Name</th> */}
                            <th style={{fontSize:"15px"}}>Recevier Address</th>
                            <th style={{fontSize:"15px"}}>Receiver Phone</th>
                            <th style={{fontSize:"15px"}}>Status</th>
                            <th style={{fontSize:"15px"}}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => {
                                const {
                                    OrderID,
                                    Status,
                                    Total,
                                    ReceiverPhone,
                                    ReceiverAddress,
                                    ReceiverName,
                                } = order;
                                count +=1;
                                // total.push(order.Total);
                                return (
                                    <tr key={order.OrderID}>
                                        <td style={{fontSize:"15px"}} >{count}</td>
                                        {/* <td style={{fontSize:"15px"}}>{order.ReceiverName}</td> */}
                                        <td style={{fontSize:"15px"}}>{order.ReceiverPhone}</td>
                                        <td style={{fontSize:"15px"}}>{order.ReceiverAddress}</td>
                                        <td style={{fontSize:"15px"}}>{order.Status}</td>
                                        <td style={{fontSize:"15px"}}>${order.Total}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            {/* <h3>Sales Analytics</h3> */}
            <Line data={Linedata} options={options} />
            
        </div>
    )
}

