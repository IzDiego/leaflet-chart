/* eslint-disable react-hooks/rules-of-hooks */
import {
  useMapEvents,
  useMap,
  MapContainer,
  TileLayer,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // inside .js file
import "react-leaflet-markercluster/dist/styles.min.css"; // inside .js file
import "./App.css";
import { useState } from "react";
import { dataContribuyentes } from "./components/maps/data";
import { dataViviendas } from "./components/maps/dataViviendas";
/* import { MyResponsiveBar } from "./components/chart/barChart"; */
import { violetIcon } from "./components/maps/Icons";
import MarkerClusterGroup from "react-leaflet-markercluster";
/* import DragBar from "./components/dragBar/dragBar"; */
import PopupTabs from './components/tabs/tabs'

function MyBoundEvent() {
  const initialMap = useMap();
  const [bounds, setBounds] = useState(initialMap.getBounds());
  let totalContribuyentes = 0;
  let totalViviendas = 0;
  let totalProb_pago = 0;
  let probPago = [];

  const map = useMapEvents({
    moveend() {
      setBounds(map.getBounds());
      dataContribuyentes.features.map((contribuyente) => {
        const lat = contribuyente.geometry.coordinates[1];
        const lng = contribuyente.geometry.coordinates[0];
        if (lat > bounds._southWest.lat && lat < bounds._northEast.lat) {
          if (lng > bounds._southWest.lng && lng < bounds._northEast.lng) {
            totalContribuyentes++;
          }
        } else {
        }
        return null;
      });
      if (totalContribuyentes === 0) {
        console.log("Sin resultados de contribuyentes");
      }
      dataViviendas.features.map((vivienda) => {
        const lat = vivienda.geometry.coordinates[1];
        const lng = vivienda.geometry.coordinates[0];
        if (lat > bounds._southWest.lat && lat < bounds._northEast.lat) {
          if (lng > bounds._southWest.lng && lng < bounds._northEast.lng) {
            probPago.push(vivienda.properties.prob_pago);
            totalViviendas++;
          }
        } else {
        }
        return null;
      });
      if (totalViviendas === 0) {
        console.log("Sin resultados de viviendas");
      } else {
        totalProb_pago = probPago.reduce(
          (partial_sum, a) => partial_sum + a,
          0
        );
        console.log("prob media de pago: ", totalProb_pago / totalViviendas);
      }
      console.log("Contribuyentes count", totalContribuyentes);
      console.log("Viviendas count", totalViviendas);
      /* const barData = [
        {
          prom_pago: totalProb_pago,
          prom_pagoColor: "hsl(153, 70%, 50%)",
        },
      ]; */

      /* return (
        
      ); */
    },
  });

  return null/* <DragBar /> */;
}

const center = [20.60722, -100.41];
function App() {  
  return (
    <>
      <div className="map">
        <div className="dragBar">{/* <DragBar /> */}</div>
        <MapContainer
          center={center}
          zoom={11}
          style={{ width: "100vw", height: "100vh" }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=dTFewUiAMuFIZwgDv3nB"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <MyBoundEvent />
          <MarkerClusterGroup>
            {dataViviendas.features.map((vivienda) => {
              const lat = vivienda.geometry.coordinates[1];
              const long = vivienda.geometry.coordinates[0];
              const vivienda_id = vivienda.properties.id_vivienda;
              let contribuyentesVivienda = [];

              let chart = [
                vivienda.properties.X2018,
                vivienda.properties.X2019,
                vivienda.properties.X2020,
                vivienda.properties.X2021,
                vivienda.properties.X2022,
              ];

              dataContribuyentes.features.forEach((contribuyente) => {
                if (vivienda_id === contribuyente.properties.id_vivienda) {
                  contribuyentesVivienda.push({
                    curp: contribuyente.properties.curp,
                    edad: contribuyente.properties.edad_actual,
                  });
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
                    <div>
                      <PopupTabs vivienda_id={vivienda_id} chart={chartData} contribuyentes={contribuyentesVivienda}/>                     
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </>
  );
}

export default App;
