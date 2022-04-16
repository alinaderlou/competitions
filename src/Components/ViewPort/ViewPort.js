import React, {useEffect, useState} from 'react';
import Masonry from 'react-masonry-css'
import './ViewPort.scss'

const Header = () => {
    const getImages = async (offset) => {
        let response = await fetch(
            `http://xoosha.com/ws/1/test.php?offset=${offset}`,
            {
                method: "GET"
            }
        );
        return await response.json();
    };
    const [viewPortData, setViewPortData] = useState({
        isLoaded: false,
        data: []
    })
    useEffect(() => {
        getImages(1).then((res) => {
            setViewPortData({
                ...viewPortData,
                data: res
            })
        });
    }, []);
    return (
        <section className="view-port-wrapper">
            <Masonry className="masonry-wrapper"
                     breakpointCols={4}
                     columnClassName="my-masonry-grid_column"
            >
                {viewPortData.data.map(image => {
                    return <div className="image-wrapper">
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
