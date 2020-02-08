import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'
const client = new PrismaClient()

export interface Context extends ContextParameters {
	client: PrismaClient
}

export function createContext(request: ContextParameters): Context {
	return {
		...request,
		client,
	}
}
