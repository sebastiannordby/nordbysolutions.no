import React from 'react';

const MinimalistLayout = ({ children, className}) => {
    return (
        <div className={`flex flex-col min-h-screen absolute min-w-full top-0 left-0 right-0 bottom-0 bg-gray-100 dark:bg-gray-800 ${className}`}>
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default MinimalistLayout;
