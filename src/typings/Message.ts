import type { PrivateFriendMessage, PrivateGroupMessage, GroupMessage, Send } from 'node-napcat-ts'

export type Message = PrivateFriendMessage | PrivateGroupMessage | GroupMessage

export type EnhancedMessage = Message & {
  reply: (message: Send[keyof Send][]) => Promise<void>
}