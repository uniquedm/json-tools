import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid2,
    Typography,
    useTheme,
    Stack,
    Button,
    alpha,
} from "@mui/material";
import {
    DataObject,
    Build,
    Security,
    Category,
    GitHub,
    ArrowForward,
    RocketLaunch
} from "@mui/icons-material";
import { Utility } from "../types/UtilityInterace";
import { Link } from "@mui/material";

interface LandingPageProps {
    setUtility: (utility: Utility) => void;
    allUtilities: { [key: string]: Utility };
}

const categoryIcons: { [key: string]: React.ReactNode } = {
    "JSON Tools": <DataObject fontSize="inherit" />,
    "Utilities": <Build fontSize="inherit" />,
    "JWT Tools": <Security fontSize="inherit" />,
    "Other": <Category fontSize="inherit" />,
};

export default function LandingPage({ setUtility, allUtilities }: LandingPageProps) {
    const theme = useTheme();
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const words = ["formatting", "validating", "manipulating"];

    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const currentWord = words[wordIndex];

        const type = () => {
            if (isDeleting) {
                setText(prev => prev.slice(0, -1));
            } else {
                setText(prev => currentWord.slice(0, prev.length + 1));
            }
        };

        let timeout: NodeJS.Timeout;

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(type, isDeleting ? 50 : 50);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    const handleGetStarted = () => {
        // Find the JSON Editor utility
        const jsonEditor = Object.values(allUtilities).find(u => u.toolName === "JSON Editor");
        if (jsonEditor) {
            setUtility(jsonEditor);
            window.scrollTo(0, 0);
        }
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'relative',
                minHeight: '100%',
                overflow: 'hidden',
                // Dynamic Background
                background: theme.palette.mode === 'dark'
                    ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${alpha(theme.palette.primary.main, 0.15)}, transparent 80%)`
                    : `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${alpha(theme.palette.primary.main, 0.1)}, transparent 80%)`,
            }}>
            {/* Dot Pattern Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: theme.palette.mode === 'dark'
                    ? `radial-gradient(${alpha(theme.palette.text.primary, 0.1)} 1px, transparent 1px)`
                    : `radial-gradient(${alpha(theme.palette.text.primary, 0.1)} 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                pointerEvents: 'none',
            }} />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 0.5,
                            borderRadius: 50,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            mb: 2,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                    >
                        <RocketLaunch fontSize="small" />
                        <Typography variant="caption" fontWeight="bold">
                            v1.0.0 Now Available
                        </Typography>
                    </Box>

                    <Typography
                        variant="h1"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
                            backgroundSize: '200% auto',
                            backgroundClip: "text",
                            textFillColor: "transparent",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 1,
                            letterSpacing: "-0.04em",
                            animation: 'gradient 5s ease infinite',
                            filter: theme.palette.mode === 'dark'
                                ? `drop-shadow(0 0 30px ${theme.palette.primary.main}60)`
                                : `drop-shadow(0 0 30px ${theme.palette.primary.main}40)`,
                            "@keyframes gradient": {
                                "0%": { backgroundPosition: "0% 50%" },
                                "50%": { backgroundPosition: "100% 50%" },
                                "100%": { backgroundPosition: "0% 50%" },
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2
                        }}
                    >
                        JSON TOOLS <DataObject fontSize="inherit" sx={{ color: theme.palette.text.primary }} />
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{
                            maxWidth: "800px",
                            mx: "auto",
                            lineHeight: 1.6,
                            opacity: 0.9,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            fontWeight: 400,
                            mb: 4
                        }}
                    >
                        The ultimate developer toolkit for <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>{text}<span style={{ opacity: 0.5 }}>|</span></Box> JSON data.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleGetStarted}
                        endIcon={<ArrowForward />}
                        sx={{
                            px: 4,
                            py: 1,
                            borderRadius: 50,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 12px 24px -4px ${alpha(theme.palette.primary.main, 0.6)}`,
                            }
                        }}
                    >
                        Get Started
                    </Button>
                </Box>

                <Grid2 container spacing={3} alignItems="flex-start">
                    {Object.entries(
                        Object.values(allUtilities)
                            .filter((utility) => utility.toolName !== "Home")
                            .reduce((acc, utility) => {
                                const category = utility.category || "Other";
                                if (!acc[category]) {
                                    acc[category] = [];
                                }
                                acc[category].push(utility);
                                return acc;
                            }, {} as { [key: string]: Utility[] })
                    ).map(([category, utilities]) => (
                        <Grid2 size={{ xs: 12, md: 4 }} key={category}>
                            <Box sx={{ mb: 1 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{
                                        mb: 2,
                                        display: "inline-flex",
                                        p: 0.75,
                                        pr: 2,
                                        borderRadius: 50,
                                        background: theme.palette.mode === 'dark'
                                            ? alpha(theme.palette.background.paper, 0.4)
                                            : alpha(theme.palette.background.paper, 0.6),
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${theme.palette.divider}`,
                                        boxShadow: theme.shadows[1],
                                    }}
                                >
                                    <Box sx={{
                                        color: theme.palette.primary.main,
                                        display: 'flex',
                                        p: 0.75,
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                        fontSize: '1.25rem'
                                    }}>
                                        {categoryIcons[category] || <Category fontSize="inherit" />}
                                    </Box>
                                    <Typography
                                        variant="subtitle2"
                                        component="h2"
                                        sx={{
                                            fontWeight: 800,
                                            color: theme.palette.text.primary,
                                            letterSpacing: '0.02em',
                                            textTransform: 'uppercase',
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {category}
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1.5}>
                                    {utilities.map((utility) => (
                                        <Grid2 size={12} key={utility.toolName}>
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    background: theme.palette.mode === 'dark'
                                                        ? alpha(theme.palette.background.paper, 0.4)
                                                        : alpha(theme.palette.background.paper, 0.6),
                                                    backdropFilter: 'blur(20px)',
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: 2,
                                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    "&:hover": {
                                                        transform: "translateY(-2px)",
                                                        boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.15)}`,
                                                        borderColor: alpha(theme.palette.primary.main, 0.3),
                                                        "& .arrow-icon": {
                                                            opacity: 1,
                                                            transform: 'translateX(0)',
                                                        }
                                                    },
                                                }}
                                            >
                                                <CardActionArea
                                                    onClick={() => setUtility(utility)}
                                                    sx={{
                                                        flexGrow: 1,
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        p: 1.5,
                                                        height: '100%'
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            p: 1,
                                                            borderRadius: 1.5,
                                                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                                            color: theme.palette.primary.main,
                                                            mr: 1.5,
                                                            display: 'flex',
                                                            transition: 'transform 0.3s ease',
                                                            ".MuiCard-root:hover &": {
                                                                transform: 'scale(1.1) rotate(5deg)',
                                                            },
                                                            "& svg": {
                                                                fontSize: "1.5rem"
                                                            }
                                                        }}
                                                    >
                                                        {utility.navIcon}
                                                    </Box>
                                                    <CardContent sx={{ p: 0, width: '100%', flexGrow: 1 }}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle2"
                                                            component="h2"
                                                            fontWeight="700"
                                                            sx={{ mb: 0.25, fontSize: '0.9rem' }}
                                                        >
                                                            {utility.toolName}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{
                                                                lineHeight: 1.4,
                                                                opacity: 0.85,
                                                                fontSize: '0.75rem',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden'
                                                            }}
                                                        >
                                                            {utility.tooltip || "Useful tool for JSON operations."}
                                                        </Typography>
                                                    </CardContent>
                                                    <ArrowForward
                                                        className="arrow-icon"
                                                        sx={{
                                                            opacity: 0,
                                                            transform: 'translateX(-10px)',
                                                            transition: 'all 0.3s ease',
                                                            color: theme.palette.primary.main,
                                                            ml: 1,
                                                            fontSize: '1rem'
                                                        }}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>

                <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            opacity: 0.7,
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontSize: '0.7rem',
                            mb: 1.5,
                            display: 'block'
                        }}
                    >
                        Made for developers • Local • Secure
                    </Typography>
                    <Link
                        href="https://github.com/uniquedm"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: 'text.secondary',
                            textDecoration: 'none',
                            opacity: 0.6,
                            transition: 'all 0.2s',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 50,
                            '&:hover': {
                                opacity: 1,
                                color: 'primary.main',
                                bgcolor: alpha(theme.palette.primary.main, 0.05)
                            }
                        }}
                    >
                        <GitHub fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                        <Typography variant="caption" fontWeight="500">uniquedm</Typography>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
