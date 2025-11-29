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
} from "@mui/material";
import {
    DataObject,
    Build,
    Security,
    Category,
    GitHub
} from "@mui/icons-material";
import { Utility } from "../types/UtilityInterace";
import { Link } from "@mui/material";

interface LandingPageProps {
    setUtility: (utility: Utility) => void;
    allUtilities: { [key: string]: Utility };
}

const categoryIcons: { [key: string]: React.ReactNode } = {
    "JSON Tools": <DataObject fontSize="large" />,
    "Utilities": <Build fontSize="large" />,
    "JWT Tools": <Security fontSize="large" />,
    "Other": <Category fontSize="large" />,
};

export default function LandingPage({ setUtility, allUtilities }: LandingPageProps) {
    const theme = useTheme();
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const words = ["formatting", "validating", "manipulating"];

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
            timeout = setTimeout(type, isDeleting ? 50 : 150);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

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
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
                        backgroundSize: '200% auto',
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                        letterSpacing: "-0.03em",
                        animation: 'gradient 5s ease infinite',
                        filter: theme.palette.mode === 'dark'
                            ? `drop-shadow(0 0 20px ${theme.palette.primary.main}60)`
                            : `drop-shadow(0 0 20px ${theme.palette.primary.main}40)`,
                        "@keyframes gradient": {
                            "0%": { backgroundPosition: "0% 50%" },
                            "50%": { backgroundPosition: "100% 50%" },
                            "100%": { backgroundPosition: "0% 50%" },
                        }
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
                    The ultimate developer toolkit for <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>{text}<span style={{ opacity: 0.5 }}>|</span></Box> JSON data.
                </Typography>
            </Box>

            <Grid2 container spacing={4} alignItems="flex-start">
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
                        <Box sx={{ mb: 2 }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{
                                    mb: 3,
                                    display: "inline-flex",
                                    p: 1,
                                    pr: 3,
                                    borderRadius: 50,
                                    background: theme.palette.mode === 'dark'
                                        ? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                                        : 'linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${theme.palette.divider}`,
                                    boxShadow: theme.palette.mode === 'dark'
                                        ? '0 4px 20px rgba(0,0,0,0.2)'
                                        : '0 4px 20px rgba(0,0,0,0.05)',
                                }}
                            >
                                <Box sx={{
                                    color: theme.palette.primary.main,
                                    display: 'flex',
                                    p: 1,
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                                    boxShadow: `0 0 10px ${theme.palette.primary.main}30`
                                }}>
                                    {categoryIcons[category] || <Category fontSize="medium" />}
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={{
                                        fontWeight: 800,
                                        color: theme.palette.text.primary,
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.9rem',
                                        opacity: 0.9
                                    }}
                                >
                                    {category}
                                </Typography>
                            </Stack>
                            <Grid2 container spacing={2}>
                                {utilities.map((utility) => (
                                    <Grid2 size={12} key={utility.toolName}>
                                        <Card
                                            elevation={0}
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                background: theme.palette.mode === 'dark'
                                                    ? 'rgba(30, 30, 30, 0.6)'
                                                    : 'rgba(255, 255, 255, 0.7)',
                                                backdropFilter: 'blur(20px)',
                                                border: `1px solid ${theme.palette.divider}`,
                                                borderRadius: 3,
                                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                position: 'relative',
                                                overflow: 'visible',
                                                "&::before": {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    borderRadius: 3,
                                                    padding: '2px',
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                    maskComposite: 'exclude',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                    pointerEvents: 'none',
                                                },
                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    boxShadow: theme.palette.mode === 'dark'
                                                        ? `0 8px 20px -6px ${theme.palette.primary.main}40`
                                                        : `0 8px 20px -6px ${theme.palette.primary.main}30`,
                                                    "&::before": {
                                                        opacity: 1,
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
                                                    p: 2,
                                                    height: '100%'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 1,
                                                        borderRadius: 2,
                                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                                                        color: theme.palette.primary.main,
                                                        mr: 2,
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
                                                <CardContent sx={{ p: 0, width: '100%' }}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="subtitle1"
                                                        component="h2"
                                                        fontWeight="700"
                                                        sx={{ mb: 0.5, fontSize: '0.95rem' }}
                                                    >
                                                        {utility.toolName}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{
                                                            lineHeight: 1.5,
                                                            opacity: 0.85,
                                                            fontSize: '0.8rem',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {utility.tooltip || "Useful tool for JSON operations."}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>
                    </Grid2>
                ))}
            </Grid2>

            <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        opacity: 0.7,
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        mb: 1
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
                        transition: 'opacity 0.2s',
                        '&:hover': {
                            opacity: 1,
                            color: 'primary.main'
                        }
                    }}
                >
                    <GitHub fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="caption">uniquedm</Typography>
                </Link>
            </Box>
        </Container>
    );
}
