import { useState, useCallback, useEffect } from 'react'

const VirtualListWrapper = ({ items, height, width, listId }) => {

    const [virEntItems, setVirEntItems] = useState({})

    const isPartiallyVisible = (item) => {
        const rect = item.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < viewportHeight && rect.bottom >= 0;
    };

    const isVisibleInDOM = (value) => {
        return virEntItems[value?.id] ? true : virEntItems[value.id];
    };

    const findVisibleListItem = useCallback(() => {
        document.querySelectorAll(`.virtual-element`).forEach((item) => {
            if (isPartiallyVisible(item)) {
                const pageNumber = item.id;
                setVirEntItems(prevState => { return { ...prevState, [pageNumber]: { loaded: true, cardNumber: item.getAttribute('data-card-number') } } })
            } else {
                setVirEntItems(prevItems => {
                    const { [item.id]: removed, ...newItems } = prevItems;
                    return newItems;
                });
            }
        });

    }, [])

    useEffect(() => {
        findVisibleListItem()
    }, [items, findVisibleListItem])

    return (
        <div
            style={{ height: `${height}px`, overflow: 'scroll', width: `${width}px` }}
            onScroll={findVisibleListItem}
        >
            {items.map((item, index) => (
                <div className='virtual-element' key={index} style={{ minHeight: '100px' }} id={`card-${index}`} data-card-number={index + 1}>{isVisibleInDOM({ id: `${listId}-${index}` }) ? item : ""}</div>
            ))}
        </div>
    );
}
export default VirtualListWrapper;


