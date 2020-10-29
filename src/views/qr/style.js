import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  scanner: {
    margin: '1rem auto 1rem',
    width: '100%',
  },

  header: {
    fontSize: '2rem',
    fontWeight: '300',
    textAlign: 'center',
    margin: '1rem',
  },

  product: {
    margin: '2rem auto 0 auto',
    fontWeight: '500',
    fontSize: '3rem',
    textAlign: 'center',
  },

  provider: {
    marginTop: '1rem',
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: '300',
    textAlign: 'center',
  },

  cardRow: {
    marginBottom: '2rem',
  },

  cardItem: {
    textAlign: 'center',
  },

  cardLabel: {
    fontSize: '1.2rem',
    fontWeight: '150',
  },

  cardData: {
    fontSize: '1.9rem',
    fontWeight: '500',
  },

  cardDataSmall: {
    fontSize: '1.5rem',
    fontWeight: '300',
  },

  noData: {
    fontWeight: '150',
    fontSize: '3rem',
    margin: '5rem auto',
    textAlign: 'center',
  },

  fab: {
    width: '6rem',
    height: '6rem',
  },

  icon: {
    fontSize: '3rem',
  },

  back: {
    bottom: '2rem',
    right: '2rem',
    position: 'absolute',
  },

  take: {
    bottom: '2rem',
    left: '2rem',
    position: 'absolute',
  },

  feedback: {
    width: '30%',
    margin: '0 auto',
  },

  })
)

export default useStyles
