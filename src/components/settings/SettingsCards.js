import React from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
import {styled} from "@mui/system";

// CSS
import "./Settings.css";

const SettingsCards = () => {
    const CardContainer = styled("div")({
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2rem",
    });

    const CardWrapper = styled(Card)({
        width: "100%",
        minWidth: "22rem",
        cursor: "pointer",
        textAlign: "center",
        "&:hover": {
            boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
        },
    });

    const CardLink = styled(Link)({
        textDecoration: "none",
        color: "inherit",
    });

    return (
        <CardContainer className="settings-cards">
            <CardWrapper>
                <CardLink to="/settings/categories">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Categories
                        </Typography>
                    </CardContent>
                </CardLink>
            </CardWrapper>
            <CardWrapper>
                <CardLink to="/settings/severity">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Severity
                        </Typography>
                    </CardContent>
                </CardLink>
            </CardWrapper>
            <CardWrapper>
                <CardLink to="/settings/status">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Status
                        </Typography>
                    </CardContent>
                </CardLink>
            </CardWrapper>
            <CardWrapper>
                <CardLink to="/settings/other">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Other
                        </Typography>
                    </CardContent>
                </CardLink>
            </CardWrapper>
        </CardContainer>
    );
};

export default SettingsCards;
