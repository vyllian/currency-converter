import Conversion from "@/components/organisms/Conversion.tsx";
import History from "@/components/molecules/History.tsx";
import OfflineNotice from "@/components/atoms/OfflineNotice.tsx";
import RateChart from "@/components/organisms/RateChart.tsx";
import Title from "@/components/atoms/Title.tsx";
import RateBoard from "@/components/organisms/RateBoard.tsx";

function App() {
    return (
        <div
            className="w-full h-[100vh] p-5 bg-emerald-100 grid grid-cols-3 grid-rows-2 gap-3"
        >
            <OfflineNotice/>
            <div
                className="col-start-1 col-end-3 row-start-1 row-end-2 section "
            >
                <Title>
                    Currency Converter
                    <sup className="pl-1 text-lg font-light text-gray-500">
                        by  European Central Bank
                    </sup>
                </Title>
               <Conversion/>
            </div>
            <div
                className="col-start-3 col-end-4 row-start-1 row-end-2 section"
            >
                <Title>
                    Rate Board
                </Title>
                <RateBoard/>
            </div>
            <div
                className="col-start-1 col-end-2 row-start-2 row-end-3 section justify-start"
            >
                <Title>
                    Recent conversions
                </Title>
                <History/>
            </div>
            <div
                className="col-start-2 col-end-4 row-start-2 row-end-3 section "
            >
                <Title>
                    Rate chart
                </Title>
                <RateChart/>
            </div>
        </div>
    )
}

export default App;