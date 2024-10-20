import { Box, Card, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { FrontCard } from "./FrontCard";
import { BackCard } from "./BackCard";
import { WishListButton } from "./WishListButton";
import upRightArrow from "../../assets/upRightArrow.svg";
import propTypes from "prop-types";
const subsectionCardStyle = {
  padding: "10px 10px 0 10px",
  textAlign: "center",
  maxWidth: "13ch",
};

export function CourseCard({id, title, shortDescription, lessonHours, img, largeDescription, isFunctional = true}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: "290px",
        borderRadius: "10px",
        perspective: "1000px",
        boxShadow: "none",
      }}
    >
      <CardActionArea
        onClick={handleFlip}
        sx={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          maxHeight: "430px",
          height: "400px",
          boxSizing: "border-box",
          borderRadius: "10px 10px 0 0",
          border: "1px solid rgba(0,0,0,.16)",
          padding: "0",
          "&:hover": {
            border: "1px solid rgba(0,0,0,.16)",
          },
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Box
          component="img"
          src={upRightArrow}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
        />

        {!isFlipped ? (
          <FrontCard
            title={title}
            shortDescription={shortDescription}
            lessonHours={lessonHours}
            img={img}
            subsectionCardStyle={subsectionCardStyle}
          />
        ) : (
          <BackCard
            largeDescription={largeDescription}
            img={img}
          />
        )}
      </CardActionArea>
      <CardActions
        sx={{
          padding: "0",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
        }}
      >
        <WishListButton isFlipped={isFlipped} id={id} title={title} lessons={lessonHours} isFunctional={isFunctional} />
      </CardActions>
    </Card>
  );
}

CourseCard.propTypes = {
  title: propTypes.string.isRequired,
  id: propTypes.string,
  shortDescription: propTypes.string.isRequired,
  largeDescription: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  lessonHours: propTypes.number.isRequired,
  isFunctional: propTypes.bool
}