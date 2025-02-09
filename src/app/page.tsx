
import Contact from "./components/Contact";
import FlowtingNavbar from "./components/FlowtingNavbar";
import Introduction from "./components/Introduction";
import Projects from "./components/Projects";
import { Technologies } from "./components/Technologies";
import { Welcome } from "./components/Welcome";


export default function Home() {
  return (
    <div className="px-6 bg-black ">
    
    <div className="max-w-[900px] mx-auto">
      <Welcome />
      <Introduction />
      <Projects />
      <Technologies />
      <Contact />
      
      </div>
      <div>

      </div>

      <FlowtingNavbar />
    </div>
  );
}
