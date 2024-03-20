import { gql } from 'apollo-server'

const Order = gql`

type Order {
  _id: ID!
  user: User!
  products: [ProductOrder!]!
  order_date: String!
  status: OrderStatus!
  shipping_address: String!
  payment_method: String!
  payment_status: PaymentStatus!
  total: Float!
  createdAt: String!
  updatedAt: String!
}

type ProductOrder {
  pid: Product!
  qty: Int!
  color: Color
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELED
}

enum PaymentStatus {
  PAID
  PENDING
  FAILED
}

input OrderInput { 
  shipping_address: String!
}

input ProductOrderInput {
  pid: ID!
  qty: Int!
  color: ID
}

type Query {
  getOrder(orderId: ID!): Order
  getAllOrders: [Order!]!
}

type Mutation {
  createOrder(input: OrderInput!): String
  updateOrderStatus(orderId: ID!, newStatus: OrderStatus!): Order
  updateOrderPaymentStatus(orderId: ID!, newPaymentStatus: PaymentStatus!): Order
  deleteOrder(orderId: ID!): Order
}
`

export default Order
