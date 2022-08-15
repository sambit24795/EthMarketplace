import { withIronSession, Session } from "next-iron-session";
import * as util from "ethereumjs-util";
import contract from "../../public/contracts/EthMarket.json";
import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { EthMarketContract } from "../../types/ethMarketContract";

const networks = {
  "5777": "Ganache",
};

type Network = typeof networks;

const abi = contract.abi;
const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof Network;
export const contractAddress = contract["networks"][targetNetwork]["address"];

export function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "item-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}

export async function addressCheck(
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    const message = req.session.get("message-session");
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:7545"
    );
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    ) as unknown as EthMarketContract;

    let nonce: string | Buffer =
      "\x19Ethereum Signed Message:\n" +
      JSON.stringify(message).length +
      JSON.stringify(message);

    nonce = util.keccak(Buffer.from(nonce, "utf-8"));
    const { v, r, s } = util.fromRpcSig(req.body.signature);
    const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
    const addrBuffer = util.pubToAddress(pubKey);
    const address = util.bufferToHex(addrBuffer);

    if (address === req.body.address) {
      resolve("correct address");
    } else {
      reject("Incorrect address");
    }
  });
}