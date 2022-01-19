import { MyResponsiveLine } from "../chart/lineChart";
import { TablaContribuyentes } from "../table/contribuyentesTable";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      variant="scrollable"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PopupTabs({ vivienda_id, chart, contribuyentes }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Grafico" {...a11yProps(0)} />
          <Tab label="Tabla" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} spam>
        <div className="chart">
          <b>Id de Vivienda: {vivienda_id}</b>
          <MyResponsiveLine data={chart} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TablaContribuyentes contribuyentes={contribuyentes} />
      </TabPanel>
    </Box>
  );
}
