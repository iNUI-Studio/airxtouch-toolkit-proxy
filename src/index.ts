import { MutableRefObject } from "react";

/**
 * Defines the interaction for an area. Xs & Ys must be the absolute position of the element on the screen.
 * You can use the GetElementBounds method to generate a layout setting from an element
 */
export interface AIRxTouchLayoutSetting {
    /**Top left of the rectangle */
    X1: number,
    /**Top right of the rectangle */
    X2: number,
    /**Bottom left of the rectangle */
    Y1: number,
    /**Bottom right of the rectangle */
    Y2: number,
    /**z-index of the rectangle */
    ZIndex: number,
    /**Type of interaction for the rectangle */
    DistanceForMoving: AIRxTouchDefaultLayoutSetting
}

/**
 * Defines the distance required to move the cursor once the press event has been fired. Default is DirectClick.
 */
export enum AIRxTouchDefaultLayoutSetting {
    /**Ideal for drawing or painting interactions */
    Drawing = 0,
    /**Ideal for small container with scrolling */
    ScrollBar = 20,
    /**Ideal for large container with scrolling */
    ScrollView = 40,
    /**Ideal for drag and drop interactions */
    DragDrop = 80,
    /**Ideal for basic click interaction */
    DirectClick = 5000
}

/**
 * Defines the interaction mode for the entire screen
 */
export enum AIRxTouchInteractionMode {
    /**Allows direct click, drag & drop and swipe */
    Default = 0,
    /**Allows direct clicks and zoom (will simulate ctrl + mousewheel) */
    ZoomAndClick = 1
}

/**
 * Return a AIRxTouchLayoutSetting object for an element. Element must be drawn first, use inside useEffect or componentDidMount
 * @param el Id of the element or React ref of the element
 * @param zIndex z-index of the element
 * @param distanceForMoving Type of interaction for the element
 * @returns AIRxTouchLayoutSetting object or null if the ref is not assigned
 */
export const GetElementBounds = (ref: MutableRefObject<HTMLElement> | string, zIndex: number, distanceForMoving: AIRxTouchDefaultLayoutSetting): AIRxTouchLayoutSetting | null => { 
    let element: HTMLElement | null;
    if (typeof ref === "string") {
        element = document.getElementById(ref);
    }
    else {
        element = ref.current;
    }

    if (element) {
        const boundingBox = element.getBoundingClientRect();
        const layout: AIRxTouchLayoutSetting = {
            X1: Math.round(boundingBox.left),
            X2: Math.round(boundingBox.right),
            Y1: Math.round(boundingBox.top),
            Y2: Math.round(boundingBox.bottom),
            ZIndex: zIndex,
            DistanceForMoving: distanceForMoving
        };
        return layout;
    }
    return null;
};
