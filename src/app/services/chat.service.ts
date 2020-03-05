import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { Query } from '../models/query';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  selectedImg:string
  readonly uri: string = "ws://localhost:4300";
  constructor(
    private apollo: Apollo,
  ) {
    this.socket=io(this.uri)
  }

  listen(e: string){
    return new Observable((subscribe)=>{
      this.socket.on(e,(data)=>{
        subscribe.next(data)
      })
    })
  }

  emit(e:string,data:any){
    this.socket.emit(e,data)
  }

  removeListener(e:string){
    this.socket.removeListener(e)
  }

  getAllChat(userid:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetAllChat($id:Int){
        allchat(userid: $id){
          id,
          user1,
          user2,
          content,
        }
      }`,
      variables:{
        "id":userid
      }
    })
  }

  getChat(id:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query GetChat($id:Int){
        chat(id: $id){
          id,
          user1,
          user2,
          content,
        }
      }`,
      variables:{
        "id":id
      },
      fetchPolicy: "no-cache"
    })
  }

  insertChat(user1: number, user2: number):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateChat($user1: Int, $user2: Int){
          createchat(user1: $user1, user2: $user2)
        }`,
        variables:{
         "user1": user1,
         "user2": user2,
        }
    })
  }

  updateChat(user1: number, content: string):Observable<any>{
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateChat($id: Int, $content: String){
          updatechat(id: $id, content: $content)
        }`,
        variables:{
         "id": user1,
         "content": content,
        }
    })
  }

}