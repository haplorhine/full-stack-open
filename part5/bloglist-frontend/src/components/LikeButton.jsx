import { Button } from '@mui/material'

const LikeButton = ({ onLike }) => {
  return (
    <Button size="small" variant="outlined" onClick={onLike}>
      like
    </Button>
  )
}

export default LikeButton
