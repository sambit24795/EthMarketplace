import type { NextPage } from "next";
import { Layout } from "../components";
import { useWeb3 } from "../providers/web3";

const HomePage: NextPage = () => {
  const { isLoading, provider, contract } = useWeb3();

  console.log({ provider, contract });

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
