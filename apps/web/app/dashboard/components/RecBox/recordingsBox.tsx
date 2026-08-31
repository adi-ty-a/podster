"use client"
import { useEffect, useState } from "react"
import { RoomCard } from "./Roomcard"
import { RoomsWRecordings } from "../../page"
import axios from "axios"
type response = {
    status: boolean,
    message: string,
    error?: any,
    data?: any
}

export default function RecordingsBox() {

    const [roomsWithRecordings, setroomsWithRecordings] = useState<RoomsWRecordings[] | null>(null)
    const [isrecordings, setisrecordings] = useState(false);
    useEffect(() => {
        getRoomsWithRecordings()
    }, [])

    const getRoomsWithRecordings = async () => {
        try {
            const response: response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/rooms_w_recordings`, { withCredentials: true })
            if (response.data.status == true) {
                if (response.data.data) {
                    setroomsWithRecordings(response.data.data)
                    setisrecordings(true);
                } else {
                    setisrecordings(false);
                }
            }
        } catch (e) {
            setisrecordings(false);
            console.log(e);
        }
    }
    return <div>
    {isrecordings ? roomsWithRecordings?.map((item: RoomsWRecordings) => {
        return <RoomCard key={item.name} item={item} />
    }) : <div className="flex items-center justify-center size-full">No Recordings yet...</div>}
    </div>


}