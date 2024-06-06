/**
 * This is your entry file for the frontend.
 */
const { api } = props;

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
        <Widget
          src={"${config_account}/widget/components.pokeUrbit"}
          props={{ api: api }}
        />
      </div>
      <div>
        <Widget
          src={"${config_account}/widget/components.scryUrbit"}
          props={{ api: api }}
        />
      </div>
    </div>
  </div>
);
