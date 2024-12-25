"use client";

import { useState } from "react";
import { BreadCrumb } from "@/components/bread-crumb";
import { MenuSelect } from "./components/menu-select";
import { MenuTree } from "./components/menu-tree";
import { MenuForm } from "./components/menu-form";

const Menus = () => {
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const handleMenuSelect = (id) => {
    setSelectedMenuId(id);
  };

  return (
    <>
      <BreadCrumb name={"Menus"} />
      <MenuSelect onMenuSelect={handleMenuSelect} />
      <div className="grid lg:grid-cols-2 pt-8 gap-y-8 lg:gap-y-0">
        <MenuTree selectedMenuId={selectedMenuId} />
        <MenuForm />
      </div>
    </>
  );
};

export default Menus;