import { ToastContainer } from 'react-toastify'
import Router from './routes'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
function App() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={6}
                />
                <Router />
            </BrowserRouter>
        </>
    )
}

export default App
