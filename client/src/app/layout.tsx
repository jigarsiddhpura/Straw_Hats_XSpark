import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ReactQueryClientProvider from "@/providers/QueryClientProvider";
import { UIProvider } from "@/providers/NextUIProvider";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import { Toaster } from 'react-hot-toast';

const font = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hackX",
  icons: { icon: "/favicon.ico" },
  //! Think of good description
  //! Also need a favicon
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nihil!`,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReactQueryClientProvider>
          <AuthSessionProvider>
            <UIProvider>
              <div className="min-h-screen container w-full antialiased">
              <Toaster />
                {children}
              </div>
            </UIProvider>
          </AuthSessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
