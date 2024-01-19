'use client'

import brandApi from '@/apis/brandApi'
import categoryApi from '@/apis/categoryApi'
import productApi from '@/apis/productApi'
import { CardItem, ListBox } from '@/components'
import { AddProductDialog } from '@/components/Dialog'
import PaginationComponent from '@/components/Pagination'
import Search from '@/components/Search'
import { CustomButton } from '@/components/common'
import { Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const Product = () => {
  const { handleSubmit, control } = useForm()
  const [categoryId, setCategoryId] = useState<string>('')
  const [page, setPage] = useState(1)
  const [brandId, setBrandId] = useState<string>('')

  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [products, setProducts] = useState<Product[]>([])
  console.log('====> producs', products)

  useEffect(() => {
    const fetchData = async () => {
      const param = {
        searchText: '',
        offset: 0,
        pageSize: 5,
        sortStr: ''
      }
      try {
        const categoriesEesponse = await categoryApi.getAll()
        setCategories(categoriesEesponse.data)
        const brandResponse = await brandApi.getAll()
        setBrands(brandResponse.data)
        const productResponse = await productApi.getByConditionAndPagination(param)
        setProducts(productResponse.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleFilter = async (data: any) => {
    setCategoryId(data.category)
    setBrandId(data.brand)
    const param = {
      categoryId: data?.category,
      brandId: data?.brand,
      offset: 0,
      pageSize: 5,
      sortStr: ''
    }
    const response = await productApi.filterProduct(param)
    console.log(response)
    setProducts(response.data)
  }

  const currentCategory = categories.find((c) => c.id === categoryId)
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value)
    setPage(value)
  }
  return (
    <div className='h-[calc(100vh-88px)] overflow-auto'>
      <div
        className='card no-hover flex flex-col gap-5 !p-5 md:!p-[26px] lg:!py-5 lg:flex-row
    lg:items-center lg:gap-4 '
      >
        <h1 className='text-primary flex-1 text-center lg:text-left text-4xl font-bold bg-[#171F29] rounded-lg !p-5 md:!p-[26px] lg:!py-5'>
          Products Management
        </h1>
      </div>
      <div className='flex flex-col-reverse gap-4  md:flex-col lg:flex-row lg:justify-between p-5 pt-0'>
        <Flex direction={'column'} gap={'3'}>
          <AddProductDialog varient='ADD' categoriesData={categories} brandsData={brands} />
        </Flex>
        <div className='relative lg:w-[326px]'>
          <Search placeholder='Search Product ...' />
        </div>
      </div>
      <div className='flex flex-col flex-1 p-5 text-primary'>
        <div className='flex flex-wrap gap-2 mb-4 items-center justify-between'>
          <Text>
            Products:{' '}
            <Text weight={'bold'}>
              All <Text weight={'light'}>(16)</Text>
            </Text>
          </Text>
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <Flex
            align={'center'}
            gap={'3'}
            className=' bg-secondary card !p-5  items-center gap-4 min-w-[218px] rounded-xl'
          >
            {categoryId ? (
              <>
                <div className='p-1 bg-[#263E7B] rounded-lg w-6 h-6'>
                  <img src={currentCategory?.iconUrl.thumbnailUrl} alt={currentCategory?.name} />
                </div>
                <Text as={'p'} size={'5'} weight={'bold'}>
                  {currentCategory?.name}
                </Text>
              </>
            ) : null}
          </Flex>
          <form
            className='flex xl:justify-center xl:items-center flex-col xl:flex-row gap-3'
            onSubmit={handleSubmit((data) => {
              handleFilter(data)
            })}
          >
            <Controller
              name='category'
              control={control}
              render={({ field }) => <ListBox field={field} data={categories} name='Category' />}
            />

            <Controller
              name='brand'
              control={control}
              render={({ field }) => <ListBox field={field} data={brands} name='Brand' />}
            />
            <CustomButton className='bg-[#263E7B] !cursor-pointer text-primary hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'>
              Search
            </CustomButton>
          </form>
        </div>
      </div>
      <div>
        {products.length == 0 ? (
          <p className='flex h-full justify-center items-center text-white font-bold'>DON'T HAVE ANY PRODUCT YET</p>
        ) : (
          <div>
            <div
              className='grid flex-1 items-start gap-[26px] mb-[30px] sm:  md:grid-cols-2
                 lg:grid-cols-3 2xl:grid-cols-4 p-5'
            >
              {products.map((product) => (
                <CardItem
                  categoriesData={categories}
                  brandsData={brands}
                  name={product.name}
                  priceUnit={product.priceUnit}
                  brand={product.brand}
                  category={product.category}
                  description={product.description}
                  discount={product.discount}
                  thumbnailUrls={product.thumbnailUrls}
                  quantity={product.quantity}
                  sku={product.sku}
                  key={product.id}
                />
              ))}
            </div>
            <div className='flex items-center justify-center'>
              <PaginationComponent count={10} page={page} handleChange={handlePagination} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
