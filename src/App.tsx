import TransactionsChart from "./components/TransactionsChart.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./pages/Applayout.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Applayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "transaction-analysis",
                    element: <TransactionsChart />,
                },
            ],
        },
    ],
    { basename: "/route-task/" }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
