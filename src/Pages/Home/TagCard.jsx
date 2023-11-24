

const TagCard = ({tag}) => {
    const {tagName} = tag;
    return (
        <div className="">
            <h1 className="btn btn-outline btn-accent">{tagName}</h1>
        </div>
    );
};

export default TagCard;