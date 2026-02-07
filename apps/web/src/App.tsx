import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { FlowBuilderPage } from "./pages/FlowBuilderPage";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/builder/:id" element={<FlowBuilderPage />} />
        </Routes>
    );
}
