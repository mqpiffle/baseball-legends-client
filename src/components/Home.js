import PlayersIndex from '../components/players/PlayersIndex'
import { Container } from 'react-bootstrap'

const Home = ({ msgAlert, user }) => {
    return (
        <Container className='mx-auto text-center my-5'>
            <h2>Welcome to Baseball Legends!</h2>
            <PlayersIndex msgAlert={msgAlert} />
        </Container>
    )
}

export default Home
