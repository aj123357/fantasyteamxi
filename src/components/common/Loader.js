import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return <CircularProgress style={{'margin-left': '3px'}} color="secondary" size="0.8rem" />;
};

export default Loader;
