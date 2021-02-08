import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";
import "./navbar.scss";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const navbar = ({ defaultNav, children, config }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(defaultNav);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="navbar">
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {config.navs.map((nav, index) => {
            return (
              <Tab
                key={index}
                value={nav.id}
                label={nav.title}
                component={Link}
                href={nav.redirectUrl}
                wrapped={true}
              />
            );
          })}
        </Tabs>
      </Paper>
    </div>
  );
};

navbar.propTypes = {
  defaultNav: PropTypes.number.isRequired,
  children: PropTypes.instanceOf(Array),
};
