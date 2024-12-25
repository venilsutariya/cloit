import { Tree } from "@/components/tree";
import { treeData } from "@/lists/menu-tree-data";

export const MenuTree = () => {
    return (
        <div>
            <Tree items={treeData} />
        </div>
    );
};