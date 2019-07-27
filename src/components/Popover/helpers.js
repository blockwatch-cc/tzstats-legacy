
export const getPosition = (placement, elRect, targetRect) => {
    switch (placement) {
        case "top":
            return getTopPosition(elRect, targetRect);
        case "right":
            return getRightPosition(elRect, targetRect);
        case "bottom":
            return getBottomPosition(elRect, targetRect);
        case "left":
            return getLeftPosition(elRect, targetRect);
        default:
            return getBottomPosition(elRect, targetRect);
    }
};

const getTopPosition = (elRect, targetRect) => {
    return {
        left: targetRect.left + targetRect.width / 2 - elRect.width / 2,
        top: targetRect.top - elRect.height
    };
};

const getRightPosition = (elRect, targetRect) => {
    return {
        left: targetRect.left + targetRect.width,
        top: targetRect.top + targetRect.height / 2 - elRect.height / 2
    };
};

const getBottomPosition = (elRect, targetRect) => {
    return {
        left: targetRect.left + targetRect.width / 2 - elRect.width / 2,
        top: targetRect.top + targetRect.height
    };
};

const getLeftPosition = (elRect, targetRect) => {
    return {
        left: targetRect.left - elRect.width,
        top: targetRect.top + targetRect.height / 2 - elRect.height / 2
    };
};
