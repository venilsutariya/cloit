"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const MenuSelect = () => {
    return (
        <div className="lg:pt-8 flex flex-col gap-[8px]">
            <label htmlFor="menu-select" className="text-[#475467]">
                Menu
            </label>
            <Select>
                <SelectTrigger id="menu-select" className="lg:w-[350px]">
                    <SelectValue placeholder="system management" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">system management</SelectItem>
                    <SelectItem value="2">system</SelectItem>
                    <SelectItem value="3">system user</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};