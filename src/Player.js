export default function Player(marker) {
    let _marker = marker;

    const getMarker = () => {
        return _marker;
    }

    let ob = {
        getMarker
    }

    return ob;
}