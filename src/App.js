import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { dataContribuyentes } from "./components/maps/data";
import { MyResponsiveLine } from "./components/chart/chart";
import { chartData } from "./components/chart/chartData";
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
          const coordenada = [lat, long];
          return (
            <Marker position={coordenada} icon={violetIcon}>
              <Popup minWidth='auto'>
                <div className='chart'>
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
