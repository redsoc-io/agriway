import { BiRupee } from "react-icons/bi";
function Td({ children }) {
    return (
        <td className="border border-slate-300">
            <div>{children}</div>
        </td>
    );
}
function Th({ children }) {
    return (
        <td className="border border-slate-300 font-bold">
            <div>{children}</div>
        </td>
    );
}
export default function Myorder() {
    return (
        <>
            <div className="w-full">
                <div>
                    <h1 className="flex items-center justify-center text-3xl py-5">
                        My Orders
                    </h1>
                </div>
                <div className="w-full">
                    <table className="w-full border-separate border border-slate-400 ">
                        <thead>
                            <tr>
                                <Th>Item Name</Th>
                                <Th>Price </Th>
                                <Th>Date </Th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Td>Tomato</Td>
                                <Td>
                                    <span className="flex items-center justify-center">
                                        <BiRupee />
                                        30
                                    </span>
                                </Td>
                                <Td>22/01/2022</Td>

                            </tr>
                            <tr>
                                <Td>Green Chilly</Td>
                                <Td>
                                    <span className="flex items-center justify-center">
                                        <BiRupee />
                                        30
                                    </span>
                                </Td>
                                <Td>30/01/2022</Td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    );
}
