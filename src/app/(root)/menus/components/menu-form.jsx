"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMenuItemFunc } from "@/redux/menuSlice";

const menuSchema = z.object({
    menuID: z.string().nonempty("MenuID is required"),
    depth: z.number().min(1, "Depth must be at least 1"),
    parentData: z.string().nonempty("Parent Data is required"),
    name: z.string().nonempty("Name is required"),
});

const defaultValues = {
    menuID: "",
    depth: 1,
    parentData: "",
    name: "",
    parentId: "",
};

export const MenuForm = ({ formData, setMenuFormData }) => {
    const dispatch = useDispatch();
    const form = useForm({
        resolver: zodResolver(menuSchema),
        defaultValues
    });

    useEffect(() => {
        if (formData) {
            form.reset(formData);
        }
    }, [formData, form]);

    const resetForm = () => {
        form.reset(defaultValues);
        setMenuFormData(defaultValues);
    };

    const onSubmit = async (data) => {
        const newMenuItem = {
            menuId: data.menuID,
            label: data.name,
            depth: data.depth,
            parentId: formData.parentId,
            parentData: data.parentData,
        };

        try {
            const response = await dispatch(createMenuItemFunc(newMenuItem));
            if (response?.error) {
                console.error("Error creating menu item:", response.error);
            } else {
                dispatch(addMenuItemToTree(response.payload));
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
        resetForm();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    name="menuID"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MenuID</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter MenuID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="depth"
                    control={form.control}
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Depth</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter Depth"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="parentData"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent Data</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Parent Data" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="save"
                    type="submit"
                    className="w-[50%] lg:w-[260px] h-[52px]"
                >
                    Save
                </Button>
            </form>
        </Form>
    );
};