import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
	definition(t) {
		t.field('signup', {
			type: 'AuthPayload',
			args: {
				name: stringArg(),
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false }),
			},
			resolve: async (_parent, { name, email, password }, ctx) => {
				const hashedPassword = await hash(password, 10)
				const user = await ctx.client.user.create({
					data: {
						name,
						email,
						password: hashedPassword,
					},
				})
				return {
					token: sign({ userId: user.id }, APP_SECRET),
					user,
				}
			},
		})

		t.field('login', {
			type: 'AuthPayload',
			args: {
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false }),
			},
			resolve: async (_parent, { email, password }, context) => {
				const user = await context.client.user.findOne({
					where: {
						email,
					},
				})
				if (!user) {
					throw new Error(`No user found for email: ${email}`)
				}
				const passwordValid = await compare(password, user.password)
				if (!passwordValid) {
					throw new Error('Invalid password')
				}
				const token = sign({ userId: user.id }, APP_SECRET)
				return {
					token,
					user,
				}
			},
		})

		t.field('createDraft', {
			type: 'Post',
			args: {
				title: stringArg({ nullable: false }),
				content: stringArg(),
			},
			resolve: (parent, { title, content }, ctx) => {
				const userId = getUserId(ctx)
				return ctx.client.post.create({
					data: {
						title,
						content,
						published: false,
						author: { connect: { id: userId } },
					},
				})
			},
		})

		t.field('deletePost', {
			type: 'Post',
			nullable: true,
			args: { id: idArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.client.post.delete({
					where: {
						id,
					},
				})
			},
		})

		t.field('publish', {
			type: 'Post',
			nullable: true,
			args: { id: idArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.client.post.update({
					where: { id },
					data: { published: true },
				})
			},
		})
	},
})
