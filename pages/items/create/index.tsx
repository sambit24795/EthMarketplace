import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Navbar, Footer } from "../../../components";
import { Item, PinataResponse } from "../../../types/Item";
import { useWeb3 } from "../../../providers/web3/index";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const CreateItemPage: NextPage = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [name, setName] = useState<Item["meta"]["name"]>("");
  const [description, setDescription] =
    useState<Item["meta"]["description"]>("");
  const [image, setImage] = useState<Item["meta"]["image"]>("");
  const [price, setPrice] = useState<Item["meta"]["eth_price"]>();
  const [rPrice, setRprice] = useState<Item["meta"]["rupee_price"]>();
  const [dataUrl, setDataUrl] = useState<string>("");

  const { ethereum, contract } = useWeb3();

  const router = useRouter();

  const getSignedData = async () => {
    const messageToSign = await axios.get("/api/verify");
    const accounts = (await ethereum?.request({
      method: "eth_requestAccounts",
    })) as Array<string>;
    const account = accounts[0];
    const signedData = await ethereum?.request({
      method: "personal_sign",
      params: [
        JSON.stringify(messageToSign.data),
        account,
        messageToSign.data.id,
      ],
    });
    return { signedData, account };
  };

  const createItem = async () => {
    if (dataUrl) {
      const tx = await contract?.mintToken(
        dataUrl,
        ethers.utils.parseEther(String(price!)),
        {
          value: ethers.utils.parseEther("0.025"),
        }
      );

      await tx?.wait();
      router.push("/profile");
    }

    try {
      const { signedData, account } = await getSignedData();

      const res = await axios.post("/api/verify", {
        address: account,
        signature: signedData,
        item: {
          name,
          description,
          image,
          price,
          rPrice,
        },
      });
      const data = res.data as PinataResponse;
      setDataUrl(
        `${process.env.NEXT_PUBLIC_PINATA_DOMAIN!}/ipfs/${data.IpfsHash}`
      );
      setChecked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const imageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) {
      console.error("select a file");
      return;
    }

    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    try {
      const { signedData, account } = await getSignedData();

      const res = await axios.post("/api/verify-image", {
        address: account,
        signature: signedData,
        bytes,
        contentType: file.type,
        fileName: file.name.replace(/\.[^/.]+$/, ""),
      });
      const data = res.data as PinataResponse;
      setImage(
        `${process.env.NEXT_PUBLIC_PINATA_DOMAIN!}/ipfs/${data.IpfsHash}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_repeat(3, 1fr)_auto] auto-cols-auto">
      <Navbar />
      <div className="flex-col justify-around w-4/5 p-16 hero-content lg:flex-row-reverse justify-self-center">
        <div className="flex flex-col items-center justify-center text-center capitalize">
          <h1 className="text-5xl font-bold">Create Item now!</h1>
          <p className="py-2">This information will be public</p>
          <div className="flex-row form-control">
            <label className="cursor-pointer label">
              <span className="mr-2 label-text">I have metadata</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
          <div className="card-body">
            {checked || dataUrl ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Url Link</span>
                </label>
                <input
                  type="text"
                  placeholder="http://link.com/data.json"
                  className="input input-primary"
                  value={dataUrl}
                  onChange={(e) => setDataUrl(e.target.value)}
                />
              </div>
            ) : (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    className="input input-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-primary"
                    placeholder="description"
                    rows={3}
                    maxLength={50}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {image ? (
                  <div className="form-control">
                    <Image
                      src={image}
                      alt={name}
                      priority
                      layout="intrinsic"
                      height={320}
                      width={140}
                    />
                  </div>
                ) : (
                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md border-primary">
                      <div className="space-y-1 text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="#3ABFF8"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium text-indigo-600 bg-white border-none outline-none cursor-pointer"
                          >
                            <span className="font-bold underline">
                              Upload a file
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={imageHandler}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price in eth</span>
                  </label>
                  <input
                    type="text"
                    placeholder="price in eth"
                    className="input input-primary"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price in rupees</span>
                  </label>
                  <input
                    type="text"
                    placeholder="price in rupees"
                    className="input input-primary"
                    value={rPrice}
                    onChange={(e) => setRprice(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="mt-6 form-control">
              <button className="btn btn-primary" onClick={createItem}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItemPage;
