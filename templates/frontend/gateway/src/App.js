import "App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React, { useEffect } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { sanitizeUrl } from "@braintree/sanitize-url";
import { useAccount, useInitNear } from "near-social-vm";
import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Viewer from "./Viewer";
import UrbitProvider from "./components/UrbitProvider";

function App(props) {
  // Attributes passed from web component
  const { src, code, initialProps, rpc, network, selectorPromise } = props;

  // Initialize the NEAR connection
  // and the VM itself
  const { initNear } = useInitNear();

  useAccount();
  useEffect(() => {
    const config = {
      networkId: network || "mainnet",
      selector: selectorPromise,
      customElements: {
        Link: (props) => {
          if (!props.to && props.href) {
            props.to = props.href;
            delete props.href;
          }
          if (props.to) {
            props.to = sanitizeUrl(props.to);
          }
          return <Link {...props} />;
        },
        Urbit: (props) => {
          return <UrbitProvider {...props} />;
        },
      },
      features: {
        enableComponentSrcDataKey: true, // adds "data-component=${src}" attribute to widgets, helpful for inspect element
      },
      config: {
        defaultFinality: undefined,
      },
    };

    if (rpc) {
      config.config.nodeUrl = rpc; // <Widget src="..." /> makes an rpc request for the widget code
      // this enables us to override this rpc url to use a local, rpc proxy (bos-workspace)
    }

    initNear && initNear(config);
  }, [initNear, rpc]);

  // Specific to the Urbit implementation
  let pathname = window.location.pathname;
  let before = pathname.substring(0, pathname.indexOf(`/gateway`));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/placeholder/gateway/" />,
    },
    {
      path: `/${before || "placeholder"}/gateway/*`,
      element: (
        <Viewer widgetSrc={src} code={code} initialProps={initialProps} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
