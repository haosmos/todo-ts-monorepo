import { Avatar, Box, Typography } from '@mui/material';

// import PropTypes from 'prop-types';

interface IProfile {
  name: string;
}

function Profile({ name = 'Chaosmos' }: IProfile): JSX.Element {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          sx={{
            width: '96px',
            height: '96px',
            backgroundColor: 'primary.main',
            marginBottom: '16px'
          }}
        >
          <Typography variant="h4" color="text.primary">
            {`${name.substring(0, 1)}`}
          </Typography>
        </Avatar>
        <Typography variant="h6" color="text.main">
          {`Welcome, ${name}`}
        </Typography>
        <Typography>
          This is your personal tasks manager
        </Typography>
      
      </Box>
    </>
  );
}

export default Profile;
