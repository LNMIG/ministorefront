import dotenv from 'dotenv'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import express from 'express'
import { readFileSync } from 'fs'
import { join } from 'path'
import { resolvers } from './src/resolvers/resolvers.js'
import seeder from './src/utils/seeder.js'

dotenv.config()
const isDev = process.env.NODE_ENV?.trim() !== 'production'
const app = express()
const port = process.env.PORT || 4000

const typeDefs = readFileSync( join( './', 'src/schema', 'schema.gql'),'utf-8' )

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    seeder()
    .then(() => {
        console.log('DB loaded successfully');
        console.log(`Server is listening at http://localhost:${port}/api`);
    })
    .catch(err => console.log('Error on loading DB', err))
})