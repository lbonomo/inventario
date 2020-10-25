import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '3rem',
  },

  formRow: {
    marginTop: '2rem'
  },

  cardItem: {
    padding: '0.5rem',
  },

  textField: {
    width:'100%',
  },

  submitRow: {
    margin: '2rem 0 1rem',
    textAlign: 'right',
  },

  button: {
    fontSize: "1rem",
    borderRadius: 0,
  },
}))

export default useStyles
