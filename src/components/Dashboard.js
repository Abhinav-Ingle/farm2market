import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Toolbar, AppBar, Typography, CssBaseline, Grid, Card, CardContent, Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, ListAlt, Info, ExitToApp, Add, Person } from '@mui/icons-material'; // Import the required icons
import { useNavigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const drawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(''); // State to manage bottom navigation

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Successfully logged out!', { position: "top-right" });
    navigate('/');
  };

  const handleNavigation = (path, message) => {
    navigate(path);
    toast.info(message, { position: "top-right" });
  };

  // Card styles for agriculture theme
  const cardStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };

  // Title and description styles
  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    zIndex: 1,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Shadow for text readability
    color: '#FFFFFF', // Set title color to white
  };

  const descriptionStyle = {
    fontSize: '16px',
    zIndex: 1,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    color: '#FFFFFF', // Set description color to white
  };

  // Styles for each card based on the section
  const cardStyles = {
    listings: {
      backgroundColor: '#388E3C',  // #C5E1A5 with 5% opacity (My Listings)
    },
    cropInfo: {
      backgroundColor: '#388E3C',  // Same color with 5% opacity (Crop Information)
    },
    aboutUs: {
      backgroundColor: '#388E3C',  // Same color with 5% opacity (About Us)
    },
    logout: {
      backgroundColor: '#388E3C',  // Same color with 5% opacity (Logout)
    },
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better text visibility
    borderRadius: '16px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />

      {/* AppBar Component */}
      <AppBar position="fixed" style={{ zIndex: 1400, width: '100%', backgroundColor: '#3ed70b' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ marginRight: '16px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Farm2Market Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer
        variant="temporary" // Temporary drawer that can be closed
        open={open} // Control drawer visibility based on state
        onClose={toggleDrawer} // Close drawer on click outside
        sx={{
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <Toolbar /> {/* Empty toolbar for spacing under AppBar */}
        <List>
          <ListItem button onClick={() => handleNavigation('/my-listings', 'Navigating to My Listings')}>
            <ListItemIcon><ListAlt /></ListItemIcon>
            <ListItemText primary="My Listings" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/crop-info', 'Navigating to Crop Information')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Crop Information" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/about-us', 'Navigating to About Us')}>
            <ListItemIcon><Info /></ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '24px', marginTop: '64px', flex: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Card for My Listings */}
            <Card style={{ ...cardStyle, ...cardStyles.listings }}>
              <div style={overlayStyle}></div>
              <CardContent>
                <Typography style={titleStyle}>
                  My Listings
                </Typography>
                <Typography style={descriptionStyle}>
                  View and manage your crop listings for sale.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleNavigation('/my-listings', 'Navigating to My Listings')}
                  style={{ marginTop: '16px', zIndex: 1 }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Card for Crop Info */}
            <Card style={{ ...cardStyle, ...cardStyles.cropInfo }}>
              <div style={overlayStyle}></div>
              <CardContent>
                <Typography style={titleStyle}>
                  Crop Information
                </Typography>
                <Typography style={descriptionStyle}>
                  Discover detailed information on various crops.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleNavigation('/crop-info', 'Navigating to Crop Information')}
                  style={{ marginTop: '16px', zIndex: 1 }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Card for About Us */}
            <Card style={{ ...cardStyle, ...cardStyles.aboutUs }}>
              <div style={overlayStyle}></div>
              <CardContent>
                <Typography style={titleStyle}>
                  About Us
                </Typography>
                <Typography style={descriptionStyle}>
                  Learn more about our mission and team.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleNavigation('/about-us', 'Navigating to About Us')}
                  style={{ marginTop: '16px', zIndex: 1 }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Card for Logout */}
            <Card style={{ ...cardStyle, ...cardStyles.logout }}>
              <div style={overlayStyle}></div>
              <CardContent>
                <Typography style={titleStyle}>
                  Logout
                </Typography>
                <Typography style={descriptionStyle}>
                  Click here to log out of the dashboard.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  style={{ marginTop: '16px', zIndex: 1 }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Outlet /> {/* This is where the content of My Listings, Crop Info, etc. will be displayed */}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavigation
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#3ed70b',
          zIndex: 1000,
          borderTopLeftRadius: '100px',  // Round top-left corner
          borderTopRightRadius: '100px', // Round top-right corner
          height: '56px', // Adjust the height to match the section size
          width: '80%',
          margin: '0 auto',
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => handleNavigation('/dashboard', 'Navigating to Home')} // Handle home navigation
        />
      
      <BottomNavigationAction
  label="Add"
  icon={
    <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '15px', border: '3px solid #338E3C' }}> {/* Increase padding for a larger circular background */}
      <Add style={{ color: '#4CAF50', fontSize: '40px' }} /> {/* Increase font size for the icon */}
    </div>
  }


          onClick={() => handleNavigation('/add', 'Navigating to Add')}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<Person />}
          onClick={() => handleNavigation('/', 'Navigating to Profile')} // Handle profile navigation
        />
      </BottomNavigation>

      {/* Toast Container for showing toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;