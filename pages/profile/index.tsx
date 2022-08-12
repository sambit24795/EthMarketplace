/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { Navbar, Footer, CardList } from "../../components";

import items from "../../content/meta.json";

const ProfilePage: NextPage = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_repeat(3, 1fr)_auto] auto-cols-auto">
      <Navbar />
      <div className="flex items-center justify-start p-16 h-44 bg-custom-muted-sky-blue text-7xl text-secondary bg-gradient-to-b from-primary to-base-100 ">
        My Items
      </div>
      <div className="grid overflow-hidden py-14 gap-y-10 sm:grid-cols-1 md:grid-cols-3 justify-items-center auto-rows-auto">
        <CardList items={items} />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
