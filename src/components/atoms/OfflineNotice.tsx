import {useAppSelector} from "@/core/redux/hooks.ts";

export default function OfflineNotice() {
    const {offline} = useAppSelector(state => state.currency);

    if (offline) {
        return (
            <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
                You are offline — showing last cached rates.
            </div>
        )
    }

    return null
}