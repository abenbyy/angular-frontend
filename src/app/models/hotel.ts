import { HotelRoom } from './hotelroom'
import { HotelFacility } from './hotelfacility'
import { HotelReview } from './hotelreview'

export class Hotel {
    id: number
    name: string
    image: string
    address: string
    rating: number
    star: number
    locationrate: number
    cleanrate: number
    roomrate: number
    servicerate: number
    rooms: HotelRoom[]
    facilities: HotelFacility[]
    reviews: HotelReview[]
    area: string
    city: string
    province: string
    latitude: number
    longitude: number
    zoomlevel: number
}
