import z from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  admin: z.boolean().default(false),
  roomId: z.uuid(),
})
export type User = z.infer<typeof UserSchema>

export const VoteSchema = z.object({
  userId: UserSchema.shape.id,
  option: z.string()
})
export type Vote = z.infer<typeof VoteSchema>

export const RoomSchema = z.object({
  id: z.uuid(),
  title: z.string().min(3).max(50),
  votes: z.array(z.object({ userId: z.string(), option: z.string() })).default([]),
  users: z.array(UserSchema).default([]),
})
export type Room = z.infer<typeof RoomSchema>
