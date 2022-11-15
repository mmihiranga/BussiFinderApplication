import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import api from "../../api";

export const ReportDownload = ({ids,setDataToReport}) => {
  const [dataReport, setDataReport] = useState([]);

  useEffect(() => {
   
    setDataToReport(false)
    
        for(let i=0;i<ids.length;i++){
            api.get(`/user/${ids[i]}`).then((response) => {
                console.log(response.data)
                setDataReport(response.data);
              });
            
        }
   
    console.log(dataReport)
    handleDownload(dataReport);
  }, [ids]);

  const doc = new jsPDF();

  const handleDownload = (data) => {
    console.log(data.length)
  for (let i = 0; i < data.length; i++) {
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
    doc.text(`Type : ${data.value[0].type}`, 20, 30);
    doc.text(`Latitude : ${data.value[0].latitude}`, 20, 40);
    doc.text(`Longitude : ${data.value[0].longitude}`, 20, 50);
    doc.text(
      `AttractionPlaces Count : ${data.value[0].locationFeatures.attractionPlacesCount}`,
      20,
      60
    );
    doc.text(
      `Transportation Modes Count : ${data.value[0].locationFeatures.transportationModesCount}`,
      20,
      70
    );
    doc.text(
      `Nearby Hotel Review Count : ${data.value[0].locationFeatures.nearByHotelReviewCount}`,
      20,
      80
    );
    doc.setFont("helvetica", "bold");
    doc.text(`Final Prediction : ${data.value[0].ml_result}%`, 20, 90);
    doc.save("Report.pdf");
  }
}
};

 
