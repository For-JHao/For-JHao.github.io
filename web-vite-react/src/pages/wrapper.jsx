import { useEffect, useState } from "react";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import wrapperConfig from './wrapper.json'

function Wrapper() {

  const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);

    const particlesLoaded = (container) => {
      console.log(container);
    };

    if (init) {
      return (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={wrapperConfig}
        />
      );
    }

    return <></>;
}

export default Wrapper
