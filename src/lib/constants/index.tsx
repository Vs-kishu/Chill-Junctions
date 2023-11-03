import { FaBookmark, FaHome, FaImages } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
export const sidebarLinks = [
  {
    imgURL: <FaHome />,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: <FaImages />,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: <FaPeopleGroup />,
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: <FaBookmark />,
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: <MdOutlineAddPhotoAlternate />,
    route: '/create-post',
    label: 'Create Post',
  },
];

export const bottombarLinks = [
  {
    imgURL: <FaHome />,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: <FaImages />,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: <FaBookmark />,
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: <MdOutlineAddPhotoAlternate />,
    route: '/create-post',
    label: 'Create',
  },
];
