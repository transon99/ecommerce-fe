import { Brand, Category, Dashboard, Order, User } from '@/pages'
import Banner from '@/pages/Banner'
import Product from '@/pages/Product'

const coreRoutes = [
  {
    path: '/',
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/product',
    title: 'Product',
    component: Product
  },
  {
    path: '/category',
    title: 'Category',
    component: Category
  },
  {
    path: '/brand',
    title: 'Brand',
    component: Brand
  },
  {
    path: '/order',
    title: 'Order',
    component: Order
  },
  {
    path: '/user',
    title: 'User',
    component: User
  },
  {
    path: '/banner',
    title: 'Banner',
    component: Banner
  }
]

const routes = [...coreRoutes]
export default routes
