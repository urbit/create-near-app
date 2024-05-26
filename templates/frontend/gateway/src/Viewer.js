import { Widget } from "near-social-vm";
import React, { useMemo } from "react";

import { useLocation } from "react-router-dom";
import useRedirectMap from "./hooks/useRedirectMap";
import useUrbitShip from "./hooks/useUrbitShip";

function Viewer({ widgetSrc, code, initialProps }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // get redirect map for local development; features hot reload
  const { components: redirectMap } = useRedirectMap();
  
  // get urbit ship api
  const api = useUrbitShip();

  // create props from params (efiz.near/widget/Tree?rootPath=root.near)
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value;
      return props;
    }, {});
  }, [location]);

  const path = location.pathname.substring(1);

  const src = useMemo(() => {
    const pathSrc = widgetSrc ?? path;
    return pathSrc;
  }, [widgetSrc, path]);

  return (
    <>
      <Widget
        src={!code && src}
        code={code} // prioritize code
        props={{ ...initialProps, ...passProps, api }}
        config={{ redirectMap }}
      />
    </>
  );
}

export default Viewer;
