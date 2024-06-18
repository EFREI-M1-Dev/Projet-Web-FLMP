/* icons */
import House from './icons/House'
import Pad from './icons/Pad'
import Search from './icons/Search'

type IconMap = {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>
}

const icons: IconMap = {
  search: Search,
  house: House,
  pad: Pad,
}

export default icons
