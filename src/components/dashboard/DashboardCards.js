import React from "react";
import "./Dashboard.css";
import {Card, CardContent, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {AutoAwesomeMotion, CheckCircle, People, Error} from "@mui/icons-material";

const DashboardCards = () => {
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
                        <AutoAwesomeMotion fontSize="large"/>
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
                        <People fontSize="large"/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Active Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        328
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
            <CardWrapper>
                <CardContentWrapper>
                    <IconContainer>
                        <Error fontSize="large"/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Reported Issues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        452
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
            <CardWrapper>
                <CardContentWrapper>
                    <IconContainer>
                        <CheckCircle fontSize="large"/>
                    </IconContainer>
                    <Typography gutterBottom variant="h5" component="div">
                        Resolved Issues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        410
                    </Typography>
                </CardContentWrapper>
            </CardWrapper>
        </CardContainer>
    );
};

export default DashboardCards;
