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

const menuSchema = z.object({
    menuID: z.string().nonempty("MenuID is required"),
    depth: z.number().min(1, "Depth must be at least 1"),
    parentData: z.string().nonempty("parentData is required"),
    name: z.string().nonempty("Name is required"),
});

export const MenuForm = () => {
    const form = useForm({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            menuID: "",
            depth: 1,
            parentData: "",
            name: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Form Submitted", data);
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Depth</FormLabel>
                            <FormControl className="lg:max-w-[260px] bg-[#EAECF0]">
                                <Input type="number" placeholder="Enter Depth" {...field} />
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
                            <FormControl className="lg:max-w-[260px]">
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
                            <FormControl className="lg:max-w-[260px]">
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