import "../globals.css";
import type { ReactNode } from "react";
import Navbar from "./components/navbar";

export const metadata = {
    title: "SI Lab",
    description: "Your app description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}