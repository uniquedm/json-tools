import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid2,
    Typography,
    useTheme,
} from "@mui/material";
import { Utility } from "../types/UtilityInterace";

interface LandingPageProps {
    setUtility: (utility: Utility) => void;
    allUtilities: { [key: string]: Utility };
}

export default function LandingPage({ setUtility, allUtilities }: LandingPageProps) {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: "center", mb: 8, mt: 4 }}>
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: "3rem", md: "5rem" },
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                        letterSpacing: "-0.02em",
                    }}
                >
                    JSON Tools
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                        maxWidth: "800px",
                        mx: "auto",
                        lineHeight: 1.6,
                        opacity: 0.8,
                        fontSize: { xs: "1.1rem", md: "1.5rem" },
                        fontWeight: 300,
                    }}
                >
                    The ultimate developer toolkit for <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>formatting</Box>, <Box component="span" sx={{ color: "secondary.main", fontWeight: 600 }}>validating</Box>, and <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>manipulating</Box> JSON data.
                </Typography>
            </Box>

            <Grid2 container spacing={3}>
                {Object.values(allUtilities)
                    .filter((utility) => utility.toolName !== "Home") // Filter out Home utility
                    .map((utility) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={utility.toolName}>
                            <Card
                                elevation={2}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: theme.shadows[8],
                                        borderColor: theme.palette.primary.main,
                                    },
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <CardActionArea
                                    onClick={() => setUtility(utility)}
                                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", p: 2 }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 2,
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                            color: theme.palette.primary.main,
                                            mb: 2,
                                            display: 'flex',
                                        }}
                                    >
                                        {utility.navIcon}
                                    </Box>
                                    <CardContent sx={{ p: 0 }}>
                                        <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">
                                            {utility.toolName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {utility.tooltip || "Useful tool for JSON operations."}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    ))}
            </Grid2>
        </Container>
    );
}
