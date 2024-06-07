import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "@mui/icons-material/FitnessCenter";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				outlined: {
					color: "white",
					borderColor: "white",
					"&:hover": {
						backgroundColor: "white",
						color: "black",
						borderColor: "white",
					},
				},
			},
		},
	},
});

function ResponsiveAppBar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleClick = () => {
		logout();
	};

	return (
		<AppBar position="sticky" className="px-4" sx={{ bgcolor: "black" }}>
			<Toolbar disableGutters>
				<Logo sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
				<Link to="/">
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						EasyFit
					</Typography>
				</Link>

				<Logo sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
				<Typography
					variant="h5"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: "flex", md: "none" },
						flexGrow: 1,
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					EasyFit
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<ThemeProvider theme={theme}>
					{user ? (
						<div>
							<Button type="submit" variant="outlined" sx={{ mr: 2, borderRadius: "16px" }} onClick={handleClick}>
								Logout
							</Button>
						</div>
					) : (
						<div>
							<Link to="/login">
								<Button
									type="submit"
									sx={{
										color: "white",
										mr: 2,
										"&:hover": {
											backgroundColor: "white",
											color: "black",
										},
										borderRadius: "16px",
									}}
								>
									Login
								</Button>
							</Link>
							<Link to="/signup">
								<Button type="submit" variant="outlined" sx={{ mr: 2, borderRadius: "16px" }}>
									Sign Up
								</Button>
							</Link>
						</div>
					)}
				</ThemeProvider>
			</Toolbar>
		</AppBar>
	);
}
export default ResponsiveAppBar;
