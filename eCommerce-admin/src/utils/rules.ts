import { RegisterOptions } from 'react-hook-form'

type Rules = {
  [key in
    | 'productName'
    | 'price'
    | 'quantity'
    | 'discount'
    | 'categoryName'
    | 'brandName'
    | 'bannerName']?: RegisterOptions
}

export const rules: Rules = {
  productName: {
    required: {
      value: true,
      message: 'product name is required'
    }
  },
  categoryName: {
    required: {
      value: true,
      message: 'category name is required'
    }
  },
  brandName: {
    required: {
      value: true,
      message: 'brand name is required'
    }
  },
  bannerName: {
    required: {
      value: true,
      message: 'brand name is required'
    }
  },
  price: {
    required: {
      value: true,
      message: 'price is required'
    }
  },
  quantity: {
    required: {
      value: true,
      message: 'quantity is required'
    },
    min: {
      value: 1,
      message: 'quantity must be greater than 1'
    }
  }
}
