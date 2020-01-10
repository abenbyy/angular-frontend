import { Train } from './train'
import { Station } from './station'

export class Trip {
    train    : Train
    from     : Station
    to       : Station
    departure: Date
    arrival  : Date
    price    : number
    duration : number
}
