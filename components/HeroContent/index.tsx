import { useRouter } from "next/router";

const HeroContent = () => {
  const router = useRouter();

  return (
    <div className="flex-col w-4/5 p-16 justify-evenly hero-content lg:flex-row-reverse justify-self-center">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold capitalize">Add an item now!</h1>
        <p className="py-6 capitalize">
          You can add an item, set a price and sale it for some ethereum here.
        </p>
        <div
          className="btn btn-primary"
          onClick={() => router.push("/items/create")}
        >
          create item
        </div>
      </div>
      <div className="overflow-hidden shadow stats">
        <div className="shadow stat">
          <div className="capitalize stat-title">value in eth</div>
          <div className="stat-value text-secondary">1&eth;</div>
        </div>

        <div className="shadow stat">
          <div className="capitalize stat-title">value in rupees</div>
          <div className="stat-value text-secondary-focus">
            149768.47&#8377;
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
