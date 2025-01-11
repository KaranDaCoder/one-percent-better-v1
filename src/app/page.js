'use client'
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ['latin'], // Include the Latin character set
  weight: ['400', '700'], // Choose the desired font weights (e.g., regular and bold)
});

export default function Home() {
  return (
    <main className="bg-inherit lg:p-0">
      <p>home page</p>
    </main>
  );
}
