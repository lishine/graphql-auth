import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'
const photon = new PrismaClient()

export interface Context {
	photon: PrismaClient
	request: any
}

export function createContext(request: ContextParameters): Context {
	return {
		...request,
		photon,
	}
}
