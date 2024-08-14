import { useDispatch, useSelector } from 'react-redux'
import {
    signOut,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess
} from '../redux/user/userSlice'

export default function Profile() {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        try {
            await fetch('http://localhost:5000/api/users/sign_out')
            dispatch(signOut())
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleDeleteUser = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                dispatch(deleteUserStart())
                const res = await fetch(`http://localhost:5000/api/users/delete/${currentUser._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                const data = await res.json()
                dispatch(deleteUserSuccess(data))
            }
            catch (err) {
                dispatch(deleteUserFailure(err.message))
                console.error(err)
            }
        }
    }

    return (
        <div className="flex items-center justify-start h-screen p-6 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: 'url(/images/wallhaven-g8yqk7.jpg)' }}>
            <div className="p-8 max-w-md bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
                <h1 className="text-3xl text-white font-bold text-center mb-6">Welcome, {currentUser?.username}</h1>
                <div className="flex flex-col gap-4 mt-6">
                    <button
                        onClick={handleDeleteUser}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete User
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
       
}
