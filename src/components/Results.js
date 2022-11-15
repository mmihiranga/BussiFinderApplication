import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DirectionsTransitFilledSharpIcon from "@mui/icons-material/DirectionsTransitFilledSharp";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SystemUpdateAltRoundedIcon from "@mui/icons-material/SystemUpdateAltRounded";
import { padding } from "@mui/system";
import GaugeChart from "react-gauge-chart";
// import { Chart } from "react-google-charts";
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
import { FaUmbrellaBeach } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { MdOutlinePool } from "react-icons/md";
import { RiParkingBoxLine } from "react-icons/ri";
import { BsWind } from "react-icons/bs";
import { addBusiness } from "../features/business";
import Grow from "@mui/material/Grow";
import { useSelector, useDispatch } from "react-redux";
import { compareBusiness } from "../features/business";
import { useNavigate } from "react-router-dom";
import BGImage from "../images/vadim-bogulov-Vq-Sqr7D_7k-unsplash.jpg";
import { GiPathDistance } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi";
import { RiRestaurantFill } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShoppingCart, AiFillCalendar } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { jsPDF } from "jspdf";
import { FaRegCreditCard } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { FaWheelchair } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { GrWheelchairActive } from "react-icons/gr";
import { BsCashCoin } from "react-icons/bs";
import { Chart } from "react-google-charts";

// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from "@devexpress/dx-react-chart-material-ui";
// import { Animation } from '@devexpress/dx-react-chart';

const userRenderField = ["pharmacy"];

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Competitors",
    },
  },
};

// export const data = [
//     ["Year", "Sales"],
//     ["2014", 1000],
//     ["2015", 1170],
//     ["2016", 660],
//     ["2017", 1030],
// ];

// export const options = {

//     chartArea: {
//         backgroundColor: {
//             fill: '#FF0000',
//             fillOpacity: 0.1
//         },
//     },
//     backgroundColor: {
//         fill: '#FF0000',
//         fillOpacity: 0.8
//     },
//     chart: {
//         title: "Company Performance",
//         subtitle: "Sales, , and Profit: 2014-2017",
//     },
// };

const useStyles = makeStyles({
  titleTxt: {
    fontSize: "26px",
    fontWeight: 600,
    color: (themeColor) =>
      themeColor.status == "light" ? "#3e3d3d" : "#f5f5f5",
    alignSelf: "flex-start",
  },
  subTitleTxt: {
    fontSize: "18px",
    fontWeight: 400,
    color: (themeColor) =>
      themeColor.status == "light" ? "#3e3d3d" : "#f5f5f5",
  },
  bodyTxt: {
    fontSize: "14px",
    fontWeight: 200,
    color: (themeColor) =>
      themeColor.status == "light" ? "#3e3d3d" : "#f5f5f5",
    paddingBottom: "10px",
  },
  gMap: {},
  featureTitleTxt: {
    fontSize: "18px",
    fontWeight: 600,
    color: (themeColor) =>
      themeColor.status == "light" ? "#3e3d3d" : "#f5f5f5",
    marginBottom: "10px",
  },
  featuresBoxFlex: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    color: (themeColor) =>
      themeColor.status == "light" ? "#3e3d3d" : "#f5f5f5",
  },
  featuresBox: {
    width: "100%",
    height: "100%",
    // backgroundColor: themeColor => themeColor.status == 'dark' ? '#3e3d3d' : '#f5f5f5',
    borderRadius: "30px",
    boxSizing: "border-box",
    overflow: "hidden",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  features: {
    width: "100%",
    height: "60px",
    backgroundColor: (themeColor) =>
      themeColor.status == "dark" ? "#4c4c4c" : "#e8e8e8",
    borderRadius: "8px",
    boxSizing: "border-box",
    display: "inline-flex",
    gap: "10px",
    alignItems: "center",
    padding: "10px",
    boxShadow: "0px 0px 5px 0px rgba(234,234,234,0.2)",
  },
});

const CompareBtn = styled(Button)(() => ({
  height: "100px",
  width: "100%",
  fontSize: "17px",
  padding: "15px",
  backgroundImage: `url(${require("../images/priceSvg.svg").default})`,
  backgroundSize: "auto",
  backgroundPosition: "right",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#292f98",
  borderRadius: "15px",
  color: "#ffffff",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  fontFamily: "plex-sans, sans-serif",
  outline: "none",
  cursor: "pointer",
  textTransform: "none",
  elevation: "5",
  marginBottom: "16px",
  boxSizing: "border-box",
  "&:hover": {
    boxShadow: "0px 0px 5px 0px #000000",
    backgroundColor: "#323678",
  },
}));

const DownloadBtn = styled(Button)(() => ({
  height: "90px",
  width: "100%",
  fontSize: "17px",
  padding: "15px",
  borderRadius: "15px",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontFamily: "plex-sans, sans-serif",
  outline: "none",
  cursor: "pointer",
  textTransform: "none",
  elevation: "5",
  marginBottom: "16px",
  /* "to left" / "to right" - affects initial color */
  background: "linear-gradient(to left, #292f98 50%, #323678 50%) right",
  backgroundSize: "200%",
  transition: ".5s ease-out",
  "&:hover": {
    // backgroundColor: "#4c69ba",
    backgroundPosition: "left",
  },

  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

const Results = () => {
  const themeColor = useSelector((state) => state.theme.value);
  const classes = useStyles(themeColor);
  const dispatch = useDispatch();
  const [center, setCenter] = useState({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [position, setPosition] = useState({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [zoom, setZoom] = useState(9);
  const [hotelData, setHotelData] = useState(["sd", "sdf", "sdf", "sd", "sdf"]);
  const businessDetails = useSelector((state) => state.business);
  let navigate = useNavigate();

  const labels = [
    "ATM",
    "Gas Station",
    "Hospital Count",
    "HotelCount",
    "Movie Theater Count",
    "Restaurant Count",
    "Pharmacy",
  ];
  const chartOptions = {
    chart: {
      title: "Nearby Places",
    },
  };
  const data = [
    ["Type", "Count"],
    ["ATM", businessDetails?.value[0]?.businessCount.atmCount],
    ["Gas Station", businessDetails?.value[0]?.businessCount?.gasStationCount],
    ["Hospital", businessDetails?.value[0]?.businessCount?.hospitalCount],
    ["Hotel", businessDetails?.value[0]?.businessCount?.hotelCount],
    ["Movie Theater", businessDetails?.value[0]?.businessCount?.movieTheaterCount],
    ["Restaurant", businessDetails?.value[0]?.businessCount?.restaurantCount],
    ["Pharmacy", businessDetails?.value[0]?.businessCount?.pharmacyCount],
  ];
//   const data = [
//     { type: "ATM", count: businessDetails?.value[0]?.businessCount.atmCount },
//     {
//       type: "Gas Station",
//       count: businessDetails?.value[0]?.businessCount?.atmCount,
//     },
//     {
//       type: "Hospital",
//       count: businessDetails?.value[0]?.businessCount?.atmCount,
//     },
//     { type: "Hotel", count: businessDetails?.value[0]?.businessCount?.atmCount },
//     {
//       type: "Movie Theater",
//       count: businessDetails?.value[0]?.businessCount?.atmCount,
//     },
//     {
//       type: "Restaurant",
//       count: businessDetails?.value[0]?.businessCount.atmCount,
//     },
//     {
//       type: "Pharmacy",
//       count: businessDetails?.value[0]?.businessCount.atmCount,
//     },
//   ];
  console.log("dataaaaaaa", data);
  // const data = {
  //     labels,
  //     datasets: [
  //         {
  //             label: 'Dataset 1',
  //             data: businessDetails && businessDetails.value[0].businessCount ? [businessDetails.value[0].businessCount.atmCount, businessDetails.value[0].businessCount.gasStationCount, businessDetails.value[0].businessCount.hospitalCount, businessDetails.value[0].businessCount.hotelCount, businessDetails.value[0].businessCount.movieTheaterCount, businessDetails.value[0].businessCount.restaurantCount, businessDetails.value[0].pharmacy] : [],
  //             backgroundColor: 'rgba(25, 0, 168, 0.5)',
  //         },

  //     ],
  // };

  useEffect(() => {
    if (businessDetails) {
      console.log("businessDetailsResssss", businessDetails);
      setPosition({
        lat: businessDetails.value[0].latitude,
        lng: businessDetails.value[0].longitude,
      });
      setCenter({
        lat: businessDetails.value[0].latitude,
        lng: businessDetails.value[0].longitude,
      });
    }
  }, [businessDetails]);

  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyC_mV5GkYx8ULNDqXgwBobTczkM7j6T0uc",
  });

  const [checked, setChecked] = useState(true);

  const compareLocation = () => {
    dispatch(
      compareBusiness({
        length: businessDetails.value.length,
      })
    );

    if (
      businessDetails.value[businessDetails.value.length - 1].type == "hotel"
    ) {
      dispatch(addBusiness({ type: "hotel" }));
      navigate("/inputHotel");
    } else if (
      businessDetails.value[businessDetails.value.length - 1].type ==
      "restaurant"
    ) {
      dispatch(addBusiness({ type: "restaurant" }));
      navigate("/inputHotel");
    } else if (
      businessDetails.value[businessDetails.value.length - 1].type == "pharmacy"
    ) {
      dispatch(addBusiness({ type: "pharmacy" }));
      navigate("/inputPharmacy");
    } else if (
      businessDetails.value[businessDetails.value.length - 1].type == "Grocery"
    ) {
      dispatch(addBusiness({ type: "Grocery" }));
      navigate("/inputGrocery");
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    if (businessDetails.value[0].type == "hotel") {
      doc.setFontSize(22);
      doc.setFont("courier", "bolditalic");
      doc.text(
        "Hotel Success Precentage Prediction",
        105,
        8,
        null,
        null,
        "center"
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.text(`Latitude : ${businessDetails.value[0].latitude}`, 20, 40);
      doc.text(`Longitude : ${businessDetails.value[0].longitude}`, 20, 50);
      doc.text(
        `AttractionPlaces Count : ${businessDetails.value[0].locationFeatures.attractionPlacesCount}`,
        20,
        60
      );
      doc.text(
        `Transportation Modes Count : ${businessDetails.value[0].locationFeatures.transportationModesCount}`,
        20,
        70
      );
      doc.text(
        `Nearby Hotel Review Count : ${businessDetails.value[0].locationFeatures.nearByHotelReviewCount}`,
        20,
        80
      );
      doc.setFont("helvetica", "bold");
      doc.text(
        `Final Prediction : ${businessDetails.value[0].ml_result}%`,
        20,
        90
      );
      doc.save("Report.pdf");
    } else if (businessDetails.value[0].type == "restaurant") {
      doc.setFontSize(22);
      doc.setFont("courier", "bolditalic");
      doc.text(
        "Restaurant Success Percentage Prediction",
        105,
        8,
        null,
        null,
        "center"
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.text(`Latitude : ${businessDetails.value[0].latitude}`, 20, 40);
      doc.text(`Longitude : ${businessDetails.value[0].longitude}`, 20, 50);
      doc.text(
        `Distance to city : ${businessDetails.value[0].locationFeatures.distanceToCity} km`,
        20,
        60
      );
      doc.text(
        `Education Related Places Count : ${businessDetails.value[0].locationFeatures.educationRelatedPlacesCount}`,
        20,
        70
      );
      doc.text(
        `Office Related Places Count : ${businessDetails.value[0].locationFeatures.workPlacesCount}`,
        20,
        80
      );
      doc.text(
        `Shopping Malls Count : ${businessDetails.value[0].locationFeatures.shoppingMallsCount}`,
        20,
        90
      );
      doc.text(
        `Competitors Count : ${businessDetails.value[0].locationFeatures.competitors}`,
        20,
        100
      );
      doc.setFont("helvetica", "bold");
      doc.text(
        `Final Prediction : ${businessDetails.value[0].ml_result}%`,
        20,
        110
      );
      doc.save("Report.pdf");
    } else if (businessDetails.value[0].type == "Grocery") {
      doc.setFontSize(22);
      doc.setFont("courier", "bolditalic");
      doc.text(
        "Grocery Success Percentage Prediction",
        105,
        8,
        null,
        null,
        "center"
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.text(`Latitude : ${businessDetails.value[0].latitude}`, 20, 40);
      doc.text(`Longitude : ${businessDetails.value[0].longitude}`, 20, 50);
      doc.text(
        `Traffic Summation : ${businessDetails.value[0].locationFeatures.trafficSum}`,
        20,
        60
      );
      doc.text(
        `In-Store-Shopping : ${businessDetails.value[0].locationFeatures.Instoreshopping}`,
        20,
        70
      );
      doc.text(
        `Delivery : ${businessDetails.value[0].locationFeatures.Delivery}`,
        20,
        80
      );
      doc.text(
        `Website : ${businessDetails.value[0].locationFeatures.Website}`,
        20,
        90
      );
      doc.text(
        `Competitors Count : ${businessDetails.value[0].locationFeatures.competitorsCount}`,
        20,
        100
      );
      doc.setFont("helvetica", "bold");
      doc.text(
        `Final Prediction : ${businessDetails.value[0].ml_result}%`,
        20,
        110
      );
      doc.save("Report.pdf");
    } else if (businessDetails.value[0].type == "pharmacy") {
      doc.setFontSize(22);
      doc.setFont("courier", "bolditalic");
      doc.text(
        "Pharmacy Success Percentage Prediction",
        105,
        8,
        null,
        null,
        "center"
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
      doc.text(`Latitude : ${businessDetails.value[0].latitude}`, 20, 40);
      doc.text(`Longitude : ${businessDetails.value[0].longitude}`, 20, 50);
      doc.text(`Available medical places count : "5"`, 20, 60);
      doc.text(`Distance to nearest bus station : "200 m"`, 20, 70);
      doc.text(
        `24 hours opening : ${businessDetails.value[0].locationFeatures.OpenHours}`,
        20,
        80
      );
      doc.text(
        `Availability of delivery service : ${businessDetails.value[0].locationFeatures.deliver}`,
        20,
        90
      );
      doc.text(
        `Wheel chair accessible entrance : ${businessDetails.value[0].locationFeatures.WhlChairEntrance}`,
        20,
        100
      );
      doc.text(
        `Wheel chair accessible car park : ${businessDetails.value[0].locationFeatures.WhlChairPark}`,
        20,
        110
      );
      doc.text(
        `Cash payment : ${businessDetails.value[0].locationFeatures.cashPay}`,
        20,
        120
      );
      doc.text(
        `Card payment : ${businessDetails.value[0].locationFeatures.cardPay}`,
        20,
        130
      );
      doc.setFont("helvetica", "bold");
      doc.text(
        `Final Prediction : ${businessDetails.value[0].ml_result}%`,
        20,
        140
      );
      doc.save("Report.pdf");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: themeColor.status == "light" ? "#1e2936" : "#3e3d3d",
        height: "150vh",
        display: "grid",
        gridTemplateColumns: "6fr 3fr",
        gap: "30px",
        padding: "50px 70px 50px 70px",
        backgroundImage: `url(${BGImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: themeColor.status == "light" ? "#ecedef" : "#3a3939",
          borderRadius: "30px",
          elevation: 4,
          display: "flex",
          // gridTemplateRows: "auto 3fr 2fr",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          p: 3,
          boxSizing: "border-box",
        }}
      >
        <div className={classes.titleTxt}>
          {businessDetails && businessDetails.value[0].type == "hotel"
            ? `Hotel`
            : businessDetails.value[0].type == "restaurant"
            ? `Restaurant`
            : businessDetails.value[0].type == "pharmacy"
            ? `Pharmacy`
            : `Grocery`}{" "}
          Site Selection
        </div>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          <div className={classes.subTitleTxt}>
            The predicted success percentage for a{" "}
            {businessDetails && businessDetails.value[0].type == "hotel"
              ? `Hotel`
              : businessDetails.value[0].type == "restaurant"
              ? `Restaurant`
              : businessDetails.value[0].type == "pharmacy"
              ? `Pharmacy`
              : `Grocery`}{" "}
          </div>
          <div className={classes.bodyTxt}>
            All the results are given based on the location you have given
          </div>
          {isLoaded && (
            <GoogleMap
              // onClick={e => setClickedLatLng(e.latLng.toJSON())}
              center={center}
              zoom={zoom}
              mapContainerStyle={{
                height: "400px",
                borderRadius: "8px",
              }}
              className={classes.gMap}
            >
              {position && (
                <MarkerF
                  position={position}

                  // Not required, but if you want a custom icon:
                />
              )}
            </GoogleMap>
          )}
        </Box>
        {businessDetails && businessDetails.value[0].type == "hotel" ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Location Based Features
              </div>
              <Box className={classes.featuresBox}>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 500 } : {})}
                >
                  <div className={classes.features}>
                    <LocationOnRoundedIcon style={{ color: "#df5e52" }} />
                    Location Attractiveness Places -{" "}
                    {businessDetails &&
                      businessDetails.value[0].locationFeatures
                        .attractionPlacesCount}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 800 } : {})}
                >
                  <div className={classes.features}>
                    <DirectionsTransitFilledSharpIcon
                      style={{ color: "#2f9f48" }}
                    />
                    Transportation Modes Count -{" "}
                    {businessDetails &&
                      businessDetails.value[0].locationFeatures
                        .transportationModesCount}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    <ApartmentRoundedIcon style={{ color: "#ce7c39" }} />
                    Nearby Hotel Count -{" "}
                    {businessDetails &&
                      businessDetails.value[0].locationFeatures.competitors}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1400 } : {})}
                >
                  <div className={classes.features}>
                    <StarRoundedIcon style={{ color: "#e2da5f" }} />
                    Nearby Hotel Reviews Count -{" "}
                    {businessDetails &&
                      businessDetails.value[0].locationFeatures
                        .nearByHotelReviewCount}
                  </div>
                </Grow>
              </Box>
            </Box>

            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Service Based Features
              </div>
              <Box className={classes.featuresBox}>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    <AiOutlineWifi
                      style={{
                        color: "#4534b1",
                        fontSize: "20px",
                        marginInline: "8px",
                      }}
                    />
                    Free Wi-Fi Access :{" "}
                    {businessDetails &&
                    businessDetails.value[0].serviceDetails.wifi
                      ? "Yes"
                      : "No"}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    <RiParkingBoxLine
                      style={{
                        color: "#b13434",
                        fontSize: "20px",
                        marginInline: "8px",
                      }}
                    />
                    Parking Area :{" "}
                    {businessDetails &&
                    businessDetails.value[0].serviceDetails.parking
                      ? "Yes"
                      : "No"}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    {" "}
                    <FaUmbrellaBeach
                      style={{
                        color: "#ff802f",
                        fontSize: "19px",
                        marginInline: "8px",
                      }}
                    />
                    Beach Access :{" "}
                    {businessDetails &&
                    businessDetails.value[0].serviceDetails.beach
                      ? "Yes"
                      : "No"}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    <BsWind
                      style={{
                        color: "#34b13f",
                        fontSize: "20px",
                        marginInline: "8px",
                      }}
                    />
                    A/C :{" "}
                    {businessDetails &&
                    businessDetails.value[0].serviceDetails.ac
                      ? "Yes"
                      : "No"}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    <MdOutlinePool
                      style={{
                        color: "#344ab1",
                        fontSize: "20px",
                        marginInline: "8px",
                      }}
                    />{" "}
                    Pool Access :{" "}
                    {businessDetails &&
                    businessDetails.value[0].serviceDetails.pool
                      ? "Yes"
                      : "No"}
                  </div>
                </Grow>
              </Box>
            </Box>
          </Box>
        ) : businessDetails && businessDetails.value[0].type == "restaurant" ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Location Based Features
              </div>
              <Box className={classes.featuresBox}>
                <div className={classes.features}>
                  <GiPathDistance
                    style={{ color: "#df5e52", fontSize: "20px" }}
                  />
                  Distance to city -{" "}
                  {businessDetails &&
                    businessDetails.value[0].locationFeatures.distanceToCity}
                </div>
                <div className={classes.features}>
                  <HiShoppingBag
                    style={{ color: "#2f9f48", fontSize: "20px" }}
                  />
                  Education Related Places Count -{" "}
                  {businessDetails &&
                    businessDetails.value[0].locationFeatures
                      .educationRelatedPlacesCount}
                </div>
                <div className={classes.features}>
                  <IoMdSchool style={{ color: "#ce7c39", fontSize: "20px" }} />
                  Shopping Malls Count -{" "}
                  {businessDetails &&
                    businessDetails.value[0].locationFeatures
                      .shoppingMallsCount}
                </div>
                <div className={classes.features}>
                  <MdWork style={{ color: "#4e4c2e", fontSize: "20px" }} />
                  Shopping Malls Count -{" "}
                  {businessDetails &&
                    businessDetails.value[0].locationFeatures.workPlacesCount}
                </div>
                <div className={classes.features}>
                  <RiRestaurantFill
                    style={{ color: "#e2da5f", fontSize: "20px" }}
                  />
                  Competitors Count -{" "}
                  {businessDetails &&
                    businessDetails.value[0].locationFeatures.competitors}
                </div>
              </Box>
            </Box>

            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Service Based Features
              </div>
              <Box className={classes.featuresBox}>
                <div className={classes.features}>
                  <AiOutlineClockCircle
                    style={{
                      color: "#1d7e20",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  Opening Hours :{" "}
                  {businessDetails &&
                    businessDetails.value[0].serviceDetails.opening}
                </div>
                <div className={classes.features}>
                  <AiOutlineClockCircle
                    style={{
                      color: "#b13434",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  Closing Hours :{" "}
                  {businessDetails &&
                    businessDetails.value[0].serviceDetails.closing}
                </div>
                <div className={classes.features}>
                  <MdOutlineDeliveryDining
                    style={{
                      color: "#2f8eff",
                      fontSize: "22px",
                      marginInline: "8px",
                    }}
                  />
                  Delivery :{" "}
                  {businessDetails &&
                    businessDetails.value[0].serviceDetails.delivery}
                </div>
              </Box>
            </Box>
          </Box>
        ) : businessDetails && businessDetails.value[0].type == "pharmacy" ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              marginTop: "1px",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "10px",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Location Based Features
              </div>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  padding: "20px",
                  display: "flex",
                  rowSpacing: "10px",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div className={classes.features}>
                  <GiPathDistance
                    style={{ color: "#df5e52", fontSize: "20px" }}
                  />
                  Distance to bus station -{" "}
                  {businessDetails.value[0].locationFeatures.busStationDistance}
                  m
                </div>
                <div className={classes.features}>
                  <FaClinicMedical
                    style={{ color: "#2f9f48", fontSize: "20px" }}
                  />
                  Medical Places Count -{" "}
                  {businessDetails.value[0].locationFeatures.medicalPlacesCount}
                </div>
              </Box>
            </Box>
            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Service Based Features
              </div>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  padding: "20px",
                  display: "flex",
                  rowSpacing: "10px",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div className={classes.features}>
                  <AiOutlineClockCircle
                    style={{
                      color: "#cbe075",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  24 hours opening :{" "}
                  {businessDetails.value[0].locationFeatures.OpenHours}{" "}
                </div>
                <div className={classes.features}>
                  {" "}
                  <MdOutlineDeliveryDining
                    style={{
                      color: "#ff802f",
                      fontSize: "22px",
                      marginInline: "8px",
                    }}
                  />
                  Delivery : {businessDetails.value[0].locationFeatures.deliver}{" "}
                </div>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  padding: "20px",
                  display: "flex",
                  rowSpacing: "10px",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div className={classes.features}>
                  <FaWheelchair
                    style={{
                      color: "#1d7e20",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  Wheel chair entrance :{" "}
                  {businessDetails.value[0].locationFeatures.WhlChairEntrance}{" "}
                </div>
                <div className={classes.features}>
                  <GrWheelchairActive
                    style={{
                      color: "##9370db",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  Wheel chair car park :{" "}
                  {businessDetails.value[0].locationFeatures.WhlChairPark}{" "}
                </div>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  padding: "20px",
                  display: "flex",
                  rowSpacing: "10px",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div className={classes.features}>
                  <FaRegCreditCard
                    style={{
                      color: "#f065aa",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  Card payment :{" "}
                  {businessDetails.value[0].locationFeatures.cardPay}{" "}
                </div>
                <div className={classes.features}>
                  <BsCashCoin
                    style={{
                      color: "#2f8eff",
                      fontSize: "20px",
                      marginInline: "8px",
                    }}
                  />
                  Cash payment :{" "}
                  {businessDetails.value[0].locationFeatures.cashPay}{" "}
                </div>
              </Box>
              {/* <div className={classes.features}><BsCashCoin style={{ color: '#2f8eff', fontSize: '20px', marginInline: '8px' }} />Cash payment : {businessDetails.value[0].locationFeatures.cashPay}   </div>
                                <div className={classes.features}><FaWheelchair style={{ color: '#1d7e20', fontSize: '20px', marginInline: '8px' }} />Wheel chair entrance : {businessDetails.value[0].locationFeatures.WhlChairEntrance}   </div>
                                <div className={classes.features}><GrWheelchairActive style={{ color: '##9370db', fontSize: '20px', marginInline: '8px' }} />Wheel chair car park : {businessDetails.value[0].locationFeatures.WhlChairPark}   </div>
                                <div className={classes.features}> <MdOutlineDeliveryDining style={{ color: '#ff802f', fontSize: '22px', marginInline: '8px' }} />Delivery : {businessDetails.value[0].locationFeatures.deliver}  </div>
                                     */}
            </Box>
          </Box>
        ) : businessDetails && businessDetails.value[0].type == "Grocery" ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Grocery Location Based Features
              </div>
              <Box className={classes.featuresBox}>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 500 } : {})}
                >
                  <div className={classes.features}>
                    <GiPathDistance
                      style={{ color: "#df5e52", fontSize: "20px" }}
                    />
                    Competitors Count -{" "}
                    {businessDetails.value[0].locationFeatures.competitorsCount}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 800 } : {})}
                >
                  <div className={classes.features}>
                    <HiShoppingBag
                      style={{ color: "#2f9f48", fontSize: "20px" }}
                    />
                    Traffic around the area -{" "}
                    {businessDetails.value[0].locationFeatures.trafficSum}
                  </div>
                </Grow>
              </Box>
            </Box>

            <Box className={classes.featuresBoxFlex}>
              <div className={classes.featureTitleTxt}>
                Service Based Features
              </div>
              <Box className={classes.featuresBox}>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1100 } : {})}
                >
                  <div className={classes.features}>
                    <AiOutlineShoppingCart
                      style={{ color: "#ce7c39", fontSize: "20px" }}
                    />
                    In-store shopping -{" "}
                    {businessDetails.value[0].locationFeatures.Instoreshopping}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1400 } : {})}
                >
                  <div className={classes.features}>
                    <TbTruckDelivery
                      style={{ color: "#df5e52", fontSize: "20px" }}
                    />
                    Delivery -{" "}
                    {businessDetails.value[0].locationFeatures.Delivery}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1400 } : {})}
                >
                  <div className={classes.features}>
                    <BiWorld style={{ color: "#e2da5f", fontSize: "20px" }} />{" "}
                    Website -{" "}
                    {businessDetails.value[0].locationFeatures.Website}
                  </div>
                </Grow>
                <Grow
                  in={checked}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(checked ? { timeout: 1400 } : {})}
                >
                  <div className={classes.features}>
                    <RiParkingBoxLine
                      style={{ color: "#e2da5f", fontSize: "20px" }}
                    />{" "}
                    Parking -{" "}
                    {businessDetails.value[0].locationFeatures.Parking}
                  </div>
                </Grow>
              </Box>
            </Box>
          </Box>
        ) : (
          <div></div>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // backgroundColor: "red",
          borderRadius: "30px",
          display: "grid",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor:
              themeColor.status == "light" ? "#ecedef" : "#3a3939",
            borderRadius: "30px",
            elevation: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GaugeChart
            id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.3, 0.45, 0.25]}
            colors={["#EA4228", "#F5CD19", "#5BE12C"]}
            percent={
              businessDetails &&
              parseInt(businessDetails.value[0].ml_result) / 100
            }
            arcPadding={0.02}
            textColor={themeColor.status == "light" ? "#3e3d3d" : "#f5f5f5"}
            needleColor={"#1c2126cc"}
            needleBaseColor={"#2d2d2d"}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor:
            themeColor.status == "light" ? "#ecedef" : "#3a3939",
            borderRadius: "30px",
            elevation: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
         <Chart
      chartType="Bar"
      width="100%"
      height="200px"
      data={data}
      options={chartOptions}
    />
        </Box>
        {userRenderField.find((e) => e === businessDetails.value[0].type) && (
          <div>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor:
                  themeColor.status == "light" ? "#ecedef" : "#3a3939",
                borderRadius: "30px",
                elevation: 4,
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <div className={classes.subTitleTxt}>
                Important Links for Pharmacy Business Launch
              </div>
              <a href="https://slmc.gov.lk/en/practitioners/pharmacists">
                <div className={classes.bodyTxt}>
                  Path to get a Pharmacy License
                </div>
              </a>
              <a href="https://www.nmra.gov.lk/index.php?option=com_content&view=article&id=394:licensing-of-retail-wholesale-pharmacy&catid=41&Itemid=327&lang=en">
                <div className={classes.bodyTxt}>
                  Licensing of Wholesale Pharmacy
                </div>
              </a>
              <a href="https://www.spc.lk/prescriber.php">
                <div className={classes.bodyTxt}>
                  Publication of State Pharmaceuticals Corporation of Sri Lanka
                </div>
              </a>
              <a href="https://www.gov.uk/">
                <div className={classes.bodyTxt}>
                  Medicines & Healthcare products Regulatory Agency
                </div>
              </a>
              <a href="http://www.cdda.gov.lk/">
                <div className={classes.bodyTxt}>
                  Cosmetics, Devices & Drugs Regulatory Authority Sri Lanka
                </div>
              </a>
              <a href="http://www.health.gov.lk/">
                <div className={classes.bodyTxt}>Ministry of Health </div>
              </a>
            </Box>
          </div>
        )}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
            paddingInline: "10%",
            boxSizing: "border-box",
          }}
        >
          <CompareBtn onClick={() => compareLocation()}>
            Compare With Another Location <ArrowForwardIosIcon />
          </CompareBtn>
          <DownloadBtn onClick={() => downloadReport()}>
            Download Report <SystemUpdateAltRoundedIcon />
          </DownloadBtn>
        </Box>
      </Box>
    </Box>
  );
};

export default Results;
