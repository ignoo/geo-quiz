import { useState, useEffect } from 'react';

export default function DragToScroll() {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsDragging(true);
        setStartX(event.clientX);
        setStartY(event.clientY);
        setScrollLeft(window.scrollX);
        setScrollTop(window.scrollY);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        const x = event.clientX - startX;
        const y = event.clientY - startY;        
        window.scrollTo({
            left: scrollLeft - x,
            top: scrollTop - y,
            behavior: 'auto', // No smooth scrolling during drag
        });
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, startY, scrollLeft, scrollTop]);

    return null;
}
