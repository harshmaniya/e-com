import { gql } from '@apollo/client'

export const GET_PRODUCT = gql`
query GetProduct($id: ID) {
    getProduct(_id: $id) {
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
  }
`

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts {
    getAllProducts {
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
  }
`

export const GET_ALL_CATEGORY = gql`
query GetAllCategories {
  getAllCategories {
    _id
    name
  }
}
`

export const GET_ALL_BRANDS = gql`
query GetAllBrands {
  getAllBrands {
    _id
    name
  }
}
`

export const GET_ALL_COLORS = gql`
query GetAllColors {
  getAllColors {
    _id
    name
    hexCode
  }
}
`