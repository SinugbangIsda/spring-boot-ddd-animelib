import { 
  FiBookmark, 
  FiHome 
} from "react-icons/all";
import { LinkItemProps } from "../../../interfaces";

const LinkItems: Array<LinkItemProps> = [
  { 
    name: 'Dashboard', 
    icon: FiHome,
    to: '/'
  },
  { 
    name: 'Watchlist', 
    icon: FiBookmark,
    to: '/watchlist'
  },
];

export default LinkItems;
