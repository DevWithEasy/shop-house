import useUserStore from "../store/userStore";

const Home = () => {
    const {user} = useUserStore()
    return (
        <div className='h-screen p-2 space-y-2'>
            <div
                className="space-y-2"
            >
                <h1 className='text-4xl font-bold text-center text-sky-500 uppercase'>Fantsy Shoe House</h1>
                <p className='text-center text-gray-500 italic'>Buy your all daily needs.</p>
                <hr/>
            </div>
            <div
                className="w-1/4 bg-white border rounded text-sm"
            >  
                <p
                    className="p-2 border-b"
                >
                You logged as <b>{user.isAdmin ? 'Admin' : 'Outlet Owner'}</b>
                </p>
                <div
                    className="p-2"
                >
                    <table
                        className="w-full"
                    >
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td> {user?.name}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>:</td>
                                <td> {user?.phone}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td> {user?.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;