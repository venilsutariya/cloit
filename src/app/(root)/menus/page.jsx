import { BreadCrumb } from "@/components/bread-crumb";
import { MenuSelect } from "./components/menu-select";
import { MenuTree } from "./components/menu-tree";
import { MenuForm } from "./components/menu-form";

const Menus = () => {
    return (
        <>
            <BreadCrumb name={"Menus"} />
            <MenuSelect />
            <div className="grid lg:grid-cols-2 pt-8 gap-y-8 lg:gap-y-0">
                <MenuTree />
                <MenuForm />
            </div>
        </>
    )
}

export default Menus;