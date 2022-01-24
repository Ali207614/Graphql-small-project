import { ApolloServer, gql } from 'apollo-server'
import {
  	ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core"
import modules from './modules/index.js'

const server = new ApolloServer({ 
	modules: modules,
	plugins: [
   		ApolloServerPluginLandingPageGraphQLPlayground(),
  	],
})

server.listen(5000).then(({ url }) => console.log(url))