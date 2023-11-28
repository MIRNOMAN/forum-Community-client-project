
import Container from "../../Share/Navbar/Container";
import Allposts from "./Allposts";
import Banner from "./Banner";
import Tags from "./Tags";




const Home = () => {

    return (
        <div>

            <Banner></Banner>

            <Container>
              {/* all tags */}
                <Tags></Tags>

             {/* all posts here */}

             <Allposts ></Allposts>

            </Container>
        </div>
    );
};

export default Home;