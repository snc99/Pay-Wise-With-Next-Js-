import { MdOutlineLogin } from "react-icons/md";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Dept from "./components/Debt/Debt";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Header from "./components/navbar/Header";
import Footer from "./components/footer/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Home />
      <About />
      <Dept />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
