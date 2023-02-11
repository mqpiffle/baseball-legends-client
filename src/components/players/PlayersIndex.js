import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllPlayers } from '../../api/players'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
    gap: '1rem',
    marginInline: 'auto',
}

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

const PlayersIndex = ({ msgAlert }) => {
    const [players, setPlayers] = useState(null)
    const [error, setError] = useState(false)

    // load players in db when component loads (empty dep array)
    useEffect(() => {
        getAllPlayers()
            .then(res => setPlayers(res.data.players))
            .catch(err => {
                msgAlert({
                    heading: 'Error retrieving players...',
                    message: messages.getFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <h4>Error!</h4>
    }

    if (!players) {
        return <LoadingScreen />
    } else if (players.length === 0) {
        return <h4>No players saved!!</h4>
    }

    // one card for every player

    const playerCards = players.map(player => (
        <Card
            key={player._id}
            style={cardStyle}
        >
            <Card.Header style={{ flexGrow: '1' }}>
                <h4>~{player.name}~</h4>
                {player.baseballHoF ? (
                    <h5>
                        <em>Hall of Fame</em>
                    </h5>
                ) : null}
            </Card.Header>
            <Card.Body style={cardBodyStyle}>
                <Card.Text>
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
                    <Link
                        to={`/players/${player.id}`}
                        className='btn btn-info'
                    >
                        View {player.name}
                    </Link>
                </Card.Text>
                {player.owner ? (
                    <Card.Footer>owner: {player.owner.email}</Card.Footer>
                ) : null}
            </Card.Body>
        </Card>
    ))

    return (
        <div
            className='container mt-5'
            style={cardContainerStyle}
        >
            {playerCards}
        </div>
    )
}

export default PlayersIndex
