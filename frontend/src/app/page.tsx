import Image from "next/image";
import { NFT } from "./assets";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center text-white bg-cover bg-[url('./assets/images/Background.jpg')]">
      <div className="mt-10 lg:mt-40 mx-auto px-4 max-w-screen-xl flex lg:flex-row flex-col lg:justify-between gap-4">
        <div className="sm:w-[60%] sm:mt-10">
          <p className="text-2xl sm:text-[40px] lg:text-[60px] font-bold leading-[120%]">Create your own NFTs and enjoy in crypto world!</p>
          <p className="text-sm  sm:text-xl pt-6">Lorem ipsum dolor sit amet consectetur. Rhoncus massa suspendisse turpis sed viverra tempus tortor. Habitant accumsan sagittis in facilisi placerat ac. Laoreet scelerisque viverra viverra ornare fermentum faucibus sit purus volutpat. Egestas lectus ornare convallis ornare nullam enim neque.</p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#04111F] rounded-bl-[30%] rounded-tl-[10%] rounded-tr-[20%] rounded-br-xl p-2 pr-0 border-l-2 border-b-2 border-slate-600">
            <Image src={NFT} alt="nft" className="rounded-l-[30%] rounded-br-xl" priority />
          </div>
        </div>
      </div>
    </main>
  );
}
