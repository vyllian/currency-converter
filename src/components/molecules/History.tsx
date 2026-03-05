import {useAppSelector} from "@/core/redux/hooks.ts";
import { FaArrowsAltH } from "react-icons/fa";
import gsap from "gsap";
import {useEffect, useRef} from "react";

function History() {
    const {history} = useAppSelector(state => state.currency);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!listRef.current) return

        const items = Array.from(listRef.current.children) as HTMLElement[]
        gsap.fromTo(
            items,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
            }
        )
    }, [history]);

    return (
        <ul
            ref={listRef}
            className="w-full h-full p-2 space-y-2 overflow-y-auto"
        >
            {history.length === 0 ?
                <p
                    className="text-gray-500"
                >
                    No recent data
                </p>
                :
                history.map((item, index) => (
                    <li
                        key={index}
                        className="w-full flex justify-between items-center p-3 bg-emerald-50 shadow-sm rounded-lg"
                    >
                        <div
                            className="flex justify-center items-center gap-2"
                        >
                            <span className="font-medium">
                                {item.amount} {item.base}
                            </span>
                            <FaArrowsAltH/>
                            <span className="font-medium">
                                {item.result.toFixed(2)} {item.target}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleTimeString().slice(0, 5)}
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}

export default History;