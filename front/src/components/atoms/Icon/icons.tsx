/* icons */
import House from './icons/House'
import Pad from './icons/Pad'
import Search from './icons/Search'
import Send from "./icons/Send";
import ArrowBottom from "./icons/ArrowBottom.tsx";
import Emote from "./icons/Emote.tsx";
import Camera from "./icons/Camera.tsx";
import Phone from "./icons/Phone.tsx";
import Video from "./icons/Video.tsx";
import FileUpload from "./icons/FileUpload.tsx";
import User from "./icons/User.tsx";

type IconMap = {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>
}

const icons: IconMap = {
  search: Search,
  house: House,
  pad: Pad,
  send: Send,
  emote: Emote,
  arrowBottom: ArrowBottom,
  camera: Camera,
  phone: Phone,
  video: Video,
  user: User,
  upload: FileUpload,
}

export default icons
