import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});


export const metadata = {
  title: "O.P.B-v1",
  description: "Generated by create next app",
};


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Welcome to my app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${poppins.className} overflow-x-hidden bg-white leading-none mx-auto container px-4 lg:px-0 min-h-screen text-slate-600 text-balance antialiased`}
      >
        <main className="min-h-[calc(100dvh-2rem)] flex flex-col">
          <Navbar/>
          {children}
        </main>
          <Footer/>
      </body>
    </html>
  );

}

