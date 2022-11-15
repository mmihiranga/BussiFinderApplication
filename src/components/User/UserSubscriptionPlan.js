import styled from "@emotion/styled";
import { Margin } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DATA from '../../assets/data/subscriptionPlan'

const UseStyles = makeStyles((theme) => ({
  pricingBoxMost: {
    width: "fit-content",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "5px",
    paddingInline: "25px",
    backgroundColor: "#151649",
    borderRadius: "20px",
    paddingBlock: "28px",
    boxShadow: "0px 1px 10px 0px #888888",
    backgroundImage: `url(${require("../../images/priceSvg.svg").default})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
  },
  priceMonthTxtMost: {
    color: "#E4E6F1",
    fontSize: "1rem",
  },
  priceTxtMost: {
    color: "#E4E6F1",
    fontSize: "28px",
    fontWeight: "500",
  },
  planDescTxtMost: {
    color: "#fff",
    fontSize: "14px",
    marginBottom: "10px",
    width: "300px",
    whiteSpace: "wrap",
  },
  planItemsMost: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "10px",
    marginBlock: "5px",
  },
  planIconMost: {
    color: "#E4E6F1",
    backgroundColor: "#adadad3b",
    padding: "3px",
    borderRadius: "50%",
  },
  planItemTxtMost: {
    color: "#E4E6F1",
    fontSize: "14px",
  },
  planTypeTxtMost: {
    color: "#E4E6F1",
    fontSize: "19px",
    fontWeight: "600",
  },
  popularTxtMost: {
    color: "#dab23b",
    fontSize: "10px",
    fontWeight: "200",
    backgroundColor: "#23206e",
    paddingInline: "10px",
    paddingBlock: "5px",
    borderRadius: "30px",
    textTransform: "Uppercase",
    alignSelf: "flex-end",
  },
  titleTxt: {
    color: "#231D4F",
    fontSize: "29px",
    fontWeight: "600",
    marginBlock: "1rem",
  },
  subTxt: {
    color: "#888888",
    fontSize: "14px",
    fontWeight: "400",
    marginBottom: "1rem",
  },
  PlanTitleTxt: {
    color: "#231D4F",
    fontSize: "25px",
    fontWeight: "600",
    marginBlock: "1rem",
  },
  planIcon: {
    color: "#282138",
    backgroundColor: "#adadad3b",
    padding: "3px",
    borderRadius: "50%",
  },
  bodyTxt: {
    marginBottom: "2px",
    whiteSpace: "nowrap",
  },
  PlanDetailsTxt: {
    color: "#231D4F",
    fontSize: "25px",
    fontWeight: "600",
    marginBlock: "0.5rem",
    marginInline: "3rem",
    whiteSpace: "nowrap",
  },
}));

const MostPlanButton = styled(Button)(({ theme }) => ({
  width: "170px",
  marginTop: "20px",
  color: "#d29f1c",
  borderRadius: "30px",
  textTransform: "none",
  fontSize: "12px",
  boxSizing: "border-box",
  alignSelf: "center",
  paddingBlock: "8px",
  /* "to left" / "to right" - affects initial color */
  background: "linear-gradient(to left, #eac0732e 50%, #fbc1547c 50%) right",
  backgroundSize: "200%",
  transition: ".5s ease-out",
  "&:hover": {
    backgroundPosition: "left",
  },
}));

const UserSubscriptionPlan = () => {
  const classes = UseStyles();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userDetails);
  const [predictionNo, setPredictionNo] = React.useState(0);

  useEffect(() => {
    for(let i=0; i<DATA.length; i++){
      if(DATA[i].plan === userInfo?.subscriptionPlan){
        console.log(DATA[i].plan)
        setPredictionNo(DATA[i].locationPredictCount)
      }
    }
  },[userInfo])
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E4E6F1",
        paddingBlock: "50px",
      }}
    >
      <div className={classes.titleTxt}>Simple, transparent pricing</div>
      <div className={classes.subTxt}>No contracts. No surprise fees.</div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row-reverse",
          gap: "70px",
          height: "100%",
          width: "100%",
          padding: "2rem",
          paddingInline: "13rem",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            borderRadius: "20px",
            border: "1px solid #888888",
            gap: "20px",
            padding: "2rem",
            paddingBlock: "3rem",
          }}
        >
          <div className={classes.PlanDetailsTxt}>Your Plan Details</div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIcon} />
            <div className={classes.bodyTxt}>Status - {userInfo?.subscriptionStatus} </div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIcon} />
            <div className={classes.bodyTxt}>Prediction Limit - {userInfo?.predictionCount} </div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIcon} />
            <div className={classes.bodyTxt}>Compare Location Limit - {userInfo?.compareCount} </div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIcon} />
            <div className={classes.bodyTxt}>Location Based Limit - {userInfo?.locationPredictCount} </div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIcon} />
            <div className={classes.bodyTxt}>Activate Date - {userInfo?.subscriptionDate} </div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIcon} />
            <div className={classes.bodyTxt}>Expire Date - {(userInfo?.subscriptionEndDate)}</div>
          </div>
        </Box>

        {DATA.map((item, index) => (
            item.plan === userInfo.subscriptionPlan && (
        <Box className={classes.pricingBoxMost} key={index}>
          <div className={classes.popularTxtMost}>{item.plan}</div>
          <div className={classes.priceMonthTxtMost}>
            <span className={classes.priceTxtMost}>{item.price}$</span> /{item.type}
          </div>
          <div className={classes.planTypeTxtMost}>{item.plan}</div>
          <div className={classes.planDescTxtMost}>
            {item.description}
          </div>
          {item.features.map((feature, i) => (
            <div className={classes.planItemsMost} key={i}>
              <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>{feature}</div>
            </div>
          ))}
          <MostPlanButton onClick={()=> navigate("/Pricing") }> Change Plan </MostPlanButton>
        </Box>)))}
      </Box>
    </Box>
  );
};
export default UserSubscriptionPlan;
