/**
 * This is your entry file for the frontend.
 */
return (
  <div>
    <Widget src="${config_account}/widget/components.header" />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "500px",
        width: "75vw",
        margin: "auto",
      }}
    >
      <div>
        <Urbit
          provides={({ poke }) => (
            <Widget
              src={"${config_account}/widget/components.pokeUrbit"}
              props={{ poke }}
            />
          )}
        />
      </div>
      <div>
        <Urbit
          provides={({ scry }) => (
            <Widget
              src={"${config_account}/widget/components.scryUrbit"}
              props={{ scry }}
            />
          )}
        />
      </div>
    </div>
  </div>
);
