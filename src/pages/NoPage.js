import React from "react";
import { Button } from '@mui/material';

// components

const NoPage = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="notFound-page">
            <main>
                <h1 className="h1-404">404</h1>
                <h2 className="h2-404">UH OH! You're lost.</h2>
                <p>The page you are looking for does not exist. How you got here is a mystery.</p>
                <p>But you can click the button below to go back.</p>
                <Button onClick={goBack}>GO BACK</Button>
            </main>
        </div>
    );
};

export default NoPage;
