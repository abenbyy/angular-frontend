import { Airport } from './airport';
import { Airline } from './airline';
import { FlightFacility } from './flightfacility';
import { FlightRoute } from './flightroute';

export class Flight {

    airline  : Airline
    from     : Airport
    to       : Airport
    departure: Date
    arrival  : Date
    price    : number
    duration : number
    facilities: FlightFacility[]
    routes  : FlightRoute[]
}
