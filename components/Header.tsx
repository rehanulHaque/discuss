import { Navbar, NavbarBrand, NavbarContent, NavbarItem,Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import HeaderAuth from '@/components/HeaderAuth'

export default function Header() {

    
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href={'/'}>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Input/>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    )
}

