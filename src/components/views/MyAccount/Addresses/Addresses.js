import { AiFillEdit } from "react-icons/ai";
const addresses = [
  {
    firstLine: "107 Prospect Ave",
    sendLine: "Atlantic Highlands",
    city: "New Jersey(NJ)",
    state: "US",
    zip: "66608",
    phone: "(732) 872-4835",
  },
  {
    firstLine: "1204 NW Harrison St",
    sendLine: "Topeka",
    city: "Kansas(KS)",
    state: "US",
    zip: "66608",
    phone: "(785) 354-7844",
  },
  {
    firstLine: "107 Prospect Ave",
    sendLine: "Atlantic Highlands",
    city: "New Jersey(NJ)",
    state: "US",
    zip: "66608",
    phone: "(732) 872-4835",
  },
];

function AddressUnit({ address }) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-2 py-4 bg-gray-200 w-1/4 mx-2 rounded-lg">
      <div className="w-full">
        <div>{address.firstLine},</div>
        <div>{address.sendLine},</div>
        <div>{address.city}</div>
        <div>{address.state},</div>
        <div>{address.zip},</div>
        <div>{address.phone}</div>
      </div>
      <div className="py-3 flex items-center justify-end w-full">
        <button className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-md text-white font-bold">
          <span>
            <AiFillEdit />
          </span>
          <span className="ml-2">Edit</span>
        </button>
      </div>
    </div>
  );
}

export default function Address() {
  return (
    <div>
      <div className="text-center w-full py-4 text-3xl">
        <h1>My Addresses</h1>
      </div>
      <div className="w-full flex items-center justify-center">
        {addresses.map((address, i) => (
          <AddressUnit address={address} key={'address-' + i} />
        ))}
      </div>
    </div>
  );
}
