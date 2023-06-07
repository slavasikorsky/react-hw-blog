import NavList from "../../components/NavList";
import menuSidebar from "../../data/menuSidebar";

function Sidebar() {
	return <NavList dataList={menuSidebar} orientation="vertical" />;
}

export default Sidebar;
