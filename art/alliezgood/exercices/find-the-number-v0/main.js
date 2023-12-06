@import url(../../../../common-resources/reset.css);

main {
    width: 100vw;
    height: 100vh;
    background-color: darkslategray;
    overflow: hidden;
}

.arrow {
    --angle: 10deg;

    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
}

.arrow > div {
    flex: 1;
    align-self: stretch;
    background-image: linear-gradient(
        rgb(0, 255, 106), 
        darkslategray);
}

.arrow > .left {
    transform: skewY(calc(var(--angle)*-1));
    transform-origin: top right;
    
}

.arrow > .right {
    transform: skewY(var(--angle));
    transform-origin: top left;