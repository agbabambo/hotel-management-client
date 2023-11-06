// model Hotel {
//   id          String   @id @default(uuid())
//   name        String
//   description String
//   images      String[]
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   isArchived  Boolean  @default(false)
//   addressId String
//   address   Address @relation(fields: [addressId], references: [id])
//   rooms          Room[]
//   amenity_Hotels Amenity_Hotel[]
// }

import { Address } from './AddressModel'

export type Hotel = {
  id: string
  name: string
  description: string
  images: string[]
  address?: Address
}
