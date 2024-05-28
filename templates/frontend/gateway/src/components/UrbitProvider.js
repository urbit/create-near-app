import React, { useEffect, useState } from "react";
import Urbit from "@urbit/http-api";

function UrbitProvider({ provide }) {
  const [api, setApi] = useState(null);

  useEffect(() => {
    const urbit = new Urbit("");

    if (process && process.env.MODE === "development") {
      urbit.ship = process.env.SHIP;
      urbit.url = process.env.URL;
      urbit.code = process.env.CODE;
      setApi(urbit);
    } else {
      urbit.url = window.location.origin;

      async function getShip() {
        const response = await fetch(`${urbit.url}/~/name`, {
          method: "get",
          credentials: "include",
        });
        const getStream = await response.text();
        return getStream.substring(1);
      }

      getShip().then((ship) => {
        urbit.ship = ship;
        setApi(urbit);
      });
    }
  }, []);

  function poke(app, mark, json, onSuccess, onError) {
    return new Promise((resolve, reject) => {
      if (!api) {
        reject(new Error("Urbit HTTP API not properly initialized"));
        return;
      }

      if (!api.ship) {
        reject(new Error("No Urbit server connected"));
        return;
      }

      function defaultOnSuccess(response) {
        resolve(response);
      }

      function defaultOnError(err) {
        reject(new Error("Error in poke(): ", err));
      }

      api.poke({
        app: app,
        mark: mark,
        json: json,
        onSuccess: onSuccess ?? defaultOnSuccess,
        onError: onError ?? defaultOnError,
      });
    });
  }

  function scry(app, path) {
    return new Promise((resolve, reject) => {
      if (!api) {
        reject(new Error("Urbit HTTP API not properly initialized"));
        return;
      }

      if (!api.ship) {
        reject(new Error("No Urbit server connected"));
        return;
      }

      api
        .scry({ app: app, path: path })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(new Error("Error in scry(): ", err));
        });
    });
  }
  return <>{provide({ poke, scry })}</>;
}

export default UrbitProvider;
