import { StartScreen } from '../components/StartScreen'
import ThemeToggleButton from '../components/ThemeToggleButton'
const Main = () => {
  return (
    <main className='main'>
      <ThemeToggleButton />
      <StartScreen/>
    </main>
  )
}

export default Main
