import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import "./index.css";
import { FlowBuilderPage } from "./pages/FlowBuilderPage.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <FlowBuilderPage />
        </Provider>
    </StrictMode>
);
