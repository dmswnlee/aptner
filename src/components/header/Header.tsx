import Searchbar from "@/components/header/Searchbar"
import Navbar from "@/components/header/Navbar"

const Header = () => {
  return (
    <div className="flex-column w-full fixed top-0">
      <Searchbar />
      <Navbar />
    </div>
  )
}

export default Header