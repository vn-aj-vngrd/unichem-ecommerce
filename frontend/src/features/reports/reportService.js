import axios from "axios";

const API_URL = "/api/reports/";

// Get Dashboard Report
const getDashboardReport = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getDashboardReport", config);

  return response.data;
};

const reportService = {
  getDashboardReport,
};

export default reportService;
