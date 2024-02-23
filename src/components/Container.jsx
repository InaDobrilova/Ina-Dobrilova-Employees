import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const PageContainer = ({ title, children }) => {
  return (
      <Box className="App-container" maxWidth="lg">
         <Typography gutterBottom variant="h3" component="div">
        {title}
      </Typography>
        {children}
      </Box>
  );
}

export default PageContainer;