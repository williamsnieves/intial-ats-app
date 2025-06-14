import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

// Pages
import CandidatesPage from "./features/candidates/pages/CandidatesPage";
import CandidateDetailPage from "./features/candidates/pages/CandidateDetailPage";
import CreateCandidatePage from "./features/candidates/pages/CreateCandidatePage";

// Layout
import Layout from "./shared/components/Layout";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />

          <Layout>
            <Routes>
              {/* Redirect root to candidates */}
              <Route path="/" element={<Navigate to="/candidates" replace />} />

              {/* Candidate routes */}
              <Route path="/candidates" element={<CandidatesPage />} />
              <Route path="/candidates/new" element={<CreateCandidatePage />} />
              <Route path="/candidates/:id" element={<CandidateDetailPage />} />

              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        404
                      </h1>
                      <p className="text-gray-600 mb-8">Page not found</p>
                      <a
                        href="/candidates"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Go to Candidates
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </div>
      </Router>

      {/* React Query Devtools - only in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
