import React from 'react'
import clsx from 'clsx'
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { layoutStyle } from '../../utils/styles'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from '../../redux/actions/user'

const useStyles = layoutStyle()

function Layout(props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const menuStore = useSelector((state) => state.menu)

  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const goTo = (path) => {
    history.push(path)
  }

  const onSignOut = () => {
    history.push('/login')
    dispatch(userActions.signOut())
  }

  const renderIcon = (icon) => {
    switch(icon) {
      case 'home_icon':
        return <HomeIcon />
      case 'school_icon':
        return <SchoolIcon />
      case 'menu_book_icon':
        return <MenuBookIcon />
      case 'assignment_turned_in_icon':
        return <AssignmentTurnedInIcon />
      case 'add_box_icon':
        return <AddBoxIcon />
      default:
        break
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color='inherit' onClick={onSignOut}>
            Salir
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <div>
          {menuStore.data && menuStore.data.map((menu, i) => (
            <ListItem key={i} onClick={() => goTo(menu.url)} button>
              <ListItemIcon>
                {renderIcon(menu.icono)}
              </ListItemIcon>
              <ListItemText primary={menu.nombre} />
            </ListItem>
          ))}
          
        </div>
        
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
          <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://material-ui.com/">
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default Layout