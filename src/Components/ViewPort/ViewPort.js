import React, {useEffect, useState} from 'react';
import Masonry from 'react-masonry-css'
import './ViewPort.scss'

const Header = () => {
    const getImages = async (offset) => {
        let response = await fetch(
            `https://xoosha.com/ws/1/test.php?offset=${offset}`,
            {
                method: "GET"
            }
        );
        return await response.json();
    };
    const [viewPortData, setViewPortData] = useState({
        isLoaded: true,
        currentOffset: 0,
        data: []
    })
    // const handleScroll = (e) => {
    //     var body = document.body,
    //         html = document.documentElement;
    //     var height = Math.max(body.scrollHeight, body.offsetHeight,
    //         html.clientHeight, html.scrollHeight, html.offsetHeight);
    //     const windowScrollTop = e.target.documentElement.scrollTop + 820;
    //     console.log('sda', viewPortData.isLoaded);
    //     if (windowScrollTop >= height && viewPortData.isLoaded) {
    //         setViewPortData({
    //             ...viewPortData,
    //             isLoaded: false
    //         })
    //         getImages(viewPortData.currentOffset + 1).then((res) => {
    //             setViewPortData({
    //                 ...viewPortData,
    //                 isLoaded: true,
    //                 currentOffset: viewPortData.currentOffset + 1,
    //                 data: [...viewPortData.data, ...res]
    //             })
    //         });
    //     }
    // }
    useEffect(() => {
        getImages(0).then((res) => {
            setViewPortData({
                ...viewPortData,
                isLoaded: true,
                data: [...viewPortData.data, ...res]
            })
        });
    }, []);
    return (
        <section className="view-port-wrapper">
            <Masonry className="masonry-wrapper"
                     breakpointCols={4}
                     columnClassName="my-masonry-grid_column"

            >
                {viewPortData.data.map((image, index) => {
                    return <div key={index} className="image-wrapper">
                        <div className="description">
                            <p>{image.description}</p>
                        </div>
                        <img src={image.image_url} alt={image.name}/>
                    </div>
                })}
            </Masonry>
        </section>
    );
};

export default Header;
