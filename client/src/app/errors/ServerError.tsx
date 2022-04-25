import { Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

function ServerError() {


    const history = useHistory()
    const { state } = useLocation<any>()
    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant="h3" color={"error"} gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state?.error.detail || "Internal Server error"}</Typography>
                </>
            ) : (

            <Typography variant="h5" gutterBottom>Server Error</Typography>
            )}
        </Container>
    );
}

export default ServerError;