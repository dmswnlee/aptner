import Link from "next/link"
import Image from 'next/image';
import home from '@/assets/images/home.png';

const Home = () => {
  return (
    <>
      <div className="flex justify-center">
        <Image src={home} alt="home" className="w-[1920px] h-[1356px]"/> 
      </div>
    </>
  )
}

export default Home