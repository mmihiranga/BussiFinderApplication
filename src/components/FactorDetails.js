import React,{ useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Map from './Map';
import { FillingBottle } from "react-cssfx-loading";
import { TypeAnimation } from "react-type-animation";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import API from '../api';
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import  {factorDetailsInfo}  from "../features/factorDetails";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const NextBtn = styled(Button)(() => ({
    height: "40px",
    width: "110px",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "6px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "plex-sans, sans-serif",
    outline: "none",
    cursor: "pointer",
    textTransform: "none",
    elevation: "1",
    marginTop: "26px",
    alignSelf: "flex-end",
    /* "to left" / "to right" - affects initial color */
    background: 'linear-gradient(to left, #302954 50%, #252744 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },
}));
const useStyles = makeStyles((theme) => ({
    titleTxt:{
        color:'#231D4F',
        fontSize:'29px',
        fontWeight:'600',
        marginBottom:'1rem'
    },
    subTxt:{
        color:'#888888',
        fontSize:'14px',
        fontWeight:'400',
        marginBottom:'1rem'
    },
}));
const FactorDetails = () => {
const theme = createTheme();
const classes = useStyles();
const businessDetails = useSelector((state) => state.business);
const userInfo = useSelector((state) => state.user.userDetails);
const themeColor = useSelector((state) => state.theme.value);
const [isLoading, setIslLoading] = useState(false);
const [error, setError] = React.useState(false);
const [errorMsg, setErrorMsg] = React.useState("Error");
const [selectRadius, setSelectRadius] = React.useState(1000);
const dispatch = useDispatch();
let navigate = useNavigate();



const headers = {
    headers: {
        'x-access-token': localStorage.getItem('token')
    }
};

const handleChangeMenu = (event) => {
    setSelectRadius(event.target.value);
}

const handleCheckLogin = () => {
    console.log(userInfo ? true : false);
    if(userInfo){
        return true;
    }else{
        return false;
    }
}

const handleNext = () => {
    if(!handleCheckLogin()){
        setErrorMsg('Please login to continue');
        handleError();
    }
   else if (
        businessDetails?.value[0]?.latitude &&
        businessDetails?.value[0]?.longitude
      ) {
    console.log("next")
    setIslLoading(true);
    let body = {
        "latitude": businessDetails.value[0].latitude,
        "longitude": businessDetails.value[0].longitude,
        "radius": selectRadius
    }

    
    API.post('areaDetails/getAreaTransportationModesCount', body, headers).then(function (transportModesResult) {
        API.post('areaDetails/getAreaAllAttractionPlaces', body, headers).then(function (attractionplacesResult) {
            API.post('areaDetails/getAreaNearByHotels', body, headers).then(function (nearByHotelResult) {
                API.post('areaDetails/getAreaBusinessCount', body, headers).then(function (nearByBusinessResult) {
                    API.post('areaDetails/getAreaDistanceToCity', body, headers).then(function (nearByDistanceToCityResult) {
                        API.post('areaDetails/getAreaEducationRelatedPlacesCount', body, headers).then(function (EducationRelatedPlacesResult) {
                            API.post('areaDetails/getAreaWorkPlacesCount', body, headers).then(function (nearByWorkPlacesResult) {
                                API.post('areaDetails/getAreaShoppingMallsCount', body, headers).then(function (nearByShoppingMallsResult) {
                                    API.post('areaDetails/getAreaRestaurentCount', body, headers).then(function (restaurentCountResult) {

                                let distance = nearByDistanceToCityResult.data.split(' ');

                                // let transportationModesCount = transportModesResult.data.transportationmodes_count;
                                // let attractionPlacesCount = attractionplacesResult.data.attractionplaces_count;
                                // let nearByHotelReviewCount = nearByHotelResult.data.rating_count;
                                // let businessCompetitors = nearByBusinessResult.data.business_competitors;
                                // let EducationRelatedPlacesCount = EducationRelatedPlacesResult.data.totalEducationRelatedPlacesCount;
                                // let WorkPlacesCount = nearByWorkPlacesResult.data.totalWorkPlacesCount;
                                // let ShoppingMallsCount = nearByShoppingMallsResult.data.totalShoppingMallsCount;
                                // let DistanceToCity = parseFloat(distance[0]);
                                // console.log("API Result", transportationModesCount, attractionPlacesCount, nearByHotelReviewCount, competitors, businessDetails.value[0].serviceDetails);
                                console.log(nearByBusinessResult.data)
                                let factorFeatures = {
                                    "attractionPlacesCount": attractionplacesResult.data.attractionplaces_count,
                                    "transportationModesCount": transportModesResult.data.transportationmodes_count,
                                    "nearByHotelCount": nearByHotelResult.data.hotel_count,
                                    "nearByRestaurentCount":restaurentCountResult.data.totalRestaurantsCount,
                                    "nearByHotelReviewCount": nearByHotelResult.data.rating_count,
                                    "businessCompetitors" : (nearByBusinessResult.data),
                                    "EducationRelatedPlacesCount" : EducationRelatedPlacesResult.data.totalEducationRelatedPlacesCount,
                                    "WorkPlacesCount" : nearByWorkPlacesResult.data.totalWorkPlacesCount,
                                    "ShoppingMallsCount" : nearByShoppingMallsResult.data.totalShoppingMallsCount,
                                    "DistanceToCity" : parseFloat(distance[0])
                                }
                                console.log(factorFeatures);
                                dispatch(factorDetailsInfo(factorFeatures));
                                setIslLoading(false)
                                navigate('/ResultsFactorDetails');
                            }).catch(function (error) {
                                return error;
                            });
                }).catch(function (error) {
                    return error;
                });
                }).catch(function (error) {
                    return error;
                });
            }).catch(function (error) {
                return error;
            });
        }).catch(function (error) {
            return error;
        });
    }).catch(function (error) {
        return error;
    });

                }).catch(function (error) {
                    return error;
                });
        }).catch(function (error) {
            return error;
        })
    }).catch(function (error) {
        return error;
    })
    } else {
        setErrorMsg("Please select a location");
        handleError();
    }

}
const handleError = () => {
    setError(true);
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);

const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event) => {
if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
}

setOpen(false);
};



// return focus to the button when we transitioned from !open -> open
const prevOpen = React.useRef(open);
React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
    anchorRef.current.focus();
    }
    prevOpen.current = open;
}, [open]);
return (
    <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',
            width:'100%',
            backgroundColor:'#E4E6F1',
            padding:'2rem',
            paddingInline:'10rem',
            boxSizing:'border-box',
        }}
    > 
      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {errorMsg}
        </Alert>
        </Snackbar>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            boxSizing:'border-box',
            width:'100%',
            height:'100%',
        }}
        >
            <div className={classes.titleTxt}>Predict, the success of your new business</div>
            <div className={classes.subTxt}>Select a method from below two types according to your need.</div>
            {!isLoading  ?
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth={"md"} sx={{ p: 8 ,boxSizing:"border-box",}}>
                    <Paper variant="outlined" 
                    sx={{
                    p: 3,
                    border:'none',
                    borderRadius:"15px",
                    boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
                    boxSizing:"border-box",
                    display:"flex",
                    flexDirection:"column",
                    }}>
                        
                <div>
                    <Map/>
                </div>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" my={2}>
                <FormControl sx={{  minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Area Radius (m)</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth-label"
                        label="Area Radius"
                        value={selectRadius}
                        onChange={handleChangeMenu}
                        defaultValue={selectRadius}
                    >
                        <MenuItem value={500}>500</MenuItem>
                        <MenuItem value={750}>750</MenuItem>
                        <MenuItem value={1000}>1000</MenuItem>
                        <MenuItem value={1250}>1250</MenuItem>
                        <MenuItem value={1500}>1500</MenuItem>
                    </Select>
                    </FormControl>
                        <NextBtn  color="primary" onClick={()=> handleNext()} sx={{float:"right"}}>Proceed</NextBtn>
                    </Stack>
            </Paper>
            </Container>
        </ThemeProvider>
        :
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#65646e",
            color: "black",
            gap: 2,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boxSizing: "border-box",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
            padding: "10px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
          }}
        >
          <FillingBottle
            color="#101554"
            width="50px"
            height="50px"
            duration="3s"
          />
          <TypeAnimation
            sequence={[
              "Loading", // Types 'One'
              2000, // Waits 1s
              "Analyzing Hotel", // Deletes 'One' and types 'Two'
              4000, // Waits 2s
              "Finalizing the Result.", // Types 'Three' without deleting 'Two'
              () => {
                console.log("Done typing!"); // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "2em", color: "#101554" }}
          />
        </Box>
}
        </Box>
    </Box>
)
}

export default FactorDetails