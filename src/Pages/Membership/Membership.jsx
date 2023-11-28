import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Container from "../../Share/Navbar/Container";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)
const Membership = () => {
    return (
        <div>
            <SectionTitle heading={'Payment'}></SectionTitle>
            <Container>
            <div className="mx-32">
                <Elements stripe={stripePromise}>
                   <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
            </Container>
        </div>
    );
};

export default Membership;