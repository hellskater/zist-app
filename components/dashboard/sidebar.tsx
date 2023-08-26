import { BsCodeSlash } from 'react-icons/bs';
import { IoMdCreate } from 'react-icons/io';
// import { AiFillSetting } from 'react-icons/ai';
import Link from 'next/link';

const items = [
  {
    name: 'My Zists',
    Icon: <BsCodeSlash />,
    path: '/dashboard/my-zists',
  },
  {
    name: 'Create Zist',
    Icon: <IoMdCreate />,
    path: '/dashboard/create-zist',
  },
  // {
  //   name: 'Settings',
  //   Icon: <AiFillSetting />,
  //   path: '/dashboard/settings',
  // },
];
const Sidebar = () => {
  return (
    <div className="min-w-[13rem] max-w-[15rem] w-full py-2 bg-[#151718] rounded-2xl sticky overflow-hidden top-28 h-fit">
      {items.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className={`flex items-center justify-start px-4 py-3 cursor-pointer transition-all duration-300 hover:bg-[#262525] `}
        >
          <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-[#303030]">
            {item.Icon}
          </div>
          <div className="text-white">{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
