import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
    titleTxt: {
        fontSize: "26px",
        fontWeight: 600,
        color:  '#3e3d3d',
        alignSelf: "flex-start",
        marginLeft:"600px",
        padding: "50px",
        
    },
    subTitleTxt: {
        fontSize: "18px",
        fontWeight: 400,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',

    },
    bodyTxt: {
        fontSize: "14px",
        fontWeight: 400,
        color:'#3e3d3d',
        paddingBottom: '10px',
        width: "70%",
        marginLeft:"250px",
         marginRight:"100px"
    },
    gMap: {


    },
    featureTitleTxt: {
        fontSize: "18px",
        fontWeight: 600,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
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
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
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
        width: "70%",
        height: "60px",
        backgroundColor: themeColor => themeColor.status == 'dark' ? '#4c4c4c' : '#e8e8e8',
        borderRadius: "8px",
        boxSizing: "border-box",
        display: 'inline-flex',
        gap: "10px",
        alignItems: "center",
        padding: "10px",
        boxShadow: "0px 0px 5px 0px rgba(234,234,234,0.2)",
         marginLeft:"230px",
        // marginRight:"300px"

    },
});
export default function GroceryTips(){
    const themeColor = useSelector((state) => state.theme.value);
    const classes = useStyles(themeColor);
 return(
    <Box className={classes.featuresBoxFlex}>
                                <div className={classes.titleTxt}>Grocery Tips</div>
                                <Box sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    padding: "20px",
                                    display: "grid",
                                    rowSpacing: "10px",
                                    alignItems: "center",
                                    gap: "10px",
                                   
                                }}>
                                <div className={classes.features} >Choose the right business model</div>
                               
                                {/* <div className={classes.features}> Create a business plan</div>
                                <div className={classes.features}> Pick a suitable location</div>
                                <div className={classes.features}> Hire the right staff </div>
                                <div className={classes.features}> Get all the legal formalities done</div> */}
                                </Box>
                                <div className={classes.bodyTxt} >
                                If you are low on investment while planning to open a grocery shop, 
                                you must always pay close attention to choosing the right business model.
                                For instance, you can initially start with a small grocery shop and then 
                                keep on expanding your shop operations once you start earning huge profits.
                                In addition to this, you should also consider ownership status like whether 
                                you want to open a grocery shop as a sole proprietor or as a partnership firm.</div>

                                <Box sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    padding: "20px",
                                    display: "grid",
                                    rowSpacing: "10px",
                                    alignItems: "center",
                                    gap: "10px",
                                   
                                }}>
                                <div className={classes.features} >Create a business plan </div>
                                

                                {/* <div className={classes.features}> Create a business plan</div>
                                <div className={classes.features}> Pick a suitable location</div>
                                <div className={classes.features}> Hire the right staff </div>
                                <div className={classes.features}> Get all the legal formalities done</div> */}
                                </Box>
                                <div className={classes.bodyTxt} >
                                Devising a business plan is again the most significant step if you wish to open a 
                                grocery shop with low investments. By formulating a plan, you can always understand 
                                how much capital you own to start a grocery shop, how to target your customers, and 
                                how to earn more profits. Apart from this, you should also spend some time analysing 
                                your competitors and planning a better marketing strategy to remain ahead of your rivals. </div>

                                <Box sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    padding: "20px",
                                    display: "grid",
                                    rowSpacing: "10px",
                                    alignItems: "center",
                                    gap: "10px",
                                   
                                }}>
                                <div className={classes.features} >Pick a suitable location </div>
                                

                                {/* <div className={classes.features}> Create a business plan</div>
                                <div className={classes.features}> Pick a suitable location</div>
                                <div className={classes.features}> Hire the right staff </div>
                                <div className={classes.features}> Get all the legal formalities done</div> */}
                                </Box>
                                <div className={classes.bodyTxt} >
                                The location of your grocery shop is crucial as the client base varies from one place 
                                to another. Also, the grocery items used in metropolitan cities would always differ from 
                                the items used in rural areas.Hence, it is significant for you to identify the right location 
                                that does not hold many competitors to run your grocery shop successfully. 
                                Also, a good shop location is essential as it will guarantee you get a considerable amount of footfall every day. </div>

                                <Box sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    padding: "20px",
                                    display: "grid",
                                    rowSpacing: "10px",
                                    alignItems: "center",
                                    gap: "10px",
                                   
                                }}>
                                <div className={classes.features} >Hire the right staff </div>
                                

                                {/* <div className={classes.features}> Create a business plan</div>
                                <div className={classes.features}> Pick a suitable location</div>
                                <div className={classes.features}> Hire the right staff </div>
                                <div className={classes.features}> Get all the legal formalities done</div> */}
                                </Box>
                                <div className={classes.bodyTxt} >
                                Now that you are done with finalising your grocery shop location, the next thing that 
                                you would require to do is hire the right staff.Furthermore, if you are starting a grocery 
                                shop with a low investment amount, you can initially hire just 1 or 2 staff members and then 
                                increase your team once you start earning some profits.</div>

                                <Box sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    padding: "20px",
                                    display: "grid",
                                    rowSpacing: "10px",
                                    alignItems: "center",
                                    gap: "10px",
                                   
                                }}>
                                <div className={classes.features} >Get all the legal formalities done </div>
                                
                                </Box>
                                <div className={classes.bodyTxt} >
                                To run a grocery shop without any hassle, you should always complete all the legal 
                                formalities timely while opening a grocery shop in India. To start with, you should always get your shop registered. 
                                Also, if you have taken the premises on rent, always make a rent agreement that includes all the details like the 
                                maintenance charges, rent, renewal terms, etc. to save a lot of expenses in the future.In addition, to run a grocery 
                                business, you will also require a trade license and a GST registration number if your annual turnover exceeds Rs 20 lakhs. </div>

                                <Box sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "30px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                    padding: "20px",
                                    display: "grid",
                                    rowSpacing: "10px",
                                    alignItems: "center",
                                    gap: "10px",
                                   
                                }}>
                                <div className={classes.features} >Market your business effectively </div>
                                
                                </Box>
                                <div className={classes.bodyTxt} >
                                Once you get done with the business loan formalities, you must shift your entire focus 
                                towards planning effective marketing strategies to take your grocery shop business to a 
                                whole new level and earn huge profits.To market your business effectively, you can take 
                                the help of online platforms and must allocate some of your funds strictly for advertising 
                                purposes.  </div>


                                
      </Box>                          
    // <React.Fragment>
    // <Typography variant="h6" gutterBottom>
    //     Grocery Tips
    // </Typography>
    
    //     <List disablePadding sx={{ paddingInline: 2 }}>
    //         <ListItem sx={{ py: 1, px: 0 }}>
    //             sfsfsffssf
    //         </ListItem>

    //         <ListItem sx={{ py: 1, px: 0 }}>
    //             {/* <TbTruckDelivery style={{ color: '#344ab1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Delivery Service" />
    //             <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.delivery ? `Available` : `Not Available`}</Typography> */}
    //         </ListItem>

    //         <ListItem sx={{ py: 1, px: 0 }}>
    //             {/* <BiWorld style={{ color: '#4534b1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="WebSite Availability" />
    //             <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.web ? `Available` : `Not Available`}</Typography> */}
    //         </ListItem>

    //         <ListItem sx={{ py: 1, px: 0 }}>
    //             {/* <RiParkingBoxLine style={{ color: '#b13434', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Parking Availabily" />
    //             <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.parking ? `Available` : `Not Available`}</Typography> */}
    //         </ListItem>

    //         <ListItem sx={{ py: 1, px: 0 }}>
    //             {/* <AiFillCalendar style={{ color: '#34b13f', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Available Days" /> */}
    //         </ListItem>
           
    //     </List> :
        
           

// </React.Fragment>
 )
}