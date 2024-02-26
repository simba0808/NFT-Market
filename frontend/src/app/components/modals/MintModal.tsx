"use client"

import React, { useState } from "react";
import Image from "next/image";


import ModalCloseButton from "../buttons/ModalCloseButton";
import { NFTImageB } from "@/app/assets";

export default function MintModal({ handleCloseClick }: { handleCloseClick: ()=>void }) {

  const [NFTImage, setNFTImage] = useState<File | null>(null);
  const [NFTImagePreview, setNFTImagePreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(e.target.files && e.target.files.length > 0) {
      setNFTImage(e.target.files[0]);
      setNFTImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <dialog className="fixed left-0 top-0 w-full h-[100vh] bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="w-full sm:max-w-screen-xl flex flex-col items-end p-4">
        <ModalCloseButton onClick={handleCloseClick} />
        <div className="w-full  bg-white dark:bg-gray-700 text-gray-700 dark:text-white m-auto p-8 rounded-xl">
          <h1 className="block text-3xl font-bold pb-4">Create your own NFT</h1>
          <label
            htmlFor="dropzone-file"
            className="relative max-w-[400px] h-[200px] sm:h-[400px] mx-auto flex flex-col items-center justify-center border py-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparemt hover:bg-gray-800"
          >
            {
              NFTImage && 
                <Image
                  className="max-h-[200px] sm:max-h-[400px] mx-auto"
                  src={NFTImagePreview}
                  style={{objectFit: "contain"}}
                  width={400}
                  height={400}
                  alt="NFT Image"
                />
            }
            <div className="absolute flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 px-4 text-xl text-gray-500 text-center">
                Faça upload de sua imagem
              </p>
              <p className="text-md text-gray-500">( JPEG, PNG )</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <div className="max-w-xl mx-auto mt-6">
            <label htmlFor="title" className="block mb-4">
              <input required name="title" type="text" className="block w-full rounded-md px-3 py-2 text-black outline-none focus:ring-2" placeholder="Insert your NFT's title" /> 
            </label>

            <label htmlFor="description" className="block mb-4">
              <textarea className="block w-full min-h-40 p-2 rounded-md text-black outline-none" placeholder="Insert your NFT Description">

              </textarea>
            </label>
            <div className="flex justify-end">
              <button className="rounded-xl px-6 py-2 border-2 border-white">
                Mint
              </button>

            </div>
            </div>
          </div>
      </div>
    </dialog>
  );
}