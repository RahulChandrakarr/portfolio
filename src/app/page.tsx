
import Contact from "./components/Contact";
import FlowtingNavbar from "./components/FlowtingNavbar";
import Introduction from "./components/Introduction";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import { Technologies } from "./components/Technologies";
import { Welcome } from "./components/Welcome";


export default function Home() {
  return (
    <div className="px-4 bg-black ">

      <div className="mx-auto">
        <Welcome />
        <Introduction />
        <WorkExperience />
        <Projects />
        <Technologies />
        <Education />
        <Contact />

      </div>
      <div>

      </div>

      <FlowtingNavbar />
    </div>
  );
}
