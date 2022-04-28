import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Masonry from 'react-masonry-css'
import LoadingBar from 'react-top-loading-bar'
import Header from "../Header/Header";

import './ViewPort.scss'

const ViewPort = () => {
    const listInnerRef = useRef()
    const loadingRef = useRef(null)
    const [searchValue, setSearchValue] = useState('')
    const [viewPortData, setViewPortData] = useState({
        isLoaded: true,
        currentOffset: 0,
        data: [],
        filteredData: [],
    })
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [width, height] = useWindowSize();
    const onScroll = () => {
        if (listInnerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = listInnerRef.current;
            if (scrollTop + clientHeight + 0.5 >= scrollHeight) {
                loadingRef.current.continuousStart()
                getImages(viewPortData.currentOffset + 60).then((res) => {
                    setViewPortData({
                        ...viewPortData,
                        isLoaded: true,
                        currentOffset: viewPortData.currentOffset + 60,
                        data: [...viewPortData.data, ...res],
                        filteredData: [...viewPortData.data, ...res],
                    })
                    loadingRef.current.complete()
                });
            }
        }
    };
    const onSearchValueChanged = (searchValue) => {
        setSearchValue(searchValue)
        const updatedViewPortData = viewPortData.data.filter(item => item.description.includes(searchValue))
        setViewPortData({
            ...viewPortData,
            isLoaded: true,
            currentOffset: viewPortData.currentOffset + 60,
            data: [...viewPortData.data],
            filteredData: [...updatedViewPortData],
        })
    }
    const getImages = async (offset) => {
        let response = await fetch(
            `https://xoosha.com/ws/1/test.php?offset=${offset}`,
            {
                method: "GET"
            }
        );
        return await response.json();
    };

    useEffect(() => {
        loadingRef.current.continuousStart()
        getImages(0).then((res) => {
            setViewPortData({
                ...viewPortData,
                isLoaded: true,
                data: [...viewPortData.data, ...res],
                filteredData: [...viewPortData.data, ...res],
            })
            loadingRef.current.complete()
        });
    }, []);

    return (
        <>

            <Header searchValue={searchValue} onSearchValueChanged={(value) => {
                onSearchValueChanged(value)
            }}/>
            <div className="view-port-wrapper" ref={listInnerRef} onScroll={onScroll}>
                <Masonry className="masonry-wrapper"
                         breakpointCols={width>856?4:1}
                         columnClassName="my-masonry-grid_column"

                >
                    {viewPortData.filteredData.map((image, index) => {
                        return <div key={index} className="image-wrapper">
                            <div className="description">
                                <p>{image.description}</p>
                            </div>
                            <img src={image.image_url} alt={image.name}/>
                        </div>
                    })}
                </Masonry>
                <LoadingBar height={4} color='#D8383C' ref={loadingRef}/>
            </div>
        </>
    );
};

export default ViewPort;
