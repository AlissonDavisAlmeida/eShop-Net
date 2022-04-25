import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useState } from "react";
import { agents } from "../../app/api/agent";

function AboutPage() {


  

    const [validationErros, setvalidationErros] = useState<string[]>([])


    const getValidationError = () => {
        agents.TestErrors.getValidationError()
    }

    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for Testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agents.TestErrors.get400Error().catch()}>Test 400 Error</Button>
                <Button variant="contained" onClick={() => agents.TestErrors.get401Error().catch()}>Test 401 Error</Button>
                <Button variant="contained" onClick={() => agents.TestErrors.get404Error().catch()}>Test 404 Error</Button>
                <Button variant="contained" onClick={() => agents.TestErrors.get500Error().catch()}>Test 500 Error</Button>
                <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
        </Container>
    );
}

export default AboutPage;