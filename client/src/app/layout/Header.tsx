import { AppBar, Box, CssBaseline, IconButton, Slide, Switch, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MaterialUISwitch } from "../../components/MuiSwitch";

interface Props {
    children: React.ReactElement,
    setTheme : ()=>void,
    dark: boolean
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
                    <MaterialUISwitch checked={props.dark} onChange={()=>props.setTheme()}/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </Box>
    );
}

export default Header;