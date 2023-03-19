import { Grid } from '@mui/material';
import TaskArea from '../../components/taskArea/taskArea';
import Sidebar from '../../components/sidebar/sidebar';

function Dashboard(): JSX.Element {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <TaskArea />
      <Sidebar />
    </Grid>
  );
}

export default Dashboard;
