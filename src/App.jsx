import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navigation } from "./components/common/Navigation";
import { Favicon } from "./components/common/Favicon";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

const App = () => {
  return (
    <>
      <Favicon />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <main className="bg-white dark:bg-gray-900 min-h-screen" role="main">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
      <SpeedInsights />
    </>
  );
};

export default App;