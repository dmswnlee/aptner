import Searchbar from "@/components/Searchbar"
import Navbar from "@/components/Navbar"

const Header = () => {
  return (
    <div className="flex-column w-full fixed top-0">
      <Searchbar />
      <Navbar />
    </div>
  )
}

export default Header