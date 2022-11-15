import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Grow from "@mui/material/Grow";
import { red } from "@mui/material/colors";
import { BsFilePlus } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi";
import { RiRestaurantFill } from "react-icons/ri";
import { GoPrimitiveDot } from "react-icons/go";
import DirectionsTransitFilledSharpIcon from "@mui/icons-material/DirectionsTransitFilledSharp";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useSelector } from "react-redux";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

const UseStyles = makeStyles(() => ({
  titleTxt: {
    color: "#231D4F",
    fontSize: "25px",
    fontWeight: "600",
    marginTop: "10px",
  },
  subTxt: {
    color: "#888888",
    fontSize: "14px",
    fontWeight: "400",
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
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  features: {
    flex: "2 5 12rem",
    width: "fit-content",
    height: "fit-content",
    whiteSpace: "pre-wrap",
    backgroundColor: (themeColor) =>
      themeColor.status == "dark" ? "#4c4c4c" : "#e8e8e8",
    borderRadius: "8px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    padding: "10px",
    paddingInline: "15px",
    boxShadow: "0px 0px 5px 0px rgba(234,234,234,0.2)",
    color: "#272830",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
  },
  countTxt:{
    color: "#231D4F",
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "10px",
  }
}));

const ResultsFD = () => {
  const themeColor = useSelector((state) => state.theme.value);
  const factorDetails = useSelector((state)=>state.factorDetails.value);
  const classes = UseStyles(themeColor);
  const [center, setCenter] = useState({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [position, setPosition] = useState({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [zoom, setZoom] = useState(9);
  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyC_mV5GkYx8ULNDqXgwBobTczkM7j6T0uc",
  });
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    console.log(factorDetails);
  }, [factorDetails]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E4E6F1",
        paddingBlock: "50px",
        paddingInline: "250px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "35px",
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <div className={classes.titleTxt}>Simple, transparent pricing</div>
          <div className={classes.subTxt}>No contracts. No surprise fees.</div>

          <Box className={classes.featuresBoxFlex}>
            <Box className={classes.featuresBox}>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 500 } : {})}
              >
                <div className={classes.features}>
                  <LocationOnRoundedIcon style={{ color: "#df5e52" ,fontSize:"30px"}} />
                    Attractiveness Places
                    <div className={classes.countTxt}>
                        {factorDetails?.attractionPlacesCount}
                    </div>
                </div>
                
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 800 } : {})}
              >
                <div className={classes.features}>
                  <DirectionsTransitFilledSharpIcon
                    style={{ color: "#2f9f48" ,fontSize:"30px"}}
                  />
                  Transportation Modes  
                  <div className={classes.countTxt}>
                        {factorDetails?.transportationModesCount}
                </div>
                </div>
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1100 } : {})}
              >
                <div className={classes.features}>
                  <ApartmentRoundedIcon style={{ color: "#ce7c39" ,fontSize:"30px"}} />
                  Nearby Hotel Count
                  <div className={classes.countTxt}>
                        {factorDetails?.nearByHotelCount}
                </div>
                </div>
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1400 } : {})}
              >
                <div className={classes.features}>
                  <StarRoundedIcon style={{ color: "#e2da5f",fontSize:"30px" }} />
                  Nearby Hotel Reviews
                  <div className={classes.countTxt}>
                        {factorDetails?.nearByHotelReviewCount}
                </div>
                </div>
                
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 500 } : {})}
              >
                <div className={classes.features}>
                  <GiPathDistance
                    style={{ color: "#df5e52",fontSize:"30px" }}
                  />
                  DistanceTo The City
                  
                <div className={classes.countTxt}>
                        {factorDetails?.DistanceToCity}km
                </div>
                </div>
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 800 } : {})}
              >
                <div className={classes.features}>
                  <HiShoppingBag
                    style={{ color: "#2f9f48",fontSize:"30px" }}
                  />
                  Shopping Malls 
                  
                <div className={classes.countTxt}>
                        {factorDetails?.ShoppingMallsCount}
                </div>
                </div>
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1100 } : {})}
              >
                <div className={classes.features}>
                  <IoMdSchool style={{ color: "#ce7c39",fontSize:"30px" }} />
                  Education Related Places 
                  
                <div className={classes.countTxt}>
                        {factorDetails?.EducationRelatedPlacesCount}
                </div>
                </div>
              </Grow>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1400 } : {})}
              >
                <div className={classes.features}>
                  <MdWork style={{ color: "#4e4c2e",fontSize:"30px"}} />
                  Work Places 
                  
                <div className={classes.countTxt}>
                        {factorDetails?.WorkPlacesCount}
                </div>
                </div>
              </Grow>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
            }}
          >
            {isLoaded ? (
              <div>
                <GoogleMap
                  center={center}
                  zoom={zoom}
                  mapContainerStyle={{
                    borderRadius: "8px",
                    height: "35vh",
                  }}
                >
                  {position && <MarkerF position={position} />}
                </GoogleMap>
              </div>
            ) : (
              <div>
                Loading...
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultsFD;
