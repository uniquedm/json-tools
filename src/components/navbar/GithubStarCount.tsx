import { GitHub, Star } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface GithubInfo {
  owner: string;
  repo: string;
}

export default function GithubStarCount({ owner, repo }: GithubInfo) {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        setStarCount(response.data.stargazers_count);
      } catch (error) {
        console.error("Error fetching star count:", error);
      }
    };

    fetchStarCount();
  }, [owner, repo]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 0.5 }}>
      <Tooltip title="Github Repo">
        <IconButton
          onClick={() =>
            window.open(`https://github.com/${owner}/${repo}`, "_blank")
          }
          sx={{
            "&:hover": {
              transform: "scale(1.1)",
              transition: "all 0.3s ease-in-out",
            },
            color: "text.primary",
          }}
        >
          <GitHub />
        </IconButton>
      </Tooltip>
      <Star sx={{ fontSize: "1rem" }} />
      <Typography
        variant="overline"
        sx={{ display: "flex", alignItems: "center", ml: 0.5, mt: 0.3 }}
      >
        {starCount}
      </Typography>
    </Box>
  );
}
