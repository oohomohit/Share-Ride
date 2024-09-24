import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
// import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { JourneyProvider } from "./context/JourneyContext";
import { Toaster } from "react-hot-toast";
import StoreJourneyCards from "./mains/StoreJourneyCards";
import PostJourney from "./mains/PostJourney";
import MyJourney from "./pages/MyJourney";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Features from "./components/Features";
import Team from "./components/Team";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import About from "./components/About";
// import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import LandingPageLayout from "./pages/LandingPageLayout";
import Promote from "./components/Promote";
import Profile from "./components/Profile";
import MyJourneyForm from "./components/MyJourneyForm";

export default function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route
              index
              element={
                // <HomePage
                //   start="New York"
                //   destination="Boston"
                //   passengersJoined={3}
                //   passengersRequired={5}
                //   phoneNumber="123-456-7890"
                //   farePerHead={25}
                // />
                <LandingPage />
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/feature" element={<Features />} />
            <Route path="/team" element={<Team />} />
            <Route path="/termandcond" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} /> */}
            {/* <Route path="/home" element={<Home/>} /> */}

            {/* <Route
  path="/"
  element={<LandingPageLayout />}
>
  <Route index element={<LandingPage />} />
  <Route path="login" element={<Login />} />
  <Route path="signup" element={<SignUp />} />
  <Route path="contact" element={<Contact />} />
  <Route path="blog" element={<Blog />} />
  <Route path="feature" element={<Features />} />
  <Route path="team" element={<Team />} />
  <Route path="termandcond" element={<TermsAndConditions />} />
  <Route path="privacypolicy" element={<PrivacyPolicy />} />
  <Route path="about" element={<About />} />
</Route> */}

            <Route path="/" element={<LandingPageLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="feature" element={<Features />} />
              <Route path="team" element={<Team />} />
              <Route path="termandcond" element={<TermsAndConditions />} />
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="about" element={<About />} />
              <Route path="home" element={<LandingPage />} />
              <Route path="*" element={<LandingPage />} />
            </Route>

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StoreJourneyCards />} />
              <Route path="post" element={<PostJourney />} />
              <Route path="myJourney" element={<MyJourney />} >
                {/* <Route path="journey-form" element={<MyJourneyForm/>} /> */}
              </Route>  
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="feature" element={<Features />} />
              <Route path="team" element={<Team />} />
              <Route path="termandcond" element={<TermsAndConditions />} />
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="about" element={<About />} />
              <Route path="profile" element={<Profile/>} />
              <Route path="promote" element={<Promote />} />
              <Route path="dashboard" element={<StoreJourneyCards />} />
              <Route path="home" element={<StoreJourneyCards />} />
              <Route path="*" element={<StoreJourneyCards />} />
              <Route path="journey-form" element={<MyJourneyForm/>} />

            </Route>

            <Route path="*" element={<LandingPageLayout />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="bottom-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "linear-gradient(to right, #fdcbf1, #fdcbf1)",
              color: "black",
            },
          }}
        />
      </JourneyProvider>
    </AuthProvider>
  );
}
