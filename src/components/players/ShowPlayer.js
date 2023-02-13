import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOnePlayer, updatePlayer, deletePlayer } from '../../api/players'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditPlayerModal from './EditPlayerModal'

// styling fns
const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginInline: 'auto',
    borderRadius: '.5rem',
    boxShadow: '3px 3px 9px hsl(0 0% 0% / .35)',
}

const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const posTextStyle = {
    display: 'flex',
    gap: '.5rem',
    justifyContent: 'center',
}

const ShowPlayer = ({ user, msgAlert }) => {
    const [player, setPlayer] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getOnePlayer(id)
            .then(res => setPlayer(res.data.player))
            .catch(err => {
                msgAlert({
                    heading: 'Error finding player...',
                    message: messages.getFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removePlayer = () => {
        deletePlayer(user, player.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.delSuccess,
                    variant: 'success',
                })
            })
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.delFailure,
                    variant: 'danger',
                })
            })
    }

    if (!player) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card style={cardStyle}>
                    <Card.Header>
                        <h4>{player.name}</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {player.baseballHoF ? (
                                <h5>
                                    <em>Hall of Fame</em>
                                </h5>
                            ) : null}
                            <div style={cardBodyStyle}>
                                {player.leagues.map(league => (
                                    <span>{league}</span>
                                ))}
                            </div>
                            <div style={posTextStyle}>
                                <p>Positions:</p>
                                {player.positions.map(pos => (
                                    <span>{pos}</span>
                                ))}
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {player.owner && user && player.owner.id === user.id ? (
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {player.name}
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => removePlayer()}
                                >
                                    Delete {player.name}
                                </Button>
                            </>
                        ) : null}
                    </Card.Footer>
                </Card>
            </Container>
            <EditPlayerModal
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updatePlayer={updatePlayer}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                playerInfo={player}
            />
        </>
    )
}

export default ShowPlayer
