import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useEffect } from "react";
import TagCard from "./TagCard";


const Tags = () => {
    const [tags, setTags] = useState();

    useEffect(()=> {
        fetch('tags.json')
        .then(res => res.json())
        .then(data => setTags(data))
    },[])
    console.log(tags);
    return (
        <div>
            <SectionTitle heading={'Different type of  Community'} subHeading={'Tags Name'}></SectionTitle>
            <div className="flex flex-wrap gap-2 ml-7">
               {
                tags?.map(tag => <TagCard key={tag.id} tag={tag}></TagCard>)
               }
            </div>
        </div>
    );
};

export default Tags;