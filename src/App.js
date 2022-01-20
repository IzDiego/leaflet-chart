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
import { AñosPagoChartBar } from "./components/chart/añosPagoChartBar";
import { MyViviedaChartBar } from "./components/chart/viviendaChartBar";
import { violetIcon } from "./components/maps/Icons";
import MarkerClusterGroup from "react-leaflet-markercluster";
import PopupTabs from "./components/tabs/tabs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function MyBoundEvent({ screenInfo, setScreenInfo }) {
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
      const mapInfo = {
        Contribuyentes: totalContribuyentes,
        Viviendas: totalViviendas,
        totalProb_pago: totalProb_pago / totalViviendas,
        probPago: probPago,
      };
      setScreenInfo(mapInfo);
      console.log("Contribuyentes count", totalContribuyentes);
      console.log("Viviendas count", totalViviendas);
    },
  });

  return null; 
}

const center = [20.60722, -100.41];
function App() {
  const [screenInfo, setScreenInfo] = useState([]);
  const chartViviendasBarras = [
    {
      prom_pago: screenInfo.totalProb_pago,
      prom_pagoColor: "hsl(153, 70%, 50%)",
    },
  ];
  var x2018 =0;
  var x2019 =0;
  var x2020 =0;
  var x2021 =0;
  var x2022 =0;
  dataViviendas.features.map((vivienda) => {
    x2018 = x2018+vivienda.properties.X2018;
    x2019 = x2018+vivienda.properties.X2019;
    x2020 = x2018+vivienda.properties.X2020;
    x2021 = x2018+vivienda.properties.X2021;
    x2022 = x2018+vivienda.properties.X2022;
    return null
  });
  const chartPagosAño =[
    {
      año:'2018',
      pagos:  x2018
    },
    {
      año:'2019',
      pagos:  x2019
    },
    {
      año:'2020',
      pagos:  x2020
    },{
      año:'2021',
      pagos:  x2021
    },
    {
      año:'2022',
      pagos:  x2022
    }
  ]
  return (
    <>
      <div className="dragBar">{/* <DragBar /> */}</div>
      <MapContainer
        center={center}
        zoom={11}
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          position: "relative",
        }}
      >
        <TileLayer
          style={{ zIndex: 2, position: "relative" }}
          url="https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=dTFewUiAMuFIZwgDv3nB"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <MyBoundEvent setScreenInfo={setScreenInfo} style={{ zIndex: 4 }} />
        <MarkerClusterGroup maxClusterRadius="35">
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
                    <PopupTabs
                      vivienda_id={vivienda_id}
                      chart={chartData}
                      contribuyentes={contribuyentesVivienda}
                    />
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      <Paper
        style={{ zIndex: 4, position: "absolute", right: 10, top: 100 }}
        elevation={6}
      >
        <Box p={1}>
          <Typography variant="h5">
            Total contribuyentes: {screenInfo.Contribuyentes}
          </Typography>
          <Typography variant="h5">
            Total viviendas: {screenInfo.Viviendas}
          </Typography>
          <div
            style={{
              height: 250,
              width: 300,
            }}
          >
            <AñosPagoChartBar data={chartPagosAño} />
          </div>
          <div
            style={{
              height: 250,
              width: 300,
            }}
          >
            <MyViviedaChartBar data={chartViviendasBarras} />
          </div>
        </Box>
      </Paper>
    </>
  );
}

export function SimplePaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
      style={{ zIndex: 4, position: "absolute", right: 10, top: 100 }}
    >
      <Paper elevation={3} />
    </Box>
  );
}

export default App;
