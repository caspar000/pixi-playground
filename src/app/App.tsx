import { Banner } from '@/components/Banner'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import PixiCanvas from '@/components/PixiCanvas'

const App = () => {
  return (
    <>
      <Banner />
      <Hero />
      <Header />
      <Container className="flex items-center justify-center py-10">
        <PixiCanvas />
      </Container>
    </>
  )
}

export default App
