import {Alert, Navbar, PageLoader} from "@/widgets";
import {AppRouter} from "@/app/providers";
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/useStore";
import {refreshToken} from "@/entities/User/model/services/userServicer";
import {useSelector} from "react-redux";
import {getUserLoading} from "@/entities/User";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    },[dispatch]);

  return (
    <div className='app'>
        <Navbar/>
        <Alert/>
        <PageLoader />

        <div className="container">
            <AppRouter />
        </div>
    </div>
  )
}

export default App
