import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Container from "../../../Share/Navbar/Container";
import announcementBanner from "../../../assets/banner/announcement.png"
import Marquee from "react-fast-marquee";
import useAnnouncement from "../../../hooks/useAnnouncement";

const Announcement = () => {
    const [announcementData] = useAnnouncement();
    console.log(announcementData)
    return (
        <div>
            <SectionTitle heading={'Announcement'} subHeading={'Admin Here'}></SectionTitle>
            <Marquee pauseOnHover={true}>
           <h1 className="text-xl text-red-600" > We're thrilled to share some exciting news with our amazing community! As part of our commitment to providing you with the best experience possible, we have some major upgrades in the pipeline that we believe will take our forum to new heights. Your input and engagement have been invaluable, and we can't wait to reveal what's in store.</h1>
            </Marquee>
            <div className="mt-7">
                {
                    announcementData.slice(0,1).map(item => (
                        <Container key={item._id}>
                    <img  className="h-[400px] relative" src={announcementBanner} alt="" />
                    <div className="-mt-[27%] absolute">
                       <div className="flex gap-6 items-center">
                           <img className="h-24 w-24 rounded-full border-8 border-red-500" src={item?.image} alt="" />
                           <p className="text-2xl font-bold Playfair">{item.author_name}</p>
                       </div>
                       <div className="mt-4 ">
                        <h3 className="text-2xl font-semibold Playfair">{item.title}</h3>
                        <h1 className="w-1/3 mt-7 font-semibold py-2">{item.description}</h1>
                       </div>
                    </div>
                </Container>
                    ))
                }
            </div>
        </div>
    );
};

export default Announcement;