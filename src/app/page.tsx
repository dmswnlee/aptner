import Image from 'next/image';
import home from '@/assets/images/home.png';

const Home = () => {
  return (
    <>
      <div className="flex justify-center">
        <Image src={home} alt="home" className="w-full h-full"/> 
      </div>
    </>
  )
}

export default Home