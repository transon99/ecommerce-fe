import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CustomButton } from '@/components/common'
import { useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import authApi from '@/apis/authApi'

type LoginForm = {
  email: string
  password: string
}

function SignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const setAccessToken = useUserStore((state) => state.setAccessToken)
  const setRefreshToken = useUserStore((state) => state.setRefreshToken)

  const { register, handleSubmit } = useForm<LoginForm>()

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true)
    const response = await authApi.login(data)
    console.log(response.data)
    setIsLoading(false)
    if (response.data.status === 'OK') {
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      // navigate('/')
    } else {
      console.log('error', response.message)
      toast.error(response.message)
    }
  }

  return (
    <div
      className='bg-no-repeat min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center bg-cover'
      style={{
        backgroundImage:
          'url("https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Pen0000000/phpQZlh1x.jpeg")'
      }}
    >
      <div className='w-full h-screen flex  justify-center items-center backdrop-brightness-50'>
        <div className=' px-6 py-4 sm:p-8 bg-white rounded-3xl'>
          <div className='flex justify-center'>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill='#9155FD'
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill='#ccc'
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill='#ccc'
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill='#ccc'
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill='#ccc'
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill='#fff'
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill='#fff'
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <div className='font-bold text-gray-600 text-2xl ml-4 mb-5'>ADMIN DASHBOARD</div>
          </div>
          <form className=' flex flex-col items-center' onSubmit={handleSubmit((data) => handleLogin(data))}>
            <h1 className='text-2xl xl:text-3xl font-extrabold text-gray-600'>Sign in</h1>
            <div className='w-full flex-1 mt-8'>
              <div className='mb-8 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Sign in with user name and password
                </div>
              </div>
              <div className='mx-auto max-w-lg'>
                <div className='mb-4'>
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    type='text'
                    placeholder='Email'
                    {...register('email')}
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                  />
                </div>
                <CustomButton disabled={isLoading}>Sign In</CustomButton>
                <div className='mt-4 flex justify-between items-center'>
                  <div className='mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]'></div>
                  <Link to='#!'>Forgot password?</Link>
                </div>

                <p className='mt-6 text-xs text-gray-600 text-center'>
                  I agree to abide by templatana's
                  <a href='#' className='border-b border-gray-500 border-dotted'>
                    Terms of Service
                  </a>
                  and its
                  <a href='#' className='border-b border-gray-500 border-dotted'>
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
