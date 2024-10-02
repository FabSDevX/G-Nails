import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";
export function FrontCardScheduledCourse({
  title,
  shortDescription,
  img,
}) {
  return (
    <Box
      className="front-card-content"
      sx={{
        padding: "0",
        backfaceVisibility: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="160px"
        image={img}
        alt="Card image container"
      />
      <CardContent
        sx={{
          padding: "15px 0 0 0 ",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          ":last-child":{paddingBottom:"0",
          }
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 20px",
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textWrap: "wrap",
            color: "black",
            fontWeight: "normal",
            opacity: "90%",
            maxHeight: "135px",
            maxWidth: "260px",
            textAlign: "center",
            padding: "0 5px",
            margin: "0 auto",
            overflow: "hidden",
            flex: "1",
            wordBreak: "break-word",
          }}
        >
          {shortDescription}
        </Typography>
      </CardContent>
    </Box>
  );
}

FrontCardScheduledCourse.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  subsectionCardStyle: PropTypes.object,
};
