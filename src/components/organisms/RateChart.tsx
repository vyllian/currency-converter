import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid} from "recharts";
import type {CurrencyChanges} from "@/core/type/currency";
import {useEffect, useState} from "react";
import {fetchCurrencyData} from "@/api/fetchCurrencyData.ts";
import {useAppSelector} from "@/core/redux/hooks.ts";

function RateChart() {
    const [data, setData] = useState<CurrencyChanges>();

    const {base, target} = useAppSelector(state => state.currency);

    useEffect(() => {
        const loadData = async () => {
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);
            setData(await fetchCurrencyData(sevenDaysAgo, base, target))
        }

        loadData();
    }, [base, target]);

    if (!data || !data.rates) {
        return <p>Can't load the chart</p>
    }

    const chartData = Object.entries(data.rates)
        .map(([date, currencies]) => ({
            date,
            rate: currencies[target] ?? 0,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <LineChart width="90%" height="100%" margin={{right: 20, top: 10}} data={chartData} >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
                dataKey="date"
                tickFormatter={date => new Date(date).toLocaleDateString().slice(0, 5)}
                tick={{fontSize: 14}}
                interval={0}
            />
            <YAxis
                domain={[
                    (dataMin: number) => Math.floor(dataMin * 0.95),
                    (dataMax: number) => Math.ceil(dataMax * 1.05)
                ]}
            />
            <Tooltip/>
            <Line type="monotone" dataKey="rate" stroke="oklch(37.8% 0.077 168.94)" animationDuration={1000}/>
        </LineChart>
    )
}

export default RateChart;