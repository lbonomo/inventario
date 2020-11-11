import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '3rem',
  },

  card: {
    marginTop: '3rem',
    marginBottom: '2rem'
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

  cardTitle: {
    fontSize: '1.6rem',
    textAlign: 'center',
  },

  cardSubtitle: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '300',
    marginBottom: '2rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid grey',
  },

  button: {
    fontSize: "1rem",
    borderRadius: 0,
  },

  cardActions: {
    margin: '1rem',
    flexDirection: 'row-reverse',
  },

}))

export default useStyles
