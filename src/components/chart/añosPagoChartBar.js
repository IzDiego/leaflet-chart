import { ResponsiveBar } from "@nivo/bar";

export const AñosPagoChartBar = ({ data /* see data tab */ }) => (
  <ResponsiveBar
    data={data}
    keys={["pagos"]}
    indexBy="año"
    valueFormat=" ^-$.3~g"
    margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
    padding={0.2}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "category10" }}
    colorBy="indexValue"
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend:"Año" ,
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Pago total (miles de pesos)",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
        from: 'color',
        modifiers: [
            [
                'brighter',
                '2.5'
            ]
        ]
    }}
    role="application"
    ariaLabel="Nivo bar chart demo"
  />
);
