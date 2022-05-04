import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  getDashboardReport,
  resetReport,
} from "../../features/reports/reportSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LineChart from "../../components/LineChart";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  const { register, watch } = useForm();

  const dispatch = useDispatch();
  const { report, isReportLoading } = useSelector((state) => state.reports);

  useEffect(() => {
    document.title = "Unichem Store | Dashboard";

    dispatch(getDashboardReport());

    return () => {
      dispatch(resetReport());
    };
  }, [dispatch]);

  // console.log(watch("chartMode"));
  // console.log(report);

  let data = {
    labels: null,
    datasets: [
      {
        data: null,
        backgroundColor: [
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#009688",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
          "#ff5722",
          "#795548",
          "#9e9e9e",
          "#607d8b",
        ],
        borderColor: "#424242",
        borderWidth: 2,
      },
    ],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let reportDesc = {
    sales: 0,
    users: 0,
    orders: 0,
    products: 0,
    promos: 0,
    coupons: 0,
    label: "",
  };

  if (report) {
    switch (watch("chartMode")) {
      case "today":
        if (report.todayMode && report.todayData) {
          data.labels = report.todayMode.map(
            (data) =>
              `${
                data.hour <= 16 ? data.hour + 8 + ":00" : data.hour - 16 + ":00"
              } `
          );
          data.datasets[0].data = report.todayMode.map((data) => data.sales);

          reportDesc.label = "Today";
          reportDesc.sales = report.todayData.todaySales;
          reportDesc.users = report.todayData.todayUsers;
          reportDesc.orders = report.todayData.todayOrders;
          reportDesc.products = report.todayData.todayProducts;
          reportDesc.promos = report.todayData.todayPromos;
          reportDesc.coupons = report.todayData.todayCoupons;
        }
        break;
      case "week":
        if (report.weekMode && report.weeklyData) {
          data.labels = report.weekMode.map(
            (data) => `${days[data.day - 1]}` //- Week ${data.week}
          );
          data.datasets[0].data = report.weekMode.map((data) => data.sales);

          reportDesc.label = "This Week";
          reportDesc.sales = report.weeklyData.weeklySales;
          reportDesc.users = report.weeklyData.weeklyUsers;
          reportDesc.orders = report.weeklyData.weeklyOrders;
          reportDesc.products = report.weeklyData.weeklyProducts;
          reportDesc.promos = report.weeklyData.weeklyPromos;
          reportDesc.coupons = report.weeklyData.weeklyCoupons;
        }
        break;
      case "month":
        if (report.monthMode && report.monthlyData) {
          data.labels = report.monthMode.map(
            (data) =>
              `Week ${data.week + 1} - ${months[data.month - 1]} ${data.year}`
          );
          data.datasets[0].data = report.monthMode.map((data) => data.sales);

          reportDesc.label = "This Month";
          reportDesc.sales = report.monthlyData.monthlySales;
          reportDesc.users = report.monthlyData.monthlyUsers;
          reportDesc.orders = report.monthlyData.monthlyOrders;
          reportDesc.products = report.monthlyData.monthlyProducts;
          reportDesc.promos = report.monthlyData.monthlyPromos;
          reportDesc.coupons = report.monthlyData.monthlyCoupons;
        }
        break;
      case "year":
        if (report.yearMode && report.yearlyData) {
          data.labels = report.yearMode.map(
            (data) => `${months[data.month - 1]} ${data.year}`
          );
          data.datasets[0].data = report.yearMode.map((data) => data.sales);

          reportDesc.label = "This Year";
          reportDesc.sales = report.yearlyData.yearlySales;
          reportDesc.users = report.yearlyData.yearlyUsers;
          reportDesc.orders = report.yearlyData.yearlyOrders;
          reportDesc.products = report.yearlyData.yearlyProducts;
          reportDesc.promos = report.yearlyData.yearlyPromos;
          reportDesc.coupons = report.yearlyData.yearlyCoupons;
        }
        break;
      case "total":
        if (report.totalMode && report.totalData) {
          data.labels = report.totalMode.map((data) => `Year ${data.year}`);
          data.datasets[0].data = report.totalMode.map((data) => data.sales);

          reportDesc.label = "Total";
          reportDesc.sales = report.totalData.totalSales;
          reportDesc.users = report.totalData.totalUsers;
          reportDesc.orders = report.totalData.totalOrders;
          reportDesc.products = report.totalData.totalProducts;
          reportDesc.promos = report.totalData.totalPromos;
          reportDesc.coupons = report.totalData.totalCoupons;
        }
        break;
      default:
        break;
    }
  }

  if (isReportLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="content">
      <Header />
      <div className="row mt-3">
        <div className="col-12 mb-4">
          <div className="card border-0 shadow">
            <div className="card-header d-sm-flex flex-row align-items-center flex-0">
              <div className="d-block mb-3 mb-sm-0">
                <div className="fs-5 fw-normal mb-2">Total Sales</div>
                <h2 className="fs-3 fw-extrabold">₱{reportDesc.sales}</h2>
                <div className="small mt-2">
                  <span className="fw-normal me-2">{reportDesc.label}</span>
                  <span className="fas fa-angle-up"></span>
                  {/* <span className="text-success fw-bold">10.57%</span> */}
                </div>
              </div>
              <div className="d-flex ms-auto">
                <select className="form-select" {...register("chartMode")}>
                  <option value="today">Today&emsp;&emsp;</option>
                  <option value="week">This Week&emsp;&emsp;</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="total">Total</option>
                </select>
              </div>
            </div>
            <div className="card-body p-2">
              <LineChart chartData={data} />
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-success rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Sales</h2>
                    <h3 className="mb-1">₱{reportDesc.sales}</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Sales</h2>
                    <h3 className="fw-extrabold mb-1">₱{reportDesc.sales}</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    {reportDesc.label}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-info rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="h5">Users</h2>
                    <h3 className="fw-extrabold mb-1">{reportDesc.users}</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Users</h2>
                    <h3 className="fw-extrabold mb-1">{reportDesc.users}</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    {reportDesc.label}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-purple rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Orders</h2>
                    <h3 className="mb-1">{reportDesc.orders}</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Orders</h2>
                    <h3 className="fw-extrabold mb-1">{reportDesc.orders}</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    {reportDesc.label}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-secondary rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Products</h2>
                    <h3 className="mb-1">{reportDesc.products}</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Products</h2>
                    <h3 className="fw-extrabold mb-1">{reportDesc.products}</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    {reportDesc.label}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-gray-500 rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                      />
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Promotions</h2>
                    <h3 className="mb-1">{reportDesc.promos}</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Promotions</h2>
                    <h3 className="fw-extrabold mb-1">{reportDesc.promos}</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    {reportDesc.label}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-danger rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4-1v1h1v-1H4Zm1 3v-1H4v1h1Zm7 0v-1h-1v1h1Zm-1-2h1v-1h-1v1Zm-6 3H4v1h1v-1Zm7 1v-1h-1v1h1Zm-7 1H4v1h1v-1Zm7 1v-1h-1v1h1Zm-8 1v1h1v-1H4Zm7 1h1v-1h-1v1Z" />
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Coupons</h2>
                    <h3 className="mb-1">{reportDesc.coupons}</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Coupons</h2>
                    <h3 className="fw-extrabold mb-1">{reportDesc.coupons}</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    {reportDesc.label}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default Dashboard;
