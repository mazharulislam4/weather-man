import Provider from "@/Provider";
import Sidebar from "@/components/sidebar/sidebar";
import "@/globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Weather Man",
  description: "Get weather information from prompt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <NextTopLoader showSpinner={false} />
        <Provider>
          <div className="flex w-full h-full ">
            <Sidebar />
            <main className=" relative  flex-1  flex-shrink-0 h-screen  overflow-hidden max-w-full w-full ">
              {children}
            </main>
          </div>
        </Provider>

        <ToastContainer />
      </body>
    </html>
  );
}
