import React from "react";
import Paper from "@material-ui/core/Paper";

import hoplites from "../../image/Hoplite-3.jpg";

const Hero = () => {
  return (
    <Paper elevation={3} style={{ width: "100%", height: "100%" }}>
      <img
        src={hoplites}
        alt="hoplites"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center -80px",
        }}
      />
    </Paper>
  );
};

export default Hero;
