

const TagCard = ({tag}) => {
    const {tagName} = tag;
    return (
        <div className="">
            <h1 className="p-3 border rounded-xl btn-outline btn-accent">{tagName}</h1>
        </div>
    );
};

export default TagCard;