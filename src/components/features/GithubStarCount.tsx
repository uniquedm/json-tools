import { GitHub, Star } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
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
    <Tooltip title="Github Repo">
      <Stack>
        <IconButton
          onClick={() =>
            window.open(`https://github.com/${owner}/${repo}`, "_blank")
          }
        >
          <GitHub />
        </IconButton>
        <Typography fontSize={9}>
          {starCount} <Star sx={{ fontSize: 9, pt: 0.1 }} />
        </Typography>
      </Stack>
    </Tooltip>
  );
}
