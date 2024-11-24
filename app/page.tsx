import { MdOutlineLogin } from "react-icons/md";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Dept from "./components/Debt/Debt";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";

export default function Page() {
  return (
    <main>
      <Home />
      <About />
      <Dept />
      <Services />
      <Contact />
    </main>
  );
}
