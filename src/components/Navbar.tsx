import { BarChart3, Table2 } from "lucide-react";
import { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    function handleOnClickTransaction(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        navigate("/transaction-analysis");
    }

    function handleOnClickCustomerData(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        navigate("/");
    }
    return (
        <aside className="bg-mySecondary shadow-lg min-w-[10%] md:min-w-[15rem] font-semibold ">
            <h2 className="uppercase mt-[3rem] mb-3 text-center hidden md:block">overview</h2>
            <ul className=" space-y-1 mt-[5rem] md:m-0">
                {pathname === "/" ? (
                    <a
                        onClick={handleOnClickCustomerData}
                        className="md:disabled:none w-full "
                    >
                        <li className="flex py-4 items-center gap-3 ps-4 cursor-pointer bg-myPrimary">
                            <Table2 />
                            <span className="hidden md:block"> Customers data</span>
                        </li>
                    </a>
                ) : (
                    <a onClick={handleOnClickCustomerData}>
                        <li className="flex py-4 items-center gap-3 ps-4 cursor-pointer">
                            <Table2 />
                            <span className="hidden md:block"> Customers data</span>
                        </li>
                    </a>
                )}

                {pathname === "/transaction-analysis" ? (
                    <a onClick={handleOnClickTransaction}>
                        <li className="flex py-4 items-center gap-3 ps-4 cursor-pointer bg-myPrimary">
                            <BarChart3 />
                            <span className="hidden md:block"> Transaction analysis</span>
                        </li>
                    </a>
                ) : (
                    <a onClick={handleOnClickTransaction}>
                        <li className="flex py-4 items-center gap-3 ps-4 cursor-pointer">
                            <BarChart3 />
                            <span className="hidden md:block"> Transaction analysis</span>
                        </li>
                    </a>
                )}
            </ul>
        </aside>
    );
}
