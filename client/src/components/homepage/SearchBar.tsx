import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ingredientsArray from "../../helper/autoCompleteHelperArray";
import Background from "../../assets/image/lemon-background.jpg";

const useStyles = makeStyles(
  (theme): Record<string, any> => ({
    root: {
      flexGrow: 1,
      height: "500px",
    },
    appBar: {
      height: "100%",
      backgroundImage: `url(${Background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      boxShadow: "none",
    },
    toolBar: {
      height: "100%",
      color: "green",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      marginRight: theme.spacing(1),
      flexGrow: "1",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
    },
  })
);

const GreenCheckbox = (props: any) => <Checkbox color="default" {...props} />;

interface Props {
  handleSearch: (value: string, tags: { [key: string]: boolean }) => void;
}

export const SearchBar: React.FC<Props> = (props) => {
  const { handleSearch } = props;
  const classes = useStyles();
  const [searchValue, setsearchValue] = useState<string>("");
  const [healthTag, setHealthTag] = useState({
    vegetarian: false,
    vegan: false,
    "alcohol-free": false,
    "tree-nut-free": false,
    "peanut-free": false,
    "sugar-conscious": false,
  });

  const handleChange: (event: React.ChangeEvent<{}>) => void = (event) => {
    const { name, checked } = event.target as HTMLInputElement;
    setHealthTag({ ...healthTag, [name]: checked });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => {
              handleSearch(searchValue, healthTag);
              setsearchValue("");
            }}
          >
            Go!
          </Button>
          <div className={classes.search}>
            <Autocomplete
              id="search"
              freeSolo
              color="primary"
              onChange={(event: React.ChangeEvent<{}>, value: any) =>
                setsearchValue(value)
              }
              options={ingredientsArray.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  variant="outlined"
                  value={searchValue}
                  onChange={(e) => setsearchValue(e.target.value)}
                />
              )}
            />
          </div>
          <FormGroup row>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={healthTag["vegetarian"]}
                  name="vegetarian"
                />
              }
              onChange={handleChange}
              label="vegetarian"
            />
            <FormControlLabel
              control={
                <GreenCheckbox checked={healthTag["vegan"]} name="vegan" />
              }
              onChange={handleChange}
              label="vegan"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={healthTag["alcohol-free"]}
                  name="alcohol-free"
                />
              }
              onChange={handleChange}
              label="alcohol-free"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={healthTag["peanut-free"]}
                  name="peanut-free"
                />
              }
              onChange={handleChange}
              label="peanut-free"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={healthTag["tree-nut-free"]}
                  name="tree-nut-free"
                />
              }
              onChange={handleChange}
              label="tree-nut-free"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={healthTag["sugar-conscious"]}
                  name="sugar-conscious"
                />
              }
              onChange={handleChange}
              label="sugar-conscious"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};
