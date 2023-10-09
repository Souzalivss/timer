//vai aparecer em ambas as rotas

import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header/Index";
import { LayoutContainer } from "./styles.ts";

export function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Outlet/>
        </LayoutContainer>
    )
}