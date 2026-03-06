import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import getBlogs from "./components/blogslist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Med Blog || Home",
  description: "A blog for getting latest updates on tech and fashion",
};

export default async function RootLayout ({ children }) {

   const articles  = await getBlogs()
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <Suspense fallback={<div>Loading...</div>} >
          <Nav />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
