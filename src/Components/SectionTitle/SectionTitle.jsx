

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-5/12 mx-auto text-center my-10">
        <h3 className="text-3xl uppercase border-y-4 Playfair font-extrabold  py-5">{heading}</h3>
        <p className="text-[#217C91] text-lg Playfair mt-3">{subHeading}</p>
    </div>
    );
};

export default SectionTitle;