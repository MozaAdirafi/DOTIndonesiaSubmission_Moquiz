import { Outlet } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <header className='app-header'>
          <h1>Mo<span>Quiz</span></h1>
      </header>
      <Outlet/>
    </>
  )
}
