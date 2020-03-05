import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '../models/query';
import { User } from '../models/user';
import { FlightFilter } from '../models/flightfilter';
import { HotelFilter } from '../models/hotelfilter';
import { Hotel } from '../models/hotel';
import { Entertainment } from '../models/entertainment';
import { Flight } from '../models/flight';
import { Train } from '../models/train';
import { Trip } from '../models/trip';

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
  createFlight(f: Flight,rfrom:string[],rfromc:string[],rto:string[],rtocode:string[],tdur:number[],fdur:number[],types:string[],names:string[]):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation InserFlight($a: Int,$f: Int,$t:Int, $dur:Int,$p:Int,$rfrom:[String],$rfromc:[String],$rto:[String],$rtoc:[String],$fdur:[Int],$tdur:[Int],$types:[String],$names:[String]){
        createflight(airline_refer: $a, from_refer: $f , to_refer: $t, duration: $dur,price: $p,rfrom: $rfrom, rfromcode:$rfromc, rto:$rto, rtocode: $rtoc, fdurations:$fdur,tdurations:$tdur,types:$types,names:$names)
          
      }`,
        variables:{
          "a": f.airline.id,
          "f": f.from.id,
          "t": f.to.id,
          "dur": f.duration,
          "p": f.price,
          "rfrom": rfrom,
          "rfromc": rfromc,
          "rto": rto,
          "rtoc": rtocode,
          "tdur": tdur,
          "fdur": fdur,
          "types": types,
          "names": names,
        }
    })
  }
  updateFlight(id:number,f: Flight):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateFlight($id: Int,$a: Int,$f: Int,$t:Int, $dur:Int,$p:Int){
        updateflight(id:$id ,airline_refer: $a, from_refer: $f , to_refer: $t, duration: $dur,price: $p)
          
      }`,
        variables:{
          "id":id,
          "a": f.airline.id,
          "f": f.from.id,
          "t": f.to.id,
          "dur": f.duration,
          "p": f.price,
        }
    })
  }

  deleteFlight(id:number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation DeleteFlight($id:Int){
        deleteflight(id:$id)
      }`,
        variables:{
          "id":id,
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

  getFlight(id:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetFlight($id:Int){
        flight(id:$id){
          id,
          airline{
            id,
            name,
            image,
          },
          from{
            id,
            name,
            code,
            city,
            citycode,
            country,
            province
          },
          to{
            id,
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
        "id": id
      }
    })
  }

  getAllFlights():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query AllFlights{
        allflights{
          id,
          airline{
            id,
            name,
            image,
          },
          from{
            id,
            name,
            code,
            city,
            citycode,
            country,
            province
          },
          to{
            id,
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
      fetchPolicy:"no-cache"
    })
  }
  searchFlights(src: string, dst: string):Observable<Query>{
    console.log(src+" "+dst)
    return this.apollo.query<Query>({
      query: gql`
      query SearchFlight($src: String, $dst: String){
        searchflight(source:$src,destination:$dst){
          id,
          airline{
            id,
            name,
            image,
          },
          from{
            id,
            name,
            code,
            city,
            citycode,
            country,
            province
          },
          to{
            id,
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

  getAllHotels():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetAllHotels{
          allhotels{
            id,
            name,
            image,
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
        fetchPolicy:"no-cache",
    })
  }

  getHotel(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetHotel($id: Int){
          hotel(id: $id){
            id,
            name,
            image,
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
          "id":id
        }
    })
  }
  searchHotels(cty: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query SearchHotel($cty: String){
          searchhotel(city:$cty){
            id,
            name,
            image,
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
            id,
            name,
            image,
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
            id,
            name,
            image,
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

  createHotel(hotel:Hotel,fac: boolean[]){
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateHotel($n: String, $a: String, $img: String, $ar: String, $ci: String, $pr: String,$lat: Float,$lng: Float, $rat: Float,$fac: [Boolean]){
        createhotel(name:$n, address: $a, image: $img, area: $ar, city:$ci, province: $pr, latitude: $lat, longitude:$lng,rating: $rat, facilities:$fac)
      }`,
      variables:{
        "n": hotel.name,
        "a": hotel.address,
        "img": hotel.image,
        "ar": hotel.area,
        "ci": hotel.city,
        "pr": hotel.province,
        "rat": hotel.rating,
        "lat": hotel.latitude,
        "lng": hotel.longitude,
        "fac": fac
      }
    })
  }
  updateHotel(id:number, hotel:Hotel,fac: boolean[]){
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateHotel($id: Int, $n: String, $a: String, $img: String, $ar: String, $ci: String, $pr: String,$lat: Float,$lng: Float, $rat: Float,$fac: [Boolean]){
        updatehotel(id: $id,name:$n, address: $a, image: $img, area: $ar, city:$ci, province: $pr, latitude: $lat, longitude:$lng,rating: $rat, facilities:$fac)
      }`,
      variables:{
        "id": id,
        "n": hotel.name,
        "a": hotel.address,
        "img": hotel.image,
        "ar": hotel.area,
        "ci": hotel.city,
        "pr": hotel.province,
        "rat": hotel.rating,
        "lat": hotel.latitude,
        "lng": hotel.longitude,
        "fac": fac
      }
    })
  }

  deleteHotel(id:number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation DeleteHotel($id:Int){
        deletehotel(id:$id)
      }`,
      variables:{
        "id": id,
      }
    })
  }

  getStations():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetStations{
          stations{
            id,
            name,
            code,
            city
          }
        }`,
    })
  }

  getAllTrips():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetAllTrips{
        alltrips{
          id,
          train{
            id,
            name,
            code,
            class,
            subclass
          }
          from{
            id,
            city,
            name,
            code,
          },
          to{
            id,
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
      fetchPolicy: "no-cache",
    })
  }

  getTrip(id:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetTrip($id:Int){
        trip(id:$id){
          id,
          train{
            id,
            name,
            code,
            class,
            subclass
          }
          from{
            id,
            city,
            name,
            code,
          },
          to{
            id,
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
        "id":id
      }
    })
  }
  searchTrips(src: string, dst: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query SearchTrip($src: String,$dst: String){
        searchtrip(source:$src,destination:$dst){
          id,
          train{
            id,
            name,
            code,
            class,
            subclass
          }
          from{
            id,
            city,
            name,
            code,
          },
          to{
            id,
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

  createTrip(t:Trip){
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateTrip($train: Int,$from: Int, $to: Int, $duration:Int,$price: Int){
        createtrip(train_refer:$train,from_refer:$from, to_refer:$to,duration:$duration, price:$price)
      }
      `,
      variables:{
        "train": t.train.id,
        "from": t.from.id,
        "to": t.to.id,
        "duration": t.duration,
        "price": t.price
      }
    })
  }

  updateTrip(id:number, t:Trip){
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateTrip($id:Int,$train: Int,$from: Int, $to: Int, $duration:Int,$price: Int){
        updatetrip(id:$id,train_refer:$train,from_refer:$from, to_refer:$to,duration:$duration, price:$price)
      }
      `,
      variables:{
        "id":id,
        "train": t.train.id,
        "from": t.from.id,
        "to": t.to.id,
        "duration": t.duration,
        "price": t.price
      }
    })
  }

  deleteTrip(id:number){
    return this.apollo.mutate({
      mutation: gql`
      mutation DeleteTrip($id: Int){
        deletetrip(id:$id)
      }
      `,
      variables:{
        "id":id
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

  getEntertainment(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetEntertainment($id:Int){
        entertainment(id:$id){
          id,
          name,
          image,
          type,
          address,
          needdate,
          tickets{
            name,
            price
          }
          longitude,
          latitude,
          description,
          terms,
        }
      }`,
      variables:{
        "id": id,
      }
    })
  }
  getAllEntertainment():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetAllEntertainment{
        allentertainments{
          id,
          name,
          image,
          type,
          address,
          needdate,
          tickets{
            name,
            price
          }
          longitude,
          latitude,
          description,
          terms,
        }
      }`,
      fetchPolicy: "no-cache"
    })
  }
  searchEntertainments(typ: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query SearchEntertainment($typ: String){
        searchentertainment(type: $typ){
          id,
          name,
          image,
          type,
          address,
          needdate,
          tickets{
            name,
            price
          }
          longitude,
          latitude,
          description,
          terms,
        }
      }`,
      variables:{
        "typ": typ
      }
    })
  }

  getTrendingEntertainment(typ: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetTrendingEntertainment($typ: String){
        trendingentertainment(type: $typ){
          id,
          name,
          image,
          type,
          address,
          needdate,
          tickets{
            name,
            price
          }
          longitude,
          latitude,
          description,
          terms,
        }
      }`,
      variables:{
        "typ": typ
      }
    })
  }

  getBestEntertainment():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetBestEntertainment{
        bestentertainment{
          id,
          name,
          image,
          type,
          address,
          needdate,
          tickets{
            name,
            price
          }
          longitude,
          latitude,
          description,
          terms,
        }
      }`,
    })
  }

  createEntertainment(ent:Entertainment,startdate: string, names:string[], prices:number[]):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateEntertainment($name: String,$startdate: String,$image: String, $addr: String, $typ: String, $lat: Float, $lng: Float,$description: String, $terms:String, $ticketname:[String],$ticketprice:[Int]){
        createentertainment(name:$name,startdate:$startdate,image: $image address:$addr, type:$typ, latitude:$lat,longitude:$lng,ticket_name:$ticketname,ticket_price: $ticketprice,description: $description,terms:$terms)

        
      }`,
      variables:{
        "name": ent.name,
        "startdate": startdate,
        "image": ent.image,
        "addr": ent.address,
        "typ": ent.type,
        "lat": ent.latitude,
        "lng": ent.longitude,
        "ticketname": names,
        "ticketprice": prices,
        "description": ent.description,
        "terms": ent.terms
      }
    })
  }

  updateEntertainment(id:number, ent:Entertainment,startdate: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateEntertainment($id:Int,$name: String,$startdate: String,$image: String, $addr: String, $typ: String, $lat: Float, $lng: Float,$description: String, $terms:String){
        updateentertainment(id:$id, name:$name,startdate:$startdate,image: $image address:$addr, type:$typ, latitude:$lat,longitude:$lng,description: $description,terms:$terms)

        
      }`,
      variables:{
        "id": ent.id,
        "name": ent.name,
        "startdate": startdate,
        "image": ent.image,
        "addr": ent.address,
        "typ": ent.type,
        "lat": ent.latitude,
        "lng": ent.longitude,
        "description": ent.description,
        "terms": ent.terms
      }
    })
  }

  

  deleteEntertainment(id:number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation DeleteEntertainment($id:Int){
        deleteentertainment(id:$id)
      }`,
      variables:{
        "id": id,
      }
    })
  }

  getAllBlogs():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetAllBlogs{
        allblogs{
          id,
          title,
          content,
          category,
          image
        }
      }`,
      fetchPolicy:"no-cache",
    })
  }

  getBlog(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetBlog($id: Int){
        blog(id: $id){
          id,
          title,
          category,
          content,
          image
        }
      }`,
      variables:{
        "id": id
      }
    })
  }

  getPopularBlogs():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetPopularBlogs{
        popularblogs{
          id,
          title,
          content,
          category,
          image
        }
      }`,
    })
  }

  getAllPromos():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetAllPromos{
        allpromos{
          id,
          title,
          content,
          image,
          code,
          description,
        }
      }`,
      fetchPolicy:"no-cache",
    })
  }

  getPromo(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetPromo($id: Int){
        promo(id: $id){
          id,
          title,
          content,
          image,
          code,
          description,
        }
      }`,
      variables:{
        "id": id
      }
    })
  }

  getOtherPromos(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetOtherPromos($id: Int){
        otherpromos(id: $id){
          id,
          title,
          content,
          image,
          code,
          description,
        }
      }`,
      variables:{
        "id": id
      }
    })
  }

  getAdmin(user: string, pass: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetAdmin($user: String, $pass: String){
        admin(username:$user, password: $pass){
          username,
          password
        }
      }`,
      variables:{
        "user": user,
        "pass": pass
      }
    })
  }


  deleteBlog(id:number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation DeleteBlog($id:Int){
        deleteblog(id:$id)
      }`,
      variables:{
        "id": id,
      }
    })
  }

  createBlog(title:string, category: string, content:string, image:string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateBlog($title: String,$category: String, $content: String, $image: String){
        createblog(title:$title,category: $category content:$content, image:$image){
          id
        }
      }`,
      variables:{
        "title": title,
        "category": category,
        "content": content,
        "image": image,
      }
    })
  }

  updateBlog(id:number, title:string, category: string, content:string, image:string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateBlog($id: Int, $title: String,$category: String, $content: String, $image: String){
        updateblog(id:$id,title:$title,category: $category content:$content, image:$image)
      }`,
      variables:{
        "id": id,
        "title": title,
        "category": category,
        "content": content,
        "image": image,
      }
    })
  }




 
}
