import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '../models/query';
import { User } from '../models/user';

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
          duration
        }
      }`,
      variables:{
        "src": src,
        "dst": dst,
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

}
