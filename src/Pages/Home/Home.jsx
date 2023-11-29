
import Container from "../../Share/Navbar/Container";
import Allposts from "./Allposts";
import Banner from "./Banner";
import Tags from "./Tags";
import Announcement from "./Announcement/Announcement"
import { useState } from "react";




const Home = () => {
  const [search, setSearch] = useState('');
    return (
        <div>

            <Banner setSearch={setSearch}></Banner>

            <Container>
              {/* all tags */}
                <Tags></Tags>
              {/* Announcement */}

              <Announcement></Announcement>

             {/* all posts here */}

             <Allposts search={search}></Allposts>

            </Container>
        </div>
    );
};

export default Home;