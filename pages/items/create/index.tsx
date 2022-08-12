import type { NextPage } from "next";
import { useState } from "react";
import { Navbar, Footer } from "../../../components";

const CreateItemPage: NextPage = () => {
  const [checked, setChecked] = useState<boolean>(false);

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
            {checked ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Url Link</span>
                </label>
                <input
                  type="text"
                  placeholder="http://link.com/data.json"
                  className="input input-primary"
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
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-primary"
                    placeholder="description"
                    rows={4}
                  ></textarea>
                </div>
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
              </>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price in eth</span>
              </label>
              <input
                type="text"
                placeholder="price in eth"
                className="input input-primary"
              />
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItemPage;
