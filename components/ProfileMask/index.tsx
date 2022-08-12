import { FunctionComponent } from "react";
import { Item } from "../../types/Item";
import Image from "next/image";

interface ProfileMaskProps {
  item: Item;
}

const ProfileMask: FunctionComponent<ProfileMaskProps> = ({ item }) => {
  return (
    <div className="flex items-center p-2">
      <div className="mask mask-parallelogram">
        <Image
          src={item.image}
          alt={item.name}
          priority
          layout="intrinsic"
          height={120}
          width={150}
        />
      </div>
      <div className="flex flex-col justify-center capitalize cursor-pointer text-custom-light-sky-blue">
        <span className="font-bold underline">{item.name}</span>
        <span>{item.rupee_price} &#8377;</span>
      </div>
    </div>
  );
};

export default ProfileMask;
