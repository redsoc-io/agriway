import { FaRupeeSign } from "react-icons/fa";
export default function Wallet() {
  return (
    <div className="w-full">
      <h1 className="flex items-center justify-center text-3xl py-5">Wallet</h1>
      <div className="w-full flex items-center justiy-center flex-col">
        <div className="flex px-2 py-4">
          <span className="text-7xl font-bold flex items-center justify-center">
            <FaRupeeSign /> 0
          </span>
        </div>
        <div>
          <h2>Feature coming soon</h2>
        </div>
      </div>
    </div>
  );
}
