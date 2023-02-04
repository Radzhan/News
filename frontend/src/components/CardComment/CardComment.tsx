import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface Props {
  author: string;
  text: string;
  onDelete: React.MouseEventHandler
}

const CardComment: React.FC<Props> = ({ author, text , onDelete}) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 , mb: 4}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {author}
          </Typography>
          
          <Typography variant="body2">
            {text}
            
          </Typography>
        </CardContent>
          <Button size="small" onClick={onDelete}>Delete</Button>
      </Card>
    </div>
  );
};

export default CardComment;
