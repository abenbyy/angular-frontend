import { Airport } from './airport';
import { Airline } from './airline';

export class Flight {

    airline  : Airline
    from     : Airport
    to       : Airport
    departure: Date
    arrival  : Date
    price    : number
    duration : number

}
