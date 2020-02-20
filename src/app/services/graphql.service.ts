import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '../models/query';
import { User } from '../models/user';
import { FlightFilter } from '../models/flightfilter';
import { HotelFilter } from '../models/hotelfilter';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) {
    
   }

  searchUserByEmailorPhone(arg: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetUserByPhoneOrEmail($arg: String){
          userbyphoneoremail(arg:$arg){
            firstname,
            lastname,
            password,
            email,
            phone
          }
        }`,
        variables:{
          "arg": arg,
        }
    })
  }

  createUser(newUser: User):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateUser($firstname: String,$lastname: String, $password: String, $email: String, $phone: String,){
          createuser(firstname: $firstname, lastname: $lastname, password: $password, email: $email, phone: $phone){
            firstname,
            lastname,
            password,
            email,
            phone,
          }
        }`,
        variables:{
          "firstname":newUser.firstname,
          "lastname":newUser.lastname,
          "password":newUser.password,
          "email":newUser.email,
          "phone":newUser.phone,
        }
    })
  }

  getAirports():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetAirports{
          airports{
            name,
            code,
            city,
            citycode,
            province,
            country
          }
        }`,
    })
  }

  searchFlights(src: string, dst: string):Observable<Query>{
    console.log(src+" "+dst)
    return this.apollo.query<Query>({
      query: gql`
      query SearchFlight($src: String, $dst: String){
        searchflight(source:$src,destination:$dst){
          airline{
            name,
          },
          from{
            name,
            code,
            city,
            citycode,
            country,
            province
          },
          to{
            name,
            code,
            city,
            citycode,
            country,
            province
            
          },
          departure,
          arrival,
          price,
          duration,
          facilities{
            name,
          },
          routes{
            from,
            fromcode,
            to,
            tocode,
            flightduration,
            transitduration,
            aeroplanetype,
            aeroplanename,
          },
        }
      }`,
      variables:{
        "src": src,
        "dst": dst,
      }
    })
  }
  filterFlights(filters: FlightFilter):Observable<Query>{
    
    return this.apollo.query<Query>({
      query: gql`
        query FilterFlight($reqairlines: [String], $reqfacilities: [String], $reqdepartures: [Int], $reqarrivals: [Int], $reqduration: Int){
          filterflights(airlines:$reqairlines, facilities:$reqfacilities, departures:$reqdepartures, arrivals:$reqarrivals, duration:$reqduration){
            airline{
              name,
            },
            from{
              name,
              code,
              city,
              citycode,
              country,
              province
            },
            to{
              name,
              code,
              city,
              citycode,
              country,
              province
              
            },
            departure,
            arrival,
            price,
            duration,
            facilities{
              name,
            },
            routes{
              from,
              fromcode,
              to,
              tocode,
              flightduration,
              transitduration,
              aeroplanetype,
              aeroplanename,
            },
          }
        }
      `,
      variables:{
        "reqairlines": filters.airlines,
        "reqfacilities": filters.facilities,
        "reqdepartures": filters.departurehours,
        "reqarrivals": filters.arrivalhours,
        "reqduration": filters.hours
      }
    })
  }

  searchHotels(cty: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query SearchHotel($cty: String){
          searchhotel(city:$cty){
            name,
            address,
            rating,
            star,
            locationrate,
            cleanrate,
            roomrate,
            servicerate,
            rooms{
              name,
              maxguest,
              roomsize,
              beddetail,
              breakfast,
              wifi,
              freecancel,
              payathotel,
              price,
            }, 
            facilities{
              ac,
              parking,
              receptionist,
              pool,
              lift,
              restaurant,
              wifi,
              spa,
            },
            reviews{
              name,
              category,
              title,
              date,
              content,
              overall
            },
            area,
            city,
            province,
            latitude,
            longitude,
            zoomlevel,
          }
        }`,
      variables:{
        "cty": cty,
      }
    })
  }
  nearestHotels(lat, lng):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query NearestHotels($lat: Float,$lng: Float, $amount: Int){
          nearesthotel(lat:$lat, lng:$lng, amount:$amount){
            name,
            address,
            rating,
            star,
            locationrate,
            cleanrate,
            roomrate,
            servicerate,
            rooms{
              name,
              maxguest,
              roomsize,
              beddetail,
              breakfast,
              wifi,
              freecancel,
              payathotel,
              price,
            }, 
            facilities{
              ac,
              parking,
              receptionist,
              pool,
              lift,
              restaurant,
              wifi,
              spa,
            },
            reviews{
              name,
              category,
              title,
              date,
              content,
              overall,
            },
            area,
            city,
            province,
            latitude,
            longitude,
            zoomlevel,
          }
        }`,
      variables:{
        "lat": lat,
        "lng": lng,
        "amount": 8
      }
    })
  }
  filterHotels(filters: HotelFilter):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query FilterHotel($str: [Int]){
          filterhotel(stars:$str){
            name,
            address,
            rating,
            star,
            locationrate,
            cleanrate,
            roomrate,
            servicerate,
            rooms{
              name,
              maxguest,
              roomsize,
              beddetail,
              breakfast,
              wifi,
              freecancel,
              payathotel,
              price,
            }, 
            facilities{
              ac,
              parking,
              receptionist,
              pool,
              lift,
              restaurant,
              wifi,
              spa,
            },
            reviews{
              name,
              category,
              title,
              date,
              content,
              overall
            },
            area,
            city,
            province,
            latitude,
            longitude,
            zoomlevel,
          }
        }`,
      variables:{
        "str": filters.stars,
      }
    })
  }

  getStations():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetStations{
          stations{
            name,
            code,
            city
          }
        }`,
    })
  }
  searchTrips(src: string, dst: string):Observable<Query>{
    console.log(src+" "+dst)
    return this.apollo.query<Query>({
      query: gql`
      query SearchTrip($src: String,$dst: String){
        searchtrip(source:$src,destination:$dst){
          train{
            name,
            code,
            class,
            subclass
          }
          from{
            city,
            name,
            code,
          },
          to{
            city,
            name,
            code,
          },
          price,
          departure,
          arrival,
          duration,
          tax,
          service,
        }
      }`,
      variables:{
        "src": src,
        "dst": dst,
      }
    })
  }

  searchCars(cty: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query SearchCar($cty: String){
        searchcar(city:$cty){
          brand,
          model,
          luggage,
          passenger,
          vendors{
            name,
            price,
            city,
          }
        }
      }`,
      variables:{
        "cty": cty
      }
    })
  }

}
