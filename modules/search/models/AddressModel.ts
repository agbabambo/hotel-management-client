//  model Address {
//   id          String  @id @default(uuid())
//   contactName String?
//   phone       String
//   addressLine String
//   coordinate  String
//   ward        Int
//   district    Int
//   province    Int
//   // TODO: we need to expand
//   // country         Int?

//   hotels Hotel[]
// }

export type Address = {
  id: string
  contactName?: string
  phone: string
  addressLine: string
  coordinate: string
  ward: number
  district: number
  province: number
}
