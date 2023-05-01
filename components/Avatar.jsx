import { useAuth } from "@/contexts/Auth";


const Avatar = ({seed , large}) => {
  const { user } = useAuth();


  return <div className={` relative border-gray-200 bg-white rounded-full overflow-hidden ${large? 'w-20 h-20' : 'w-12 h-12'} `}>
<img src={"https://api.dicebear.com/6.x/open-peeps/svg?seed="  + (seed ||  user?.name ||  'placeholder')}  className="w-full " alt="" />
  </div>;
};

export default Avatar;
