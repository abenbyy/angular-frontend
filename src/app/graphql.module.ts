import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const secretKey = "c91c62f9c5318bb784acdd455a4b41b1"
const uri = 'http://localhost:2000/api/'+secretKey;

export function createApollo(httpLink: HttpLink){
    return{
        link: httpLink.create({uri}),
        cache: new InMemoryCache({
            dataIdFromObject: o => o.id
        }),
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})

export class GraphQLModule {}