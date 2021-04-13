import React from "react";

export default function ImageFrame({ url }) {
    return (
        <div
            style={{
                overflow: "hidden",
                border: "1px solid black",
                height: "75px",
                width: "100px",
            }}
        >
            {url === "http://blitz.cs.niu.edu/pics/wip.jpg" ? (
                <img
                    style={{
                        scale: "1.5",
                        objectPosition: "16px 11px",
                        height: "75px",
                        width: "100px",
                    }}
                    alt="/"
                    src={url}
                />
            ) : (
                <img alt="/" height="75px" src={url} />
            )}
        </div>
    );
}
