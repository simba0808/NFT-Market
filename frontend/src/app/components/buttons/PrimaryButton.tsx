export default function PrimaryButton({ text }: { text: string}) {
  return (
    <a className="text-gray-800 dark:text-white hover:bg-[#DA8F4D] hover:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-[1px] border-[#DA8F4D] hover:border-none focus:outline-none hover:cursor-pointer">
      {
        text
      }
    </a>
  );
}