import { Container, Grid, Alert } from "@mui/material";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { getAssets } from "./actions";
import AssetCard from "./components/AssetCard";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";

function App() {
  const qs = new URLSearchParams(useLocation().search)
    .toString()
    .split("&")
    .map((pair) => pair.split("="));
  // qs to object
  const params = qs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const { data, isLoading, isError } = useQuery(
    ["all-cases", qs],
    async () => await getAssets(params)
  );
  const assets = data?.assets ?? [];
  return (
    <>
      <NavBar />
      <Container style={{ paddingTop: "1.5rem" }}>
        <Grid container spacing={2}>
          {isLoading && <Loader />}
          {isError && (
            <Alert severity="error">Could not fetch any assets!</Alert>
          )}
          {assets.map((asset) => (
            <Grid key={asset.id} xs={6} md={4} item>
              <AssetCard asset={asset} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;
