import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import {Card, CardContent, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {AutoAwesomeMotion, CheckCircle, People, Error} from "@mui/icons-material";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const DashboardCards = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [totalRequests, setTotalRequests] = useState(null);
    const [finishedRequests, setFinishedRequests] = useState(null);

    useEffect(() => {
        axios
            .get("/admin/dashboard-analytics/",
                // {
                //     headers: {
                //         "authorization" : localStorage.getItem("token")
                //     }
                // }
            )
            .then((response) => {
                setUserData(response.data.userData[0].usercount);
                setTotalRequests(response.data.totalRequests[0].totalrequests);
                setFinishedRequests(response.data.finishedRequests[0].finishedrequests);
            })
            .catch((error) => {
                if(error.response?.status === 401) {
                    navigate("/not-found");
                }
                console.log(error);
            });
    }, []);

    const CardContainer = styled("div")({
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "2rem",
    });

    const CardWrapper = styled(Card)({
        width: "100%",
        maxWidth: "22rem",
    });

    const CardContentWrapper = styled(CardContent)({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    });

    const IconContainer = styled("div")({
        marginBottom: "1rem",
    });

    return (
        <CardContainer className="analytic-cards">
            <CardWrapper>
                <CardContentWrapper>
                    <IconContainer>
                        <AutoAwesomeMotion fontSize="large" style={{ color: "rgb(104,104,196)" }}/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Most Common Issues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Traffic, Greenery, Waste management
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
            <CardWrapper>
                <CardContentWrapper>
                    <IconContainer>
                        <People fontSize="large" style={{ color: "rgb(206,196,5)" }}/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Active Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userData !== null ? userData : "Loading..."}
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
            <CardWrapper>
                <CardContentWrapper>
                    <IconContainer>
                        <Error fontSize="large" style={{ color: "rgb(217,39,39)" }}/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Reported Issues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {totalRequests !== null ? totalRequests : "Loading..."}
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
            <CardWrapper>
                <CardContentWrapper>
                    <IconContainer>
                        <CheckCircle fontSize="large" style={{ color: "rgb(47,124,22)" }}/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Resolved Issues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {finishedRequests !== null ? finishedRequests : "Loading..."}
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
        </CardContainer>
    );
};

export default DashboardCards;
