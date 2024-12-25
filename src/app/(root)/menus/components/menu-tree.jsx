import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMenuByIdFunc } from "@/redux/menuSlice";
import { Tree } from "@/components/tree";

export const MenuTree = ({ selectedMenuId }) => {
    const dispatch = useDispatch();
    const { menu, loading, error } = useSelector((state) => state.menu);
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        if (selectedMenuId) {
            dispatch(getMenuByIdFunc(selectedMenuId));
        }
    }, [dispatch, selectedMenuId]);

    useEffect(() => {
        if (menu) {
            setSelectedMenu(menu);
        }
    }, [menu]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {selectedMenu ? (
                <Tree items={selectedMenu.items} />
            ) : (
                <p>Select a menu to view its tree</p>
            )}
        </div>
    );
};