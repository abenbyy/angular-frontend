import { HotelRoom } from './hotelroom'
import { HotelFacility } from './hotelfacility'

export class Hotel {
    name: string
    address: string
    rating: number
    star: number
    locationrate: number
    cleanrate: number
    roomrate: number
    servicerate: number
    rooms: HotelRoom[]
    facilities: HotelFacility[]
    city: string
    province: string
    latitude: number
    longitude: number
    zoomlevel: number
}
