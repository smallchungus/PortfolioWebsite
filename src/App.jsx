import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="bg-white dark:bg-gray-900 min-h-screen" role="main">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;