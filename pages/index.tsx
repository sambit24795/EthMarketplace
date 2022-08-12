import type { NextPage } from "next";
import { Layout } from "../components";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center capitalize hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            You can buy or sell anything you want in a decentralized way.
          </p>
          <button className="btn btn-primary">Get test Ethereum</button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
