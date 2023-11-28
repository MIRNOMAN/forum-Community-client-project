import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




const CommentModal = ({id}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

   console.log(id);
    const { user } = useAuth();
const axiosPublic = useAxiosPublic();
// const { _id } = useParams();



const { data = [], } = useQuery({
    queryKey: ['comments', id],
    enabled: !!user?.email,
    queryFn: async () => {
        const res = await axiosPublic.get(`/commentDetails/${id}?email=${user?.email}`);
        return res.data;
    }
})
console.log(data);
    return (
        <div>
        <Button onClick={handleOpen}>Read more</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             {data?.newComments}
            </Typography>
            
          </Box>
        </Modal>
      </div>
    );
};

export default CommentModal;