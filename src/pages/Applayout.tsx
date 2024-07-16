import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Applayout() {
    return (
        <main className="flex bg-myPrimary h-full  min-h-screen text-white">
            <Navbar />
            <section className="flex-1">
                <Outlet />
            </section>
        </main>
    );
}
