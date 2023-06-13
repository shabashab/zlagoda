import { Profile } from './profile.model'

export interface User {
  id: number
  email: string
  isVerified: boolean
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
  withdrawBalance: number
  isActivityCheckComplete: boolean

  profile?: Profile
}
