
import Navbar from "../components/Navbar"
import SideProfile from "./SideProfile"
import { Outlet} from "react-router-dom"
function HomePage() {
    return (<>
        <Navbar />
        <SideProfile/>
        <Outlet/>
    </>)
}

export default HomePage