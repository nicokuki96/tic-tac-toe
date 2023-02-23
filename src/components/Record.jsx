import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import uuid from "react-uuid";

const Record = (props) => {
  const { match, checkMatch, resetMatch, lookMatch } = props;

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <p className="turno">Record</p>
      <nav aria-label="secondary mailbox folders">
        <List>
          {match.map((item) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  key={uuid()}
                  onClick={() => checkMatch(item.id)}
                  primary={`Partida "${item.id}" ----> ${
                    item.winner ? `Ganador ${item.winner}` : "Empate"
                  }`}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem
            className={lookMatch ? "newMatch" : "btnHide"}
            disablePadding
          >
            <ListItemButton>
              <ListItemText onClick={resetMatch} primary="Nueva partida" />
              <AddCircleOutlineIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default Record;
