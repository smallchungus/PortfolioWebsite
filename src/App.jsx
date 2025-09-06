import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { About } from "./components/sections/About";

const App = () => {
  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <Projects />
      <About />
    </main>
  );
};

export default App;