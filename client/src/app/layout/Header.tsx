import { AppBar, Box, CssBaseline, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
    children: React.ReactElement
}

function HideOnScroll(props: Props) {

    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}



function Header(props : Props) {
    return (

        <Box sx={{
            display: { xs: 'column', md: 'row' },
            flexGrow: 1,
            mb:10
        }}>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <IconButton size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4">
                            E-Shop
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </Box>
    );
}

export default Header;