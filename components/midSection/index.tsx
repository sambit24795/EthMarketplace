import CardList from "../cardList";
import Link from "next/link";

import items from "../../content/meta.json";

const MidSection = () => {
  return (
    <div className="grid gap-10 p-14 auto-cols-auto auto-rows-2 bg-custom-muted-sky-blue">
      <div className="flex items-center justify-center text-3xl font-extrabold underline capitalize transition cursor-pointer text-custom-light-sky-blue hover:text-base-100">
        <Link href="/items">See All</Link>
      </div>
      <div className="grid overflow-hidden sm:grid-cols-1 md:grid-cols-3 justify-items-center auto-rows-auto">
        <CardList items={items.slice(0, 3)} />
      </div>
    </div>
  );
};

export default MidSection;
