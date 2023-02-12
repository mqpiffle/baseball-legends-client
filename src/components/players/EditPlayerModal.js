import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlayerForm from '../shared/PlayerForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditPlayerModal = ({
    playerInfo,
    user,
    show,
    handleClose,
    updatePlayer,
    msgAlert,
    triggerRefresh,
}) => {
    const [player, setPlayer] = useState(playerInfo)

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
        updatePlayer(user, player)
            .then(() => handleClose)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updSuccess,
                    variant: 'success',
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: messages.updFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <PlayerForm
                    playerInfo={player}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Update Player'
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPlayerModal
