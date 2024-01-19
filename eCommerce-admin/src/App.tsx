import DefaultLayout from '@/layout/DefaultLayout'
import { SignIn } from '@/pages'
import routes from '@/routes'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // let navigate = useNavigate()
  // useEffect(() => {
  //   // Kiểm tra xem có token trong localStorage không
  //   const access_token = JSON.parse(localStorage.getItem('userStore') || '{}').state.access_token

  //   if (!access_token) {
  //     // Nếu không có token, chuyển hướng đến trang login
  //     navigate('/auth/signin')
  //   }
  // }, [])
  return (
    <>
      <Routes>
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/' element={<DefaultLayout />}>
          {routes.map((routes, index) => {
            const { path, component: Component } = routes
            return <Route key={index} path={path} element={<Component />} />
          })}
        </Route>
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  )
}

export default App
