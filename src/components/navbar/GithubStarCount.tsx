import { GitHub } from "@mui/icons-material";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
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
    <Box sx={{ mt: 0.5 }}>
      <Tooltip title="Github Repo">
        <IconButton
          onClick={() =>
            window.open(`https://github.com/${owner}/${repo}`, "_blank")
          }
        >
          <Badge color="error" badgeContent={starCount}>
            <GitHub />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
