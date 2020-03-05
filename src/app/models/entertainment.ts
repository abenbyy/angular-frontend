import { EntertainmentTicket } from './entertainmentticket'

export class Entertainment {
    id: number
    name : string
    image : string
    type : string
    address : string
    needdate: boolean
    tickets : EntertainmentTicket[]
    latitude : number
    longitude : number
    description: string
    terms: string
}
