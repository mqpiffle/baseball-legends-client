import { Form, Button, Container } from 'react-bootstrap'

const PetForm = ({ playerInfo, handleChange, handleSubmit, heading }) => {
    return (
        <Container>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label></Form.Label>
                    <Form.Control
                        placeholder=''
                        nanme='name'
                        id='name'
                        value={playerInfo.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Select
                        multiple
                        aria-label='positions'
                        name='positions'
                        defaultValue={playerInfo.positions}
                        onChange={handleChange}
                    >
                        <option>-- Select at least one --</option>
                        <option value='1B'>1B</option>
                        <option value='2B'>2B</option>
                        <option value='3B'>3B</option>
                        <option value='SS'>SS</option>
                        <option value='LF'>LF</option>
                        <option value='CF'>CF</option>
                        <option value='RF'>RF</option>
                        <option value='C'>C</option>
                        <option value='P'>P</option>
                        <option value='DH'>DH</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Select
                        multiple
                        aria-label='leagues'
                        name='leagues'
                        defaultValue={playerInfo.leagues}
                        onChange={handleChange}
                    >
                        <option>-- Select at least one --</option>
                        <option value='American League'>American League</option>
                        <option value='National League'>National League</option>
                        <option value='Negro American League'>
                            Negro American League
                        </option>
                        <option value='Negro National League'>
                            Negro National League
                        </option>
                        <option value='Negro League'>Negro League</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check
                        label='Hall of Famer?'
                        name='baseballHoF'
                        defaultChecked={playerInfo.baseballHoF}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>
            <Button
                className='m-2'
                type='submit'
            >
                Submit
            </Button>
        </Container>
    )
}

export default PetForm
