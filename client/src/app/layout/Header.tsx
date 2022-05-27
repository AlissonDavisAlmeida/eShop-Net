import { AppBar, Badge, Box, CssBaseline, IconButton, List, ListItem, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { MaterialUISwitch } from "../../components/MuiSwitch";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";


interface Links {
    title: string
    path: string
}

interface Props {
    children: React.ReactElement,
    setTheme: () => void,
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

const midLinks: Links[] = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
]

const rightLinks: Links[] = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
        color: "#9fa8da"
    },
    "&.active": {
        color: "#ef9a9a"
    }
}

function Header(props: Props) {

    const {cart} = useAppSelector(state => state.cart)

    return (

        <Box sx={{
            display: { xs: 'column', md: 'row' },
            flexGrow: 1,
            mb: 10
        }}>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>

                           {/*  <IconButton size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton> */}
                            <Typography variant="h5" sx={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
                                component={NavLink} to="/" >

                                E-Shop
                            </Typography>

                            <MaterialUISwitch checked={props.dark} onChange={() => props.setTheme()} />
                        </Box>

                        <List sx={{ display: "flex" }}>
                            {midLinks.map((link) => {
                                return (
                                    <ListItem component={NavLink} to={link.path} key={link.path}
                                        sx={navStyles}
                                    >
                                        {link.title.toUpperCase()}
                                    </ListItem>
                                )
                            })}

                        </List>
                        <Box display="flex" alignItems={"center"}>

                            <IconButton size="large" sx={{ color: "inherit" }} component={NavLink} to={"/cart"}>
                                <Badge badgeContent={cart?.items.reduce?.((acc, atual)=>acc + atual.quantity, 0) } color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                            <List sx={{ display: "flex" }}>
                                {rightLinks.map((link) => {
                                    return (
                                        <ListItem component={NavLink} to={link.path} key={link.path}
                                            sx={navStyles}>
                                            {link.title.toUpperCase()}
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </Box>
    );
}

export default Header;