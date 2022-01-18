import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { dataContribuyentes } from "./components/maps/data";
import { MyResponsiveLine } from "./components/chart/chart";
import { dataViviendas } from "./components/maps/dataViviendas";
import { violetIcon } from "./components/maps/Icons";

const center = [20.60722, -100.41];
function App() {
  return (
    <>
      <MapContainer
        center={center}
        zoom={11}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=dTFewUiAMuFIZwgDv3nB"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {dataContribuyentes.features.map((contribuyente) => {
          const lat = contribuyente.geometry.coordinates[1];
          const long = contribuyente.geometry.coordinates[0];
          console.log(contribuyente.properties)
          const vivienda_id = contribuyente.properties.id_vivienda;
          let chart = [];
          dataViviendas.features.forEach((vivienda) => {
            if (vivienda_id === vivienda.properties.id_vivienda) {
              chart.push(
                vivienda.properties.X2018,
                vivienda.properties.X2019,
                vivienda.properties.X2020,
                vivienda.properties.X2021,
                vivienda.properties.X2022
              );
            }
          });
          const chartData = [
            {
              id: "Impuestos",
              color: "hsl(106, 70%, 50%)",
              data: [
                {
                  x: "2018",
                  y: chart[0],
                },
                {
                  x: "2019",
                  y: chart[1],
                },
                {
                  x: "2020",
                  y: chart[2],
                },
                {
                  x: "2021",
                  y: chart[3],
                },
                {
                  x: "2022",
                  y: chart[4],
                },
              ],
            },
          ];
          //
          const coordenada = [lat, long];
          return (
            <Marker position={coordenada} icon={violetIcon}>
              <Popup minWidth="auto">
                <h>Curp: {contribuyente.properties.curp}</h>
                <h>Edad: {contribuyente.properties.edad_actual}</h>
                <div className="chart">
                  <MyResponsiveLine data={chartData} />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}

export default App;
