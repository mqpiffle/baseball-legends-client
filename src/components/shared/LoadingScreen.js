import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => (
    <div className='container-sm text-center'>
        <Spinner
            role='status'
            animation='border'
        />
    </div>
)

export default LoadingScreen
