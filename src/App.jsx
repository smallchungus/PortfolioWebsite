import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

const App = () => {
  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
};

export default App;