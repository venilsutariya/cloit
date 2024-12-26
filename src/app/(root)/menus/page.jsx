"use client";

import { useState } from "react";
import { BreadCrumb } from "@/components/bread-crumb";
import { MenuSelect } from "./components/menu-select";
import { MenuTree } from "./components/menu-tree";
import { MenuForm } from "./components/menu-form";

const Menus = () => {
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuFormData, setMenuFormData] = useState({
    menuID: "",
    depth: 1,
    parentData: "",
    name: "",
    parentId: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleMenuSelect = (id) => {
    setSelectedMenuId(id);
  };

  const handlePlusClick = (data) => {
    setEditMode(false);
    setMenuFormData({
      menuID: data.menuId,
      depth: data.depth,
      parentData: data.parentData,
      parentId: data.parentId,
      name: "",
    });
  };

  const handleEditClick = (data) => {
    setEditMode(true);
    setMenuFormData({
      menuID: data.menuId,
      depth: data.depth,
      parentData: data.parentData,
      parentId: data.parentId,
      name: data.label,
      id: data.id,
    });
  };

  return (
    <>
      <BreadCrumb name={"Menus"} />
      <MenuSelect onMenuSelect={handleMenuSelect} />
      <div className="grid lg:grid-cols-2 pt-8 gap-y-8 lg:gap-y-0">
        <MenuTree
          selectedMenuId={selectedMenuId}
          onPlusClick={handlePlusClick}
          onEditClick={handleEditClick}
        />
        <MenuForm
          formData={menuFormData}
          setMenuFormData={setMenuFormData}
          editMode={editMode}
        />
      </div>
    </>
  );
};

export default Menus;