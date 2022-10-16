import { mutations } from '../mutations/mutations.js'
import { queries } from '../queries/queries.js'

export const resolvers =
{
    Query: queries,
    Mutation: mutations,
}