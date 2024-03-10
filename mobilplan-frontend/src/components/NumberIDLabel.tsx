import { Typography } from '@mui/material';

interface DataLabelProps {
    data: string;
  }
export const LabelIDNumber = ({ data }: DataLabelProps) => {

    return (
      <Typography variant="h6" component={"h2"}>
        #Id : {data}
      </Typography>
    );
  };