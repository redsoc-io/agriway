import Accounthelp from "./AccountHelpUnits";
import { FaUser } from "react-icons/fa";
import { GiStarFormation, GiWallet } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { MdPayment } from "react-icons/md";
import { BiCog } from "react-icons/bi";

export default function MyAccount() {
  return (
    <div className="w-full">
      <h1 className="flex items-center justify-center text-3xl py-5">
        My Account
      </h1>
      <div className="flex px-2 py-4 w-full">
        <Accounthelp
          size="w-1/3"
          icon={<FaUser />}
          help="My Profile"
          url={"/account/profile"}
        />
        <Accounthelp
          size="w-1/3"
          icon={<GiStarFormation />}
          help="Premium"
          url={"/account/premium"}
        />
        <Accounthelp
          size="w-1/3"
          icon={<GoLocation />}
          help="Your Address"
          url={"/account/addresses"}
        />
      </div>
      <div className="flex px-2 py-4 w-full">
        <Accounthelp size="w-1/3" icon={<MdPayment />} help="Payment Mode" />
        <Accounthelp
          size="w-1/3"
          icon={<GiWallet />}
          help="Wallet"
          url={"/account/wallet"}
        />
        <Accounthelp size="w-1/3" icon={<BiCog />} help="Settings" url={"/account/settings"} />
      </div>
    </div>
  );
}
