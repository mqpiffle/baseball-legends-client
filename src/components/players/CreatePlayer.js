import { useState } from 'react'
import { createPlayer } from '../../api/players'
import messages from '../shared/AutoDismissAlert/messages'
import PlayerForm from '../shared/PlayerForm'
import { useNavigate } from 'react-router-dom'

const CreatePlayer = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const [player, setPlayer] = useState({
        name: '',
        positions: [],
        leagues: [],
        baseballHoF: false,
    })

    const onChange = e => {
        e.persist()
        setPlayer(prevPlayer => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'baseballHoF' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'baseballHoF' && !e.target.checked) {
                updatedValue = false
            }

            const updatedPlayer = {
                [updatedName]: updatedValue,
            }

            return {
                ...prevPlayer,
                ...updatedPlayer,
            }
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        createPlayer(user, player)
            .then(res => {
                navigate(`/players/${res.data.player.id}`)
            })
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.newSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: messages.newFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <PlayerForm
            playerInfo={player}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading='Add a new Player.'
        />
    )
}

export default CreatePlayer
