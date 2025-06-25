import { Link } from "react-router";

const Following = () => {
    const data = [
        
        {
            usename: "test5",
            avatar: 5,
            img: 2,
        },
        {
            usename: "test8",
            avatar: 9,
            img: 6,
        },
        {
            usename: "test2",
            avatar: 10,
            img: 4,
        },
        {
            usename: "test9",
            avatar: 6,
            img: 6,
        },
        {
            usename: "test3",
            avatar: 4,
            img: 9,
        },
        {
            usename: "test10",
            avatar: 10,
            img: 2,
        },
        {
            usename: "test1",
            avatar: 2,
            img: 6,
        },
        {
            usename: "test6",
            avatar: 2,
            img: 2,
        },
        {
            usename: "test4",
            avatar: 2,
            img: 9,
        },
        {
            usename: "test7",
            avatar: 6,
            img: 4,
        },
        {
            usename: "hnd",
            avatar: 10,
            img: 7,
        },
        
    ]

    return (
        <>
            <div>Following</div>
            {data.map((profile, index) => (
                <div className="border-b border-near-black mb-5 pb-4" key={index}>
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
                            <Link to={`/${profile.usename}`}>
                                <img
                                    className="object-cover w-8 h-8"
                                    src={`/avatar/random/${profile.avatar}.jpg`}
                                    alt={`${profile.usename} avatar`}
                                />
                            </Link>
                        </div>
                        <Link className="pl-3" to={`/${profile.usename}`}>
                            <p>{profile.usename}</p>
                        </Link>
                    </div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis similique odio, obcaecati nobis libero facere nam natus minus a est qui laborum commodi modi unde blanditiis ipsa adipisci voluptatem voluptatibus.</p>
                    <img
                        src={`/headerphoto/random/${profile.img}.jpg`}
                        alt={`${profile.usename} header`}
                    />
                </div>
            ))}
        </>
    )
}

export default Following;