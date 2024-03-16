import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import 'aos/dist/aos.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
