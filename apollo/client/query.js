import { gql } from '@apollo/client'

// BRANDS //

export const GET_ALL_BRANDS = gql`
query GetAllBrands {
  getAllBrands {
    _id
    name
  }
}`

export const ADD_BRAND = gql`
mutation AddBrand($name: String!) {
  addBrand(name: $name) {
    _id
    name
  }
}`

export const UPDATE_BRAND = gql`
mutation UpdateBrand($id: ID!, $name: String!) {
  updateBrand(_id: $id, name: $name) {
    _id
    name
  }
}`

export const DELETE_BRAND = gql`
mutation DeleteBrand($id: ID!) {
  deleteBrand(_id: $id)
}`


// CATEGORIES //

export const GET_ALL_CATEGORIES = gql`
query GetAllCategories {
  getAllCategories {
    _id
    name
  }
}`

export const ADD_CATEGORY = gql`
mutation AddCategory($name: String!) {
  addCategory(name: $name) {
    _id
    name
  }
}`

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($id: ID!, $name: String!) {
  updateCategory(_id: $id, name: $name) {
    _id
    name
  }
}`

export const DELETE_CATEGORY = gql`
mutation DeleteCategory($id: ID!) {
  deleteCategory(_id: $id)
}`


// PRODUCTS //

export const GET_PRODUCT = gql`
query GetProduct($id: ID!) {
  getProduct(_id: $id) {
    _id
    name
    price
    description
    stock
    brand {
      name
    }
    category {
      name
    }
    sku
    colors {
      _id
      name
      hexCode
    }
    images
    freeShipping
  }
}`

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts($input: GetAllProductsInput) {
  getAllProducts(input: $input) {
    _id
    name
    price
    description
    stock
    brand {
      _id
      name
    }
    category {
      _id
      name
    }
    sku
    colors {
      _id
      name
      hexCode
    }
    images
    freeShipping
  }
}`

export const ADD_PRODUCT = gql`
mutation AddProduct($input: AddProductInput!) {
  addProduct(input: $input)
}`

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    _id
    name
    price
    description
    stock
    brand {
      _id
      name
    }
    category {
      _id
      name
    }
    sku
    colors {
      _id
      hexCode
      name
    }
    images
    freeShipping
  }
}`

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!) {
  deleteProduct(_id: $id)
}`


// COLORS //

export const GET_ALL_COLORS = gql`
query GetAllColors {
  getAllColors {
    _id
    name
    hexCode
  }
}`

// CART //

export const ADD_TO_CART = gql`
mutation AddToCart($input: CartProductInput!) {
  addToCart(input: $input)
}`

export const INCREASE_QTY = gql`
mutation IncreaseQty($id: ID!) {
  increaseQty(_id: $id)
}`

export const DECREASE_QTY = gql`
mutation DecreaseQty($id: ID!) {
  decreaseQty(_id: $id)
}`

export const REMOVE_FROM_CART = gql`
mutation RemoveFromCart($id: ID!) {
  removeFromCart(_id: $id)
}`

export const CLEAR_CART = gql`
mutation ClearCart {
  clearCart
}`

export const GET_CART = gql`
query GetCart {
  getCart {
    _id
    products {
      _id
      pid {
        _id
        images
        name
        price        
      }
      color {
        _id
        name
        hexCode
      }
      qty
    }
    user {
      _id
    }
    total
  }
}`


// ORDER //

export const CREATE_ORDER = gql`
mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input)
}`

export const GET_ORDER = gql`
query GetOrder($orderId: ID!) {
  getOrder(orderId: $orderId) {
    _id
    products {
      pid {
        _id
        name
        price
        images      
      }
      color {
        _id
        name
        hexCode
      }
      qty
    }
    order_date
    status
    shipping_address
    payment_method
    payment_status
    total
    createdAt
    updatedAt
  }
}`

export const GET_ALL_ORDERS = gql`
query GetAllOrders {
  getAllOrders {
    _id
    products {
      pid {
        _id
        name
        price
        images      
      }
      color {
        _id
        name
        hexCode
      }
      qty
    }
    order_date
    status
    shipping_address
    payment_method
    payment_status
    total
    createdAt
    updatedAt
  }
}`




// WISHLIST //

export const ADD_TO_WISHLIST = gql`
mutation AddToWishlist($productId: ID!) {
  addToWishlist(productId: $productId)
}`

export const REMOVE_FROM_WISHLIST = gql`
mutation RemoveFromWishlist($productId: ID!) {
  removeFromWishlist(productId: $productId)
}`

export const GET_WISHLIST = gql`
query GetWishlist {
  getWishlist {
    _id
    products {
      _id
      name
      price
      images      
    }
  }
}`


// AUTH //

export const LOGIN = gql`
mutation Login($input: login!) {
  login(input: $input) {
    email
    accessToken
  }
}`


// USER //

export const CREATE_USER = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input)
}`

export const GET_USER_PROFILE = gql`
query GetUserProfile {
  getUserProfile {
    _id
    name
    email
    password
    phone
    address
  }
}`

// checkout //

export const CREATE_CHECKOUT_SESSION = gql`
mutation CreateCheckoutSession {
  createCheckoutSession {
    sessionId
  }
}`